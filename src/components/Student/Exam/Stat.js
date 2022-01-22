import styles from "./Stat.module.css";
import Info from "./Info";
const Stat=({answers,questions,onChangeQuestion})=>{
    const oneD=new Array(questions).fill(0).map((_,index)=>index);
    const twoD = [];
    while(oneD.length) twoD.push(oneD.splice(0,8));
return (
    <div>
        <div className={styles.qStat}>
            {twoD.map((eachRow,i)=>{
                return <div key={i} className={styles.row}>
                    {eachRow.map((eachCell,i)=>{
                        return <div style={{backgroundColor : answers[eachCell] === null ? "var(--color3)" : "var(--color2)"}} key={i} onClick={()=> onChangeQuestion(eachCell)} className={styles.cell}>{eachCell+1}</div>
                    })}
                </div>
            })}
        </div>
        <Info/>
        
    </div>
)
}
export default Stat;