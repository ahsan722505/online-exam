import styles from "./Button.module.css"
const Button=(props)=>{
    return(
        <button className={styles.btn} {...props}>{props.children}</button>
    )
}
export default Button;