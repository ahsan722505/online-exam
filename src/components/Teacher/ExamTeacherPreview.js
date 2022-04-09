import styles from "./ExamTeacherPreview.module.css";
import { useNavigate } from "react-router";
import Button from "../../UI/Button"
import ButtonGroup from "../../UI/ButtonGroup";
import CustomModal from "../../UI/CustomModal";
import { useState } from "react";
const ExamTeacherPreview=({exam,onDeleteExam})=>{
    const [showModal,setModal]=useState(false);
    const navigate=useNavigate();
    return(
        <div className={styles.exam}  >
                <h2 className={styles.heading}>{exam.examName}</h2>
                <p>Subject : {exam.subjectName}</p>
                <ButtonGroup>
                        <Button onClick={()=> navigate({pathname : "/teacher/createExam", search :`?edit=${true}&id=${exam._id}`})}>edit</Button>
                        <Button onClick={()=> setModal(true)}>Delete</Button>
                </ButtonGroup>
                <CustomModal content="Are you sure you want to delete this exam?" show={showModal} proceedHandler={()=>onDeleteExam(exam._id)} handleClose={()=> setModal(false)} />
                
        </div>
    )
}
export default ExamTeacherPreview;