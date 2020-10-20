import React from 'react';
import './Button.css';

const Button = ({ name, icon }) => {
  return (
    <a class="btn btn-sm btn-sm-bg">{name} <i class={icon}></i></a>
  )
}

export default Button