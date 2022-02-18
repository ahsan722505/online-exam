import styles from "./ExamPreview.module.css";
import { useNavigate } from "react-router";
import Button from "../../UI/Button"
const ExamPreview=({exam})=>{
    const navigate=useNavigate();
    return(
        <div className={styles.exam}  >
                <h2 className={styles.heading}>{exam.examName}</h2>
                <p>Subject : {exam.subjectName}</p>
                <p>Teacher : {exam.teacher.username}</p>
                <Button  onClick={()=> navigate(`/student/${exam._id}`)}>Attempt</Button>

        </div>
    )
}
export default ExamPreview;