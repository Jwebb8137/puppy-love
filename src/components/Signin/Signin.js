import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import './Signin.css';

const SignIn = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    username: "",
    passwordInput: ""
  });

  const { API_ENDPOINT } = config;
  console.log(API_ENDPOINT)

  const { username, passwordInput } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

    const onSubmitForm = async e => {
      e.preventDefault();

      try {
        const body = { username, passwordInput };
        console.log(body)
        const response = await fetch(`${API_ENDPOINT}login`, {
          method: "POST",
          headers: {"Content-type" : "application/json"},
          body: JSON.stringify(body)
        });

        const parseRes = await response.json();

        localStorage.setItem("token", parseRes.token);

        setAuth(true);
      } catch (err) {
        console.error(err.message)
      }
    };

  return (
    <div className='signup'>
      <h2 className="signup-heading">Puppy <span className="pink">Love </span><i class="fas fa-paw"></i></h2>
      <form id="sign-in" className="form-container" onSubmit={onSubmitForm}>
      <h3 className="signup-sub-heading"><span className="pink">Welcome</span> Back!</h3>
        <div className="container">
          <div className="row flex-col">
            <div className='input-field'>
              <input typeof='text' value={username} onChange={e => onChange(e)} name="username" placeholder="Username"/>
            </div>
            <div className='input-field'>
              <input type='password' value={passwordInput} onChange={e => onChange(e)} name="passwordInput" placeholder="Password"/>
            </div>
          </div>
        </div>
        <button id="profile-submit" className="btn-sm btn-sm-bg-alt">Sign In <i class="fas fa-caret-right"></i></button>
        <span className="mt-5"></span>
        <Link to="/signup" className="pink">Create Account <i class="fas fa-angle-right"></i></Link>
      </form>
    </div>
  )
}

export default SignIn;