import styles from "./CreateExam.module.css";
import {useEffect, useState } from "react";
import Question from "./Question";
import GeneralInfo from "./GeneralInfo";
import NavigationArrow from "../../../UI/NavigationArrow";
import { useReducer,useRef } from "react";
import useHttp from "../../../hooks/use-http";
import { createExamReducer } from "../../../reducers/reducer";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import { useNavigate } from "react-router";
import { isEmpty } from "../../../Helpers/util";
import Time from "./Time";
import Instruction from "./Instruction";
import { useSearchParams } from 'react-router-dom';
import { getGraphqlQuery } from "../../../Helpers/util";
const CreateExam=()=>{
  const [searchParams]=useSearchParams();
  const createExamInitialState={
    examName : "",
    subjectName : "",
    class_Name : "",
    questions : [{questionStatement : "", options : [{statement : "", correct : false}]}],
    dateAndTime : "",
    duration : "",
    instructions : [{instruction : ""}],
    currentQuestion : 0

}
    const [classes,setClasses]=useState([]);
    const {isLoading,sendRequest}=useHttp();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [currentStep,setCurrentStep]=useState(1);
    const [createExamState,dispatchCreateExam]=useReducer(createExamReducer,createExamInitialState);
    useEffect(()=>{
        const dataHandler=(resData)=>{
          console.log(resData);
          if(searchParams.get("id")){
            const {getExamContents : examState}=resData.data;
            examState.class_Name=examState.class.name;
            delete examState.class;
            examState.questions.forEach((eachQuestion,i)=>{
              eachQuestion.options.forEach((eachOption,j)=>{
                if(j=== examState.correctOptions[i]) eachOption.correct=true;
                else eachOption.correct=false;
              })
            })
            delete examState.correctOptions;
            examState.currentQuestion=0;
            console.log(examState);
            dispatchCreateExam({type : "setInitialState",payload : examState});
          }
          setClasses(resData.data.getClasses);
        }
        const graphqlQuery=getGraphqlQuery(searchParams.get("id"));
        sendRequest(graphqlQuery,dataHandler);
    },[sendRequest]);
    
    
    const changeQuestionHandler=(value)=>{
        dispatchCreateExam({type : "currentQuestion",payload : value})
    }
    const submitHandler=()=>{
      // alert("sending...")
      let err;
      if(isEmpty(createExamState.examName)){
         err="The exam name field is empty, make sure to fill it";
        dispatch(uiActions.showModal({ content : err}));
        return;
      }
      if(isEmpty(createExamState.subjectName)){
         err="The subject name field is empty, make sure to fill it";
        dispatch(uiActions.showModal({ content : err}));
        return;
      }
      if(!classes.find(each=> each.name === createExamState.class_Name)){
         err="Please select a class from available list of classes";
        dispatch(uiActions.showModal({ content : err}));
        return;
      }
      let questions=createExamState.questions;
      for(let i=0; i< questions.length ; i++){
        if(isEmpty(questions[i].questionStatement)){
          err=`The question statement of question no ${i+1} is missing.`;
          dispatch(uiActions.showModal({ content : err}));
          return;
        }
        if(questions[i].options.length === 0){
          err=`The question no ${i+1} should have atleast one option.`;
          dispatch(uiActions.showModal({ content : err}));
          return;
        }
        
        for(let j=0 ; j < questions[i].options.length ; j++){
          if(isEmpty(questions[i].options[j].statement)){
            err=`The option no ${j+1} of question no ${i+1} is empty; either fill it or remove it.`;
            dispatch(uiActions.showModal({ content : err}));
            return;
          }
        }
        if(questions[i].options.every(each=> each.correct === false)){
          err=`The question no ${i+1} should have one correct option.`
          dispatch(uiActions.showModal({ content : err}));
          return;
        }
      }
        if(isEmpty(createExamState.dateAndTime)){
          err="Please select a starting time and date for exam.";
          dispatch(uiActions.showModal({ content : err}));
          return;
        }
        if(isEmpty(createExamState.duration)){
          err="Please enter a time duration for exam.";
          dispatch(uiActions.showModal({ content : err}));
          return;
        }
        let instructions=createExamState.instructions;
        for(let i=0 ; i< instructions.length ; i++){
          if(isEmpty(instructions[i].instruction)){
            err=`The instruction no ${i+1} is missing.`;
            dispatch(uiActions.showModal({ content : err}));
            return;
          }
        }
        
      
      
      

      let readyState={...createExamState};
      readyState.correctOptions=readyState.questions.map(each=>{
        return each.options.findIndex(option=> option.correct === true)
      })
      readyState.questions=readyState.questions.map(each=>({...each,options : each.options.map(option=> ({statement : option.statement}))}));
      delete readyState.currentQuestion;
      delete readyState.class_Name;
      let {name,_id}=classes.find(each=> each.name === createExamState.class_Name);
      readyState.class=_id;
      const graphqlQuery = {
        query: `
          mutation createNewExam($examInputData : ExamInput, $examId : ID) {
            createExam(examInputData: $examInputData, examId : $examId) {
              success
            }
          }
        `,
        variables: {
          examInputData : readyState,
          examId : searchParams.get("id")
        }
      };
      const dataHandler=(data)=>{
        if(!data.errors){
          navigate("/teacher");
          dispatch(uiActions.showModal({ content : `Exam ${searchParams.get("id") ? "edited" : "created"} successfully!`}))
        }
        
      }
      sendRequest(graphqlQuery,dataHandler);
      console.log(readyState);
      
    }
    return(
        <>
            { isLoading && <h2>Loading...</h2>}
        
            { !isLoading && <>                
                <div className={styles.mainCont}>
                        <NavigationArrow direction="left" disable={currentStep === 1} onClick={()=> setCurrentStep(state=> state - 1)}/>

                    <div  className={styles.createCont}>
                        {currentStep === 1 && <GeneralInfo createExamState={createExamState} dispatchCreateExam={dispatchCreateExam} classes={classes}/>}
                        { currentStep === 2 && <Question dispatchCreateExam={dispatchCreateExam} question={createExamState.questions[createExamState.currentQuestion]} currentQuestion={createExamState.currentQuestion} changeQuestionHandler={changeQuestionHandler} questionsLength={createExamState.questions.length}/>}
                        {currentStep === 3 && <Time dateAndTime={createExamState.dateAndTime} dispatchCreateExam={dispatchCreateExam} duration={createExamState.duration}/>}
                        {currentStep === 4 && <Instruction examId={searchParams.get("id")} instructions={createExamState.instructions} submitHandler={submitHandler} dispatchCreateExam={dispatchCreateExam} />}

                    </div>
                    <NavigationArrow direction="right" disable={currentStep === 4} onClick={()=> setCurrentStep(state=>state+1)}/>
            </div>
        </>}
       </>
    )
}
export default CreateExam;