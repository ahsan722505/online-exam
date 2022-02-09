import styles from "./Questions.module.css";
import TextArea from "../../../UI/TextArea";
import Button from "../../../UI/Button";
import ButtonGroup from "../../../UI/ButtonGroup"
import { useState } from "react";

const Questions=()=>{
    
    return (
        <div className={styles.qCont}>
            <label style={{alignSelf : "flex-start"}} htmlFor="qStatement">Enter question statement:</label>
            <TextArea></TextArea>
            <Button style={{alignSelf : "flex-end",marginBottom : "1rem"}} >Add option</Button>
            <div className={styles.option}>
                <span>(a)</span>
                <TextArea></TextArea>
                <Button>remove</Button>
            </div>
            <div className={styles.option}>
                <span>(b)</span>
                <TextArea></TextArea>
                <Button>remove</Button>
            </div>
            <ButtonGroup>
                <Button>Previous Question</Button>
                <Button>Next Question</Button>
            </ButtonGroup>
            

            
        </div>
    )
}
export default Questions;