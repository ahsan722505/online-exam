import React from 'react'
import { useEffect, useState } from "react";
import Stat from "./Stat";
import styles from "./Exam.module.css";
import Question from "./Question";
import Button from "../../../UI/Button"
import useHttp from "../../../hooks/use-http";
import CustomModal from '../../../UI/CustomModal';
import { useNavigate } from 'react-router';
const ExamQuestions = ({examId}) => {
    const navigate= useNavigate();
    const {isLoading,sendRequest}=useHttp(true);
    const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
    const [questions,setQuestions]=useState([]);
    const [showModal,setShowModal]=useState(false);
    const [answers,setAnswers]=useState([]);
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
                }
              }
            `
          , variables : {
              _id : examId,
              start : true
          }};
          const dataHandler=(resData)=>{
              if(!resData.errors){
                  setQuestions(resData.data.getExamContents.questions);
                  setAnswers(new Array(resData.data.getExamContents.questions.length).fill(null))
              }
          }
          sendRequest(graphqlQuery,dataHandler);
          
    },[sendRequest])
    const submitExam=()=>{
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
    return(
        <>
            { isLoading && <h1>Loading</h1>}
            { !isLoading && <div className={styles.questionLayout}>
                
                <div className={styles.upper}>
                    <h2>Time left : 1:00</h2>
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