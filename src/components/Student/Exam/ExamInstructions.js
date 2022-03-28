import styles from "./ExamInstructions.module.css";
import Button from "../../../UI/Button"
import { useEffect, useRef,useState } from "react";
import useHttp from "../../../hooks/use-http";
import { months } from "../../../Helpers/util";
const Instructions=({examId,modeToggler})=>{
    const [instructions,setInstructions]=useState([]);
    const [duration,setDuration]=useState("");
    const [dateAndTime,setDateAndTime]=useState("");
    const {isLoading,sendRequest}=useHttp(true);
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
                setDateAndTime(new Date(dateAndTime).toLocaleString())
                  
              }
          }
          sendRequest(graphqlQuery,dataHandler);
    },[sendRequest])
    return (
        <>
            {isLoading && <h1>Loading</h1>}
            { !isLoading && <>
                <div  className={styles.header}>
                    {/* <h2>Starting time: 27 February 2022 11 a.m.</h2> */}
                    <h2>Starting time : {dateAndTime}</h2>
                    <h2>Paper duration : {duration} min</h2>
                </div>
                <div  className={styles.insCont}>
                    <div className={styles.ins}>
                        <h2>Instructions:</h2>
                        {instructions.map((each,i)=><div>{i+1}. {each.instruction}</div>)}
                    </div>
                    <Button onClick={modeToggler}>Start Paper</Button>

                </div>
            </>}
        </>
    )
}
export default Instructions;