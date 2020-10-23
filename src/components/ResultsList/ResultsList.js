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
        <div className="container">
          <h2>
            Ready To Start <span className="pink">Looking?</span>
          </h2>
          <img src={Dog} className="w-100 mt-5"/>
          <div className="row flex-col">
            <p className="mt-5">Create an account to start browsing now!</p>
            <Link to="signup"><ButtonAlt name="Sign Up" icon="fa fa-paw"/></Link>
          </div>
        </div>
        <Link to="signin" className="sub-link">Login</Link>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Carousel />
      <Link to="/" className="home-link"><h2 className="carousel-heading">Puppy <span className="pink">Love</span> <i class="fas fa-paw"></i></h2></Link>
    </Fragment>
  )
}

export default ResultsList;