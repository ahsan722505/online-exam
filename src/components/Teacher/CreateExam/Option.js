import React from 'react'
import styles from "./Option.module.css";
import TextArea from '../../../UI/TextArea';
import Button from "../../../UI/Button"
const Option = ({option,index,dispatchCreateExam}) => {
  return (
    <div className={styles.option}>
                <span>({String.fromCharCode(97+index)})</span>
                <TextArea onChange={(e)=> dispatchCreateExam({type : "option" , payload : {index,value : e.target.value}})}>{option.statement}</TextArea>
                <Button onClick={()=> dispatchCreateExam({type : "removeOption" , payload : index})}>remove</Button>
                <input type="checkbox" checked={option.correct} onChange={(e)=> dispatchCreateExam({type : "correctOption" ,payload : {index, value : e.target.checked}})}/>
                <span>correct</span>
            </div>
  )
  
}

export default Option