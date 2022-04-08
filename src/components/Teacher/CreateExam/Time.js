import React from 'react'
import generalStyles from "../../../GeneralStyles.module.css"
import DurationPicker from 'react-duration-picker'
const Time = ({dispatchCreateExam,dateAndTime,duration}) => {
  
  return (
    <div className={generalStyles.form}>
      <div className={generalStyles.formControl}>
        <label htmlFor="datetime">Date and Time for exam:</label>
        <input id="datetime" value={dateAndTime} type="datetime-local" onChange={(e)=> dispatchCreateExam({type : "changeDateAndTime" , payload : e.target.value})}/>
      </div>
      <div className={generalStyles.formControl}>
        <label htmlFor="duration">Enter paper duration (In minutes):</label>
        <input id="duration" type="text" value={duration} onChange={(e)=> dispatchCreateExam({type : "changeDuration" , payload : e.target.value})} />
      </div>
      {/* <div className={generalStyles.formControl} >
      <label htmlFor="duration1">Select exam duration:</label>
          <DurationPicker
          onChange={(d)=>console.log(d)}
          initialDuration={{ hours: 1, minutes: 2, seconds: 3 }}
          id="duration1"
        />
      </div> */}
    </div>
  )
}

export default Time