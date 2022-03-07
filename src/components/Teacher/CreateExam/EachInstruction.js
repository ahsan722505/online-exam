import React, { useEffect } from 'react'
import TextArea from '../../../UI/TextArea'
import styles from "./EachInstruction.module.css"
import Button from "../../../UI/Button";
const EachInstruction = ({instruction,dispatchCreateExam,index}) => {
  return (
    <div className={styles.instCont}>
        <span style={{marginRight : ".2rem"}}>=&gt;</span>
        <TextArea style={{width : "50vw"}} rows="2" onChange={(e)=> dispatchCreateExam({type : "changeInstruction" , payload : {index,value : e.target.value}})} >{instruction}</TextArea>
        <Button style={{marginLeft : ".5rem"}} disabled={index === 0} onClick={()=> dispatchCreateExam({type : "removeInstruction" , payload : index})}>Remove</Button>
    </div>
  )
}

export default EachInstruction