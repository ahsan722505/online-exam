import styles from "./CreateExam.module.css";
import {useState } from "react";
import Questions from "./Questions";
import GeneralInfo from "./GeneralInfo";
import NavigationArrow from "../../../UI/NavigationArrow";
import { useReducer } from "react";
const createExamReducer=(state,action)=>{}
const initialState={
    examName : "",
    subjectName : "",
    class_Name : "",

}
const CreateExam=()=>{
    const [questionMode,setQuestionMode]=useState(false);
    const [examName,setExamName]=useState("");
    const [createExamState,dispatchCreateExam]=useReducer(createExamReducer,initialState);
    return(
        <div className={styles.mainCont}>
                <NavigationArrow direction="left" disable={!questionMode} onClick={()=> setQuestionMode(false)}/>

            <div className={styles.createCont}>
                {!questionMode && <GeneralInfo/>}
                { questionMode && <Questions/>}
            </div>
            <NavigationArrow direction="right" disable={questionMode} onClick={()=> setQuestionMode(true)}/>
       </div>
    )
}
export default CreateExam;