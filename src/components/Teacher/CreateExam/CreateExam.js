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
      let readyState={...createExamState};
      delete readyState.currentQuestion;
      delete readyState.class_Name;
      let {name,_id}=classes.find(each=> each.name === createExamState.class_Name);
      readyState.classId=_id;
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