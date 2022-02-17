import styles from "./Classes.module.css"
import { useCallback, useEffect, useState } from "react";
const Classes=({width,classes,currentInput,onClassSelect})=>{
    const getClasses=useCallback(()=>{
        if(currentInput === "") return classes;
        return classes.filter(each=>each.toLowerCase().startsWith(currentInput.toLowerCase()))
    },[currentInput,classes]);
    const [classState,setClass]=useState(getClasses());
    useEffect(()=>{
        setClass(getClasses());
    },[getClasses]);
    return (
        <div style={{width : width}} className={styles.classCont}>
            {classState.map(eachClass=> <div className={styles.eachClass} onClick={()=> onClassSelect(eachClass)} >{eachClass}</div>)}
        </div>
    )
}
export default Classes;