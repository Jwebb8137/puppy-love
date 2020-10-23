import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import './ResultsList.css';
import Carousel from '../Carousel/Carousel';
import Dog from '../../images/dog.jpg';
import ButtonAlt from "../Buttons/ButtonAlt";

const ResultsList = (props) => {
  console.log(props.isAuth)
  if (!props.isAuth) {
    return(
      <Fragment>
        <div className="flex-col bg-pink">
          <div className="results-alt">
            <div className="w-full">
              <img src={Dog} className="w-100"/>
            </div>
            <h2 id="results-heading">
              Ready To Start <span className="pink">Looking?</span>
            </h2>
            <div className="row flex-col">
              <p className="mt-1 sub-text">Create an account to start browsing now!</p>
              <Link to="signup"><ButtonAlt name="Sign Up" icon="fa fa-paw"/></Link>
            </div>
            <div className="row jc-center">
              <Link to="signin" className="sub-link">Login</Link>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <div className="bg-pink-alt">
        <Carousel />
      </div>
    </Fragment>
  )
}

export default ResultsList;