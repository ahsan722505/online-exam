import styles from "./Question.module.css";
import TextArea from "../../../UI/TextArea";
import Button from "../../../UI/Button";
import ButtonGroup from "../../../UI/ButtonGroup"
import Option from "./Option";
import { useRef,useEffect } from "react";

const Question=({question,dispatchCreateExam,currentQuestion})=>{
    
    
    return (
        <div  className={styles.qCont}>
            <h2>({currentQuestion + 1})</h2>
            <label style={{alignSelf : "flex-start"}} htmlFor="qStatement">Enter question statement:</label>
            <TextArea onChange={(e)=> dispatchCreateExam({type : "qStatement" , payload : e.target.value})}>{question.questionStatement}</TextArea>
            <Button style={{alignSelf : "flex-end",marginBottom : "1rem"}} onClick={()=>dispatchCreateExam({type : "addOption"})} >Add option</Button>
            {question.options.map((each,i)=> <Option key={i} dispatchCreateExam={dispatchCreateExam} option={each} index={i}/>)}
            <ButtonGroup>
                <Button onClick={()=> dispatchCreateExam({type : "currentQuestion", payload : currentQuestion - 1})} disabled={currentQuestion === 0}>Previous Question</Button>
                <Button disabled={currentQuestion === 0} onClick={()=> dispatchCreateExam({type : "deleteQuestion"})}>Delete Question</Button>
                <Button onClick={()=> dispatchCreateExam({type : "nextQuestion"})}>Next Question</Button>
                

            </ButtonGroup>
            

            
        </div>
    )
}
export default Question;