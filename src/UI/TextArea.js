import React from 'react'

const TextArea = ({children,style,onChange,rows,cols}) => {
  return (
    <textarea onChange={onChange} value={children} rows={rows || "2"} cols={ cols || "30"} style={{resize : "none",...style}}></textarea>
  )
}

export default TextArea