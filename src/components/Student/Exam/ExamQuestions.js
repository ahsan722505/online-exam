import React from 'react'
import { useEffect, useState,useRef } from "react";
import Stat from "./Stat";
import styles from "./Exam.module.css";
import Question from "./Question";
import Button from "../../../UI/Button"
import useHttp from "../../../hooks/use-http";
import CustomModal from '../../../UI/CustomModal';
import { useNavigate } from 'react-router';
const ExamQuestions = ({examId}) => {
    const intervalRef=useRef(null);
    const navigate= useNavigate();
    const {isLoading,sendRequest}=useHttp(true);
    const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
    const [questions,setQuestions]=useState([]);
    const [showModal,setShowModal]=useState(false);
    const [answers,setAnswers]=useState([]);
    const [duration,setDuration]=useState('00:00:00');
    let currentQuestion=questions[currentQuestionIndex];
    const nextHandler=()=> setCurrentQuestionIndex(state=>state+1);
    const previousHandler=()=> setCurrentQuestionIndex(state=>state-1);
    const changeQuestionHandler=(index)=>{
            setCurrentQuestionIndex(index);
    }
    const setAnswerHandler=({option,select})=>{
            setAnswers(state=>{
                let newState=[...state];
                if(select) newState[currentQuestionIndex]=option;
                else newState[currentQuestionIndex]=null;
                
                return newState;
            })
    }
    console.log(answers);
    const submitExam=()=>{
        clearInterval(intervalRef.current)
        const graphqlQuery = {
            query: `
              mutation calculateExamMarks($answers : [Int] , $examId : ID) {
                calculateMarks(answers: $answers,examId : $examId) {
                  success
                }
              }
            `,
            variables: {
              answers,
              examId
            }
          };
          sendRequest(graphqlQuery,()=>{},false)
          navigate("/student")
    }
    useEffect(()=>{
        const graphqlQuery = {
            query: `
            query GetExamContents($_id : ID,$start : Boolean){ 
                getExamContents(examId : $_id,start : $start) {
                  questions {
                      questionStatement
                      options {
                          statement
                      }
                  }
                  duration
                  dateAndTime
                }
              }
            `
          , variables : {
              _id : examId,
              start : true
          }};
          const getTimeRemaining = (e) => {
            const total = Date.parse(e) - Date.parse(new Date());
            const seconds = Math.floor((total / 1000) % 60);
            const minutes = Math.floor((total / 1000 / 60) % 60);
            const hours = Math.floor((total / 1000 * 60 * 60) % 24);
            return {
                total, hours, minutes, seconds
            };
        }
          const startTimer=(endingTime)=>{
                let { total, hours, minutes, seconds } 
                = getTimeRemaining(endingTime);
                    setDuration(
                        (hours > 9 ? hours : '0' + hours) + ':' +
                        (minutes > 9 ? minutes : '0' + minutes) + ':'
                        + (seconds > 9 ? seconds : '0' + seconds)
                    )
                    if(total === 0){
                        submitExam();
                    }
            
          }
          const dataHandler=(resData)=>{
              const {duration,questions,dateAndTime}=resData.data.getExamContents;
              if(!resData.errors){
                  const endingTime= new Date(new Date(dateAndTime).getTime() + (duration*60000));
                  let { total, hours, minutes, seconds } 
                = getTimeRemaining(endingTime);
                    setDuration(
                        (hours > 9 ? hours : '0' + hours) + ':' +
                        (minutes > 9 ? minutes : '0' + minutes) + ':'
                        + (seconds > 9 ? seconds : '0' + seconds)
                    )
                  const id=setInterval(()=>{
                      startTimer(endingTime)
                  },1000);
                  intervalRef.current=id
                  ;
                  setQuestions(questions);
                  setAnswers(new Array(questions.length).fill(null))
              }
          }
          sendRequest(graphqlQuery,dataHandler);
          
    },[sendRequest])
    
    return(
        <>
            { isLoading && <h1>Loading</h1>}
            { !isLoading && <div className={styles.questionLayout}>
                
                <div className={styles.upper}>
                    <h2>Time left : {duration}</h2>
                    <Stat answers={answers} questions={questions.length} onChangeQuestion={changeQuestionHandler}/>
                </div>
                <Question currentAnswer={answers[currentQuestionIndex]} onAnswer={setAnswerHandler} question={currentQuestion}/>
                <div className={styles.bottom}>
                    <Button onClick={previousHandler} style={{marginRight : "1rem"}} disabled={currentQuestionIndex === 0}>Previous</Button>
                    <Button onClick={nextHandler} disabled={currentQuestionIndex === questions.length-1}>Next</Button>
                </div>
                <Button style={{position : "absolute" , bottom : "1rem"}} onClick={()=> setShowModal(true)}>submit exam</Button>
                <CustomModal show={showModal} handleClose={()=>setShowModal(false)} content="Are you sure you want to submit exam?" proceedHandler={submitExam} />

            </div>}
        </>
    )
}

export default ExamQuestions
// answers is an array of answers having answers at corresponding position of questions array
    // 0->a
    // 1->b
    // 3->c
    // 4->d