import Button from "../../UI/Button";
import styles from "./TeacherMain.module.css";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router";
const TeacherMain=()=>{
    const navigate=useNavigate();
    return(
        <Fragment>
                    <h1 className={styles.heading}>Welcome back, ahsan</h1>
                <div className={styles.main}>
                    <div className={styles.btnGroup}>
                        <Button onClick={()=>{navigate("/teacher/createExam")}}  style={{transform: "translateX(-50%)",marginBottom : "1rem"}}>Create exam</Button>
                        <Button onClick={()=>{navigate("/teacher/viewResults")}} style={{transform: "translateX(50%)"}} >View results</Button>
                    </div>
                </div>
        </Fragment>
    
    )
}
export default TeacherMain;