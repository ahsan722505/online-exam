import React from 'react'
import Button from "../../../UI/Button"
import EachInstruction from './EachInstruction';
const Instruction = ({submitHandler,instructions,dispatchCreateExam}) => {
  return (
    <>
        <Button onClick={()=> dispatchCreateExam({type : "addInstruction"})}>Add Instruction</Button>
        {instructions.map((each,i)=><EachInstruction  index={i} dispatchCreateExam={dispatchCreateExam} instruction={each.instruction}/>)}
        <Button onClick={submitHandler}>Create Exam</Button>
    </>
  )
}
export default Instruction