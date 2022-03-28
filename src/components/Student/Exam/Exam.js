import ExamInstructions from "./ExamInstructions"
import ExamQuestions from "./ExamQuestions";
import { useParams } from "react-router";
import { useState } from "react";

const Exam=()=>{
    const params=useParams();
    const [initialMode,setInitialMode]=useState(true);
    const modeToggler=()=> setInitialMode(state=> !state);
    // at initial mode instructions about exams will be rendered
    return(
        <>
            { initialMode && <ExamInstructions modeToggler={modeToggler} examId={params.examId}/>}
            { !initialMode && <ExamQuestions examId={params.examId}/>}
        </>
    )
}
export default Exam;
