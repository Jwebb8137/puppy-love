import React from 'react';
import './Button.css';

const Button = ({ name, icon }) => {
  return (
    <button class="btn btn-sm btn-sm-bg">{name} <i class={icon}></i></button>
  )
}

export default Button