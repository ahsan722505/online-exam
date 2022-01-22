import styles from "./ExamPreview.module.css";
const ExamPreview=({exam})=>{
    return(
        <div className={styles.exam}>
                <h2 className={styles.heading}>{exam.name}</h2>
                <p>Subject : {exam.subject}</p>
                <p>Teacher : {exam.teacher}</p>
        </div>
    )
}
export default ExamPreview;