import styles from "./Classes.module.css"
import { useEffect, useState } from "react";
const Classes=({classes,currentInput,onClassSelect})=>{
    const [classState,setClass]=useState(classes);
    useEffect(()=>{
        if(currentInput === ""){
            setClass(classes);
        }else{
            let newState=classes.filter(each=>{
                return each.toLowerCase().startsWith(currentInput.toLowerCase());
            })
            setClass(newState);
        }
        
    },[currentInput,classes]);
    return (
        <div className={styles.classCont}>
            {classState.map(eachClass=> <div className={styles.eachClass} onClick={()=> onClassSelect(eachClass)} >{eachClass}</div>)}
        </div>
    )
}
export default Classes;