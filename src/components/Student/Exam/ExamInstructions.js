import styles from "./ExamInstructions.module.css";
import Button from "../../../UI/Button"
import { useEffect, useRef,useState } from "react";
import useHttp from "../../../hooks/use-http";
import {uiActions} from "../../../store/ui-slice";
import {useDispatch} from "react-redux";

const Instructions=({examId,modeToggler})=>{
    const [instructions,setInstructions]=useState([]);
    const [duration,setDuration]=useState("");
    const [dateAndTime,setDateAndTime]=useState("");
    const {isLoading,sendRequest}=useHttp(true);
    const dispatch=useDispatch();
    useEffect(()=>{
        const graphqlQuery = {
            query: `
            query GetExamContents($_id : ID,$start : Boolean){ 
                getExamContents(examId : $_id,start : $start) {
                      dateAndTime
                      duration
                      instructions {
                          instruction
                      }
                }
              }
            `
          , variables : {
              _id : examId,
              start : false
          }};
          const dataHandler=(resData)=>{
              if(!resData.errors){
                  const {instructions,duration,dateAndTime}=resData.data.getExamContents;
                  setInstructions(instructions);
                  setDuration(duration)
                setDateAndTime(dateAndTime)
                  
              }
          }
          sendRequest(graphqlQuery,dataHandler);
    },[sendRequest])
    const startPaper=()=>{
        const startingTime=new Date(dateAndTime);
        const endingTime= new Date(new Date(dateAndTime).getTime() + (duration*60000));
        const currentTime=new Date();
        if(currentTime.getTime() < startingTime.getTime() || currentTime.getTime() >= endingTime){
            dispatch(uiActions.showModal({content : "You can only access exam during specified time."}));
            return;
        } 
        modeToggler();
    }
    return (
        <>
            {isLoading && <h1>Loading</h1>}
            { !isLoading && <>
                <div  className={styles.header}>
                    <h2>Starting time : {new Date(dateAndTime).toLocaleString()}</h2>
                    <h2>Paper duration : {duration} min</h2>
                </div>
                <div  className={styles.insCont}>
                    <div className={styles.ins}>
                        <h2>Instructions:</h2>
                        {instructions.map((each,i)=><div>{i+1}. {each.instruction}</div>)}
                    </div>
                    <Button onClick={startPaper}>Start Paper</Button>

                </div>
            </>}
        </>
    )
}
export default Instructions;