import styles from "./CreateExam.module.css";
import {useEffect, useState } from "react";
import Question from "./Question";
import GeneralInfo from "./GeneralInfo";
import NavigationArrow from "../../../UI/NavigationArrow";
import { useReducer,useRef } from "react";
import Stat from "../../Student/Exam/Stat";
import useHttp from "../../../hooks/use-http";
import { createExamReducer } from "../../../reducers/reducer";
import Button from "../../../UI/Button"
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import { useNavigate } from "react-router";
import { isEmpty } from "../../../Helpers/util";
const CreateExam=()=>{
  const createExamInitialState={
    examName : "",
    subjectName : "",
    class_Name : "",
    questions : [{questionStatement : "", options : [{statement : ""}]}],
    currentQuestion : 0

}
    const [questionMode,setQuestionMode]=useState(false);
    const [classes,setClasses]=useState([]);
    const {isLoading,sendRequest}=useHttp();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(()=>{
        const dataHandler=(resData)=>{
          console.log(resData);
            setClasses(resData.data.getClasses);
        }
        const graphqlQuery = {
            query: `
              {
                getClasses {
                  name
                  _id
                }
              }
            `
          };
        sendRequest(graphqlQuery,dataHandler);
    },[sendRequest]);
    
    const [createExamState,dispatchCreateExam]=useReducer(createExamReducer,createExamInitialState);
    const changeQuestionHandler=(value)=>{
        dispatchCreateExam({type : "currentQuestion",payload : value})
    }
    const submitHandler=()=>{
      let err;
      if(isEmpty(createExamState.examName)){
         err="The exam name field is empty, make sure to fill it";
        dispatch(uiActions.setModal({show : true, content : err}));
        return;
      }
      if(isEmpty(createExamState.subjectName)){
         err="The subject name field is empty, make sure to fill it";
        dispatch(uiActions.setModal({show : true, content : err}));
        return;
      }
      if(!classes.find(each=> each.name === createExamState.class_Name)){
         err="Please select a class from available list of classes";
        dispatch(uiActions.setModal({show : true, content : err}));
        return;
      }
      let questions=createExamState.questions;
      for(let i=0; i< questions.length ; i++){
        if(isEmpty(questions[i].questionStatement)){
          err=`The question statement of question no ${i+1} is missing.`;
          dispatch(uiActions.setModal({show : true, content : err}));
          return;
        }
        if(questions[i].options.length === 0){
          err=`The question no ${i+1} should have atleast one option.`;
          dispatch(uiActions.setModal({show : true, content : err}));
          return;
        }
        for(let j=0 ; j < questions[i].options.length ; j++){
          if(isEmpty(questions[i].options[j].statement)){
            err=`The option no ${j+1} of question no ${i+1} is empty; either fill it or remove it.`;
            dispatch(uiActions.setModal({show : true, content : err}));
            return;
          }
        }
      }


      let readyState={...createExamState};
      delete readyState.currentQuestion;
      delete readyState.class_Name;
      let {name,_id}=classes.find(each=> each.name === createExamState.class_Name);
      readyState.class=_id;
      const graphqlQuery = {
        query: `
          mutation createNewExam($examInputData : ExamInput) {
            createExam(examInputData: $examInputData) {
              success
            }
          }
        `,
        variables: {
          examInputData : readyState
        }
      };
      const dataHandler=(data)=>{
        if(!data.errors){
          navigate("/teacher");
          dispatch(uiActions.setModal({show :  true, content : "Exam created successfully!"}))
        }
        
      }
      sendRequest(graphqlQuery,dataHandler);
      
    }
    return(
        <>
            { isLoading && <h2>Loading...</h2>}
        
            { !isLoading && <>
                { questionMode && <div className={styles.stateCont}>
                <Stat questions={createExamState.questions.length} onChangeQuestion={changeQuestionHandler}/>
                </div>}
                
                <div className={styles.mainCont}>
                        <NavigationArrow direction="left" disable={!questionMode} onClick={()=> setQuestionMode(false)}/>

                    <div  className={styles.createCont}>
                        {!questionMode && <GeneralInfo createExamState={createExamState} dispatchCreateExam={dispatchCreateExam} classes={classes}/>}
                        { questionMode && <Question dispatchCreateExam={dispatchCreateExam} question={createExamState.questions[createExamState.currentQuestion]} currentQuestion={createExamState.currentQuestion}/>}
                        {questionMode && <Button onClick={submitHandler}>Create Exam</Button>}

                    </div>
                    <NavigationArrow direction="right" disable={questionMode} onClick={()=> setQuestionMode(true)}/>
            </div>
        </>}
       </>
    )
}
export default CreateExam;