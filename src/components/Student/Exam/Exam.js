import ExamInstructions from "./ExamInstructions"
import ExamQuestions from "./ExamQuestions";
import { useState } from "react";
const Exam=()=>{
    const [initialMode,setInitialMode]=useState(true);
    return(
        <>
            { initialMode && <ExamInstructions/>}
            { !initialMode && <ExamQuestions/>}
        </>
    )
}
export default Exam;
