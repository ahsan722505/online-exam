import styles from "./ExamTeacherPreview.module.css";
import { useNavigate } from "react-router";
import Button from "../../UI/Button"
const ExamTeacherPreview=({exam})=>{

    const navigate=useNavigate();
    return(
        <div className={styles.exam}  >
                <h2 className={styles.heading}>{exam.examName}</h2>
                <p>Subject : {exam.subjectName}</p>
                <Button onClick={()=> navigate({pathname : "/teacher/createExam", search :`?edit=${true}&id=${exam._id}`})}>edit</Button>
        </div>
    )
}
export default ExamTeacherPreview;