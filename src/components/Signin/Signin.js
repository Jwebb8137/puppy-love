import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import './Signin.css';

const SignIn = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    username: "",
    passwordInput: ""
  });
  const [err, setError] = useState("");
  const { API_ENDPOINT } = config;
  const { username, passwordInput } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = { username, passwordInput };
      const response = await fetch(`${API_ENDPOINT}/api/login`, {
        method: "POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
    } catch (err) {
      console.error(err.message)
      setError("Wrong username or password, try again!")
    }
  };

  return (
    <div className='signin'>
      <h2 className="signin-heading">Puppy<span className="pink">Love </span><i className="fas fa-paw"></i></h2>
      <form id="sign-in" className="form-container" onSubmit={onSubmitForm}>
      <h3 className="signup-sub-heading"><span className="pink">Welcome</span> Back!</h3>
        <div className="container">
          <div className="row flex-col">
            <div className='input-field'>
              <input typeof='text' value={username} onChange={e => onChange(e)} name="username" placeholder="Username" required/>
            </div>
            <div className='input-field'>
              <input type='password' value={passwordInput} onChange={e => onChange(e)} name="passwordInput" placeholder="Password" required/>
            </div>
          </div>
        </div>
        <div className="err-msg">
          {err}
        </div>
        <button id="profile-submit" className="btn-sm btn-sm-bg-alt">Sign In <i className="fas fa-caret-right"></i></button>
        <span className="mt-5"></span>
        <Link to="/signup" className="pink">Create Account <i className="fas fa-angle-right"></i></Link>
      </form>
    </div>
  )
}

export default SignIn;