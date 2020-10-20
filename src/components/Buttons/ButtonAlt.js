import React from 'react'
import './ButtonAlt.css'

const ButtonAlt = ({ name, icon }) => {
  return (
    <a class="btn btn-sm btn-alt btn-sm-bg-alt">{name} <i class={icon}></i></a>
  )
}

export default ButtonAlt