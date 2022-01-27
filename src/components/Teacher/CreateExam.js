import styles from "./CreateExam.module.css";
import { classes } from "../../Helpers/util";
import Classes from "./Classes";
import { useEffect, useState } from "react";

const CreateExam=()=>{
    const [currentClassInput,setCurrentClassInput]=useState("");
    const [showClasses,setShowClasses]=useState(false);
    const classSelectHandler=(value)=>{
        setCurrentClassInput(value);
        setShowClasses(false);
    }
    const bodyClickHandler=(e)=>{
        if(e.target.id === "unique"){
            setShowClasses(true);
        }else{
            setShowClasses(false);
        }
    }
    useEffect(()=>{
        document.addEventListener("click",bodyClickHandler);
        return ()=>{
            document.removeEventListener("click",bodyClickHandler);
        }
    },[bodyClickHandler])
    
    return(
       <div className={styles.createCont}>
           <div className={styles.formControl}>
                <label>Enter exam name:</label>
                <input type="text"/>
           </div>
           <div className={styles.formControl}>
                <label>Enter subject name:</label>
                <input type="text"/>
           </div>
           <div className={styles.formControl}>
                <label>Select class</label>
                <input type="text" value={currentClassInput} id="unique" onChange={e=> setCurrentClassInput(e.target.value)}/>
                { showClasses && <Classes onClassSelect={classSelectHandler} currentInput={currentClassInput} classes={classes}/>}
           </div>
       </div>
    )
}
export default CreateExam;