import styles from "./ButtonGroup.module.css"

const ButtonGroup = ({children,style}) => {
  return (
    <div className={styles.group} style={{...style}}>{children}</div>
  )
}

export default ButtonGroup