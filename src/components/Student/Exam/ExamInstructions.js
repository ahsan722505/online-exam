import styles from "./ExamInstructions.module.css";
import Button from "../../../UI/Button"
import { useEffect, useRef,useState } from "react";
const Instructions=()=>{
    return (
        <>
            <div  className={styles.header}>
                <h2>Starting time: 27 February 2022 11 a.m.</h2>
                <h2>Paper duration : 60 min</h2>
            </div>
            <div  className={styles.insCont}>
            <div className={styles.ins}>
                <h2>Instructions:</h2>
                <div>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <div>2. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                <div>3.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
                <div>4.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
            <Button>Start Paper</Button>

        </div>
        </>
    )
}
export default Instructions;