import React, {Fragment, useState, useEffect} from "react";
import config from '../../config';
import './Dashboard.css';

const Dashboard = ({ setAuth }) => {

  const { API_ENDPOINT } = config;

  const [userInfo, setUserInfo] = useState("");

  async function getName() {
    try {
      const response = await fetch(`${API_ENDPOINT}dashboard`, {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      setUserInfo(parseRes)

      console.log(parseRes)

    } catch (err) {
      console.error(err.message)
    }
  }

  const { user_id, headline, age, description, email, first_name, gender, last_name, pet_description, pet_name, pet_type, photo_url, seeking_gender, username} = userInfo;

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }

  useEffect(() => {
    getName()
  }, []);
  return (
    <Fragment>
      <div className="pink-bg">
        <div className="dash-container">
          <div className="img-container">
            <img className="dash-img" src={photo_url} />
          </div>
          <div className="container">
            <div className="row mt-5 jc-center">
              <button className="dash-btn" onClick={e => logout(e)}>Logout <i class="fas fa-sign-in-alt"></i></button>
              <button className="dash-btn">Edit Profile</button>
            </div>
          </div>
          <h2 className="dash-header"><i class="fas fa-paw"></i> <span className="pink">{first_name}'s Account</span> <i class="fas fa-paw"></i></h2>
          <div className="info-container">
            <h2 className="mt-5"><span className="pink">Your Account</span></h2>          
            <div className="info-row">
              <p>Email: <span className="font-alt">{email}</span></p>
            </div>
            <div className="info-row">
              <p>Username: <span className="font-alt">{username}</span></p>
            </div>
            <div className="info-row">
              <p>Headline: <span className="font-alt">{headline}</span></p>
            </div>
            <div className="info-row">
              <p>First Name: <span className="font-alt">{first_name}</span></p>
            </div>
            <div className="info-row">
              <p>Last Name: <span className="font-alt">{last_name}</span></p>
            </div>
            <div className="info-row">
              <p>Description: <span className="font-alt">{description}</span></p>
            </div>
            <div className="info-row">
              <p>Age: <span className="font-alt">{age}</span></p>
            </div>
            <div className="info-row">
              <p>Gender: <span className="font-alt">{gender}</span></p>
            </div>
            <div className="info-row">
              <p>Seeking: <span className="font-alt">{seeking_gender}</span></p>
            </div>
            <div className="info-row">
              <p>Pet Name: <span className="font-alt">{pet_name}</span></p>
            </div>
            <div className="info-row">
              <p>Pet Type: <span className="font-alt">{pet_type}</span></p>
            </div>
            <div className="info-row">
              <p>Pet Description: <span className="font-alt">{pet_description}</span></p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard;