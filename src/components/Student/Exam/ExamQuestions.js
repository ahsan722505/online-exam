import React from 'react'
import { useEffect, useState } from "react";
import Stat from "./Stat";
import styles from "./Exam.module.css";
import Question from "./Question";
import Button from "../../../UI/Button"
import { useParams } from "react-router";
import useHttp from "../../../hooks/use-http";
const ExamQuestions = () => {
    const params=useParams();
    const {isLoading,sendRequest}=useHttp(true);
    const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
    const [questions,setQuestions]=useState([]);
    const [answers,setAnswers]=useState([]);
    let currentQuestion=questions[currentQuestionIndex];
    const nextHandler=()=> setCurrentQuestionIndex(state=>state+1);
    const previousHandler=()=> setCurrentQuestionIndex(state=>state-1);
    const changeQuestionHandler=(index)=>{
            setCurrentQuestionIndex(index);
    }
    const setAnswerHandler=(option)=>{
            setAnswers(state=>{
                let newState=[...state];
                newState[currentQuestionIndex]=option;
                return newState;
            })
    }
    useEffect(()=>{
        const graphqlQuery = {
            query: `
            query GetExams($_id : ID){ 
                getQuestions(examId : $_id) {
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
              _id : params.examId
          }};
          const dataHandler=(resData)=>{
              if(!resData.errors){
                  setQuestions(resData.data.getQuestions.questions);
                  setAnswers(new Array(resData.data.getQuestions.questions.length).fill(null))
              }
          }
          sendRequest(graphqlQuery,dataHandler);
    },[sendRequest])
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