import styles from "./Info.module.css"
const Info=(props)=>{
    return (
        <div className={styles.info}>
            <div className={styles.info1}>
                <div/>
                <span>answered</span>
            </div>
            <div className={styles.info2}>
                <div/>
                <span>un-answered</span>
            </div>
        </div>
    )
}
export default Info;