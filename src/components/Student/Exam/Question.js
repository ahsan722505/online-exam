import Option from "./Option";
import styles from "./Question.module.css";
const Question=(props)=>{
    return(
        <div className={styles.question}>
            <div className={styles.statement}>
                <h3>Q. {props.question.statement}</h3>
            </div>
            <div className={styles.options}>
                {props.question.options.map((eachOption,i)=> <Option currentAnswer={props.currentAnswer} onAnswer={props.onAnswer} id={i}  key={i} option={eachOption}/>)}    
            </div>
        </div>

    )
}
export default Question;