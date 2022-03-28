import styles from "./Option.module.css"
const Option=(props)=>{
    return(
        <div style={{marginBottom : "1rem"}}>
            <input id={props.id} checked={props.currentAnswer === props.id} type="checkbox" name="option" onChange={(e)=>props.onAnswer({option : props.id ,select : e.target.checked}) }/>
            <label style={{marginLeft : "1rem"}} htmlFor={props.id}>{props.option.statement}</label>
            <br/>
        </div>
    )
}
export default Option;