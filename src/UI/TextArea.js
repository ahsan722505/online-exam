import React from 'react'

const TextArea = ({children,style,onChange}) => {
  return (
    <textarea onChange={onChange} value={children} rows="2" cols="30" style={{resize : "none",...style}}></textarea>
  )
}

export default TextArea