import React from 'react'
import './ButtonAlt.css'

const ButtonAlt = ({ name, icon }) => {
  return (
    <button className="btn btn-sm btn-alt btn-sm-bg-alt">{name} <i className={icon}></i></button>
  )
}

export default ButtonAlt