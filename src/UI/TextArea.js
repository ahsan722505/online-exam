import React from 'react'

const TextArea = ({children,style}) => {
  return (
    <textarea rows="2" cols="30" style={{resize : "none",...style}}>{children}</textarea>
  )
}

export default TextArea