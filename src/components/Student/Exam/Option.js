import styles from "./Option.module.css"
const Option=(props)=>{
    return(
        <div style={{marginBottom : "1rem"}}>
            <input id={props.id} checked={props.currentAnswer === props.id} type="radio" name="option" onChange={()=>props.onAnswer(props
                .id) }/>
            <label style={{marginLeft : "1rem"}} htmlFor={props.id}>{props.option.statement}</label>
            <br/>
        </div>
    )
}
export default Option;