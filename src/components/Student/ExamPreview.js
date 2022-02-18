import styles from "./ExamPreview.module.css";
const ExamPreview=({exam})=>{
    return(
        <div className={styles.exam}>
                <h2 className={styles.heading}>{exam.examName}</h2>
                <p>Subject : {exam.subjectName}</p>
                <p>Teacher : {exam.teacherId.username}</p>
        </div>
    )
}
export default ExamPreview;