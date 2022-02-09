import React from 'react'

const NavigationArrow = ({direction,disable,onClick}) => {
  return (
    <i className={`fas fa-chevron-${direction}`} style={{fontSize : "1.5rem", cursor : "pointer" ,color : disable ? "gray" : ""}} onClick={onClick} ></i>
  )
}

export default NavigationArrow