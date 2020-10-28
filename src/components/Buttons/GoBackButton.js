import React from 'react'
import {withRouter} from 'react-router-dom';
import "./GoBackButton.css"

const GoBackButton = (props) => {
  const handleBack = () => {
    props.history.goBack();
  }
  return (
    <button className="go-back-btn" onClick={handleBack}><i className="fas fa-caret-left"></i> Go Back</button>
  )
}

export default withRouter(GoBackButton);