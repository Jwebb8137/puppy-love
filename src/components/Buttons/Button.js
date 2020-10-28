import React from 'react';
import './Button.css';

const Button = ({ name, icon }) => {
  return (
    <button className="btn btn-sm btn-sm-bg">{name} <i className={icon}></i></button>
  )
}

export default Button