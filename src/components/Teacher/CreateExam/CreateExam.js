import styles from "./CreateExam.module.css";
import {useEffect, useState } from "react";
import Question from "./Question";
import GeneralInfo from "./GeneralInfo";
import NavigationArrow from "../../../UI/NavigationArrow";
import { useReducer,useRef } from "react";
import Stat from "../../Student/Exam/Stat";
import useHttp from "../../../hooks/use-http";
import { createExamReducer } from "../../../reducers/reducer";
import { createExamInitialState } from "../../../Helpers/util";
const CreateExam=()=>{
    const [questionMode,setQuestionMode]=useState(false);
    const [classes,setClasses]=useState([]);
    const {isLoading,sendRequest}=useHttp();
    useEffect(()=>{
        const dataHandler=(resData)=>{
            setClasses(resData.data.getClasses.map(each=> each.name));
        }
        const graphqlQuery = {
            query: `
              {
                getClasses {
                  name
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
                    </div>
                    <NavigationArrow direction="right" disable={questionMode} onClick={()=> setQuestionMode(true)}/>
            </div>
        </>}
       </>
    )
}
export default CreateExam;