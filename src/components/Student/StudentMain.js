import styles from "./StudentMain.module.css";
import { exams } from "../../Helpers/util";
import ExamPreview from "./ExamPreview"
const StudentMain=()=>{
    return(
        <>
            <h1 className={styles.heading}>My exams</h1>
            <div className={styles.cont}>
                {exams.map(each=>{
                    return(
                        <ExamPreview exam={each}/>
                    )
                })}

            </div>

        </>
    )
}
export default StudentMain;