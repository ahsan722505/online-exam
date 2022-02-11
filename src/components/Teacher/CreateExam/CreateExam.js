import styles from "./CreateExam.module.css";
import {useEffect, useState } from "react";
import Question from "./Question";
import GeneralInfo from "./GeneralInfo";
import NavigationArrow from "../../../UI/NavigationArrow";
import { useReducer,useRef } from "react";
import Stat from "../../Student/Exam/Stat";

const initialState={
    examName : "",
    subjectName : "",
    class_Name : "",
    questions : [{questionStatement : "", options : [{statement : ""}]}],
    currentQuestion : 0

}
const CreateExam=()=>{
    const [questionMode,setQuestionMode]=useState(false);
    const createExamReducer=(state,action)=>{
        let updatedQuestions;
        switch (action.type) {
            case "examName":
                return {...state,examName : action.payload}
            case "subjectName":
                return {...state,subjectName : action.payload}
            case "class_Name":
                return {...state,class_Name : action.payload}
            case "addOption":
                updatedQuestions=[...state.questions];
                updatedQuestions[state.currentQuestion].options.push({statement : ""});
                return {...state,questions : updatedQuestions}
            case "removeOption":
                updatedQuestions=[...state.questions];
                updatedQuestions[state.currentQuestion].options=updatedQuestions[state.currentQuestion].options.filter((_,i)=> i!== action.payload);
                return {...state,questions : updatedQuestions}
            case "qStatement":
                updatedQuestions=[...state.questions];
                updatedQuestions[state.currentQuestion].questionStatement=action.payload;
                return {...state,questions : updatedQuestions}
            case "option":
                updatedQuestions=[...state.questions];
                updatedQuestions[state.currentQuestion].options[action.payload.index].statement=action.payload.value;
                return {...state,questions : updatedQuestions}
            case "nextQuestion":
                updatedQuestions=[...state.questions];
                if(state.currentQuestion === state.questions.length-1){
                    updatedQuestions.push({questionStatement : "", options : [{statement : ""}]});
                }
                    return {...state,questions : updatedQuestions,currentQuestion : state.currentQuestion+1};

            case "deleteQuestion":
                let updatedCurrentQuestion=state.currentQuestion;
                if(state.currentQuestion === state.questions.length-1) updatedCurrentQuestion--;
                updatedQuestions=state.questions.filter((_,i)=> state.currentQuestion !== i);
                return {...state,questions : updatedQuestions,currentQuestion : updatedCurrentQuestion};
            case "currentQuestion":
                return {...state,currentQuestion : action.payload}
                
        }
    }
    const [createExamState,dispatchCreateExam]=useReducer(createExamReducer,initialState);
    const changeQuestionHandler=(value)=>{
        dispatchCreateExam({type : "currentQuestion",payload : value})
    }
    

    return(
        <>
            { questionMode && <div className={styles.stateCont}>
            <Stat questions={createExamState.questions.length} onChangeQuestion={changeQuestionHandler}/>
            </div>}
            
            <div className={styles.mainCont}>
                    <NavigationArrow direction="left" disable={!questionMode} onClick={()=> setQuestionMode(false)}/>

                <div  className={styles.createCont}>
                    {!questionMode && <GeneralInfo createExamState={createExamState} dispatchCreateExam={dispatchCreateExam}/>}
                    { questionMode && <Question dispatchCreateExam={dispatchCreateExam} question={createExamState.questions[createExamState.currentQuestion]} currentQuestion={createExamState.currentQuestion}/>}
                </div>
                <NavigationArrow direction="right" disable={questionMode} onClick={()=> setQuestionMode(true)}/>
        </div>
       </>
    )
}
export default CreateExam;