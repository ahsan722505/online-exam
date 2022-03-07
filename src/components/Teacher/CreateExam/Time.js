import React from 'react'
import generalStyles from "../../../GeneralStyles.module.css"
const Time = () => {
  
  return (
    <div className={generalStyles.form}>
      <div className={generalStyles.formControl}>
        <label htmlFor="datetime">Date and Time for exam:</label>
        <input id="datetime" type="datetime-local" onChange={(e)=> console.log(e.target.value)}/>
      </div>
      <div className={generalStyles.formControl}>
        <label htmlFor="duration">Enter paper duration (In minutes):</label>
        <input id="duration" type="text" />
      </div>
    </div>
  )
}

export default Time