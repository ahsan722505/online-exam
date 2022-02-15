import React, { useCallback } from 'react'
import Classes from "./Classes";
import styles from "./GeneralInfo.module.css"
// import { classes } from "../../../Helpers/util";
import { useState,useEffect } from 'react';
const GeneralInfo = ({createExamState,dispatchCreateExam,classes}) => {
    const {examName,subjectName,class_Name}=createExamState;
    const [showClasses,setShowClasses]=useState(false);

    const classSelectHandler=(value)=>{
        dispatchCreateExam({type : "class_Name" , payload : value })
        setShowClasses(false);
    }
    const bodyClickHandler=useCallback((e)=>{
        if(e.target.id === "unique"){
            setShowClasses(true);
        }else{
            setShowClasses(false);
        }
    },[])
    
    useEffect(()=>{
        document.addEventListener("click",bodyClickHandler);
        return ()=>{
            document.removeEventListener("click",bodyClickHandler);
        }
    },[bodyClickHandler])
  return (
    <>
        <div className={styles.formControl}>
                            <label>Enter exam name:</label>
                            <input type="text" value={examName} onChange={(e)=> dispatchCreateExam({type : "examName" , payload : e.target.value })}/>
                    </div>
                    <div className={styles.formControl}>
                            <label>Enter subject name:</label>
                            <input type="text" value={subjectName} onChange={(e)=> dispatchCreateExam({type : "subjectName" , payload : e.target.value })}/>
                    </div>
                    <div className={styles.formControl}>
                            <label>Select class</label>
                            <input type="text" value={class_Name} id="unique" onChange={(e)=> dispatchCreateExam({type : "class_Name" , payload : e.target.value })}/>
                            { showClasses && <Classes onClassSelect={classSelectHandler} currentInput={class_Name} classes={classes}/>}
                    </div>
    </>
  )
}

export default GeneralInfo