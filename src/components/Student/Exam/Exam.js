import { questions } from "../../../Helpers/util";
import { useState } from "react";
import Stat from "./Stat";
import styles from "./Exam.module.css";
import Question from "./Question";
import Button from "../../../UI/Button"
const Exam=()=>{
    const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
    // answers is an array of answers having answers at corresponding position of questions array
    // 0->a
    // 1->b
    // 3->c
    // 4->d
    const [answers,setAnswers]=useState(new Array(questions.length).fill(null));
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
    console.log(answers);
    return(
        <div className={styles.questionLayout}>
            <div className={styles.upper}>
                <h2>Time left : 1:00</h2>
                <Stat answers={answers} questions={questions.length} onChangeQuestion={changeQuestionHandler}/>
            </div>
            <Question currentAnswer={answers[currentQuestionIndex]} onAnswer={setAnswerHandler} question={currentQuestion}/>
            <div className={styles.bottom}>
                <Button onClick={previousHandler} style={{marginRight : "1rem"}} disabled={currentQuestionIndex === 0}>Previous</Button>
                <Button onClick={nextHandler} disabled={currentQuestionIndex === questions.length-1}>Next</Button>
            </div>

        </div>
    )
}
export default Exam;