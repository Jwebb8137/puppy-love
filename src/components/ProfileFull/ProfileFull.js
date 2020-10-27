import { parse } from 'query-string';
import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import config from '../../config';
import Modal from '../Modal/Modal';
import './ProfileFull.css';

class ProfileFull extends React.Component {
  state = {
    profileInfo: [],
    show: false,
    loading: true,
    current_id: ""
  };

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  componentDidMount = () => {
    const currentUserId = this.props.match.params.userid;
    const { API_ENDPOINT } = config;
    const setProfileInfo = (jsonData) => {
      this.setState({
        profileInfo: jsonData,
        loading: false
      });
    };

    const getName = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}dashboard`, {
          method: "GET",
          headers: { token: localStorage.token }
        });
  
        const parseRes = await response.json();
        console.log(parseRes)
        this.setState({
          current_id: parseRes.user_id
        })
      } catch (err) {
        console.error(err.message)
      }
    }

    const getProfile = async () => {
      try {   
        const response = await fetch(`${API_ENDPOINT}users/${currentUserId}`)
        const jsonData = await response.json()
  
        setProfileInfo(jsonData)
      } catch (err) {
          console.error(err.message)
      }
    }  
    getName();
    getProfile();
  }  

  render() {
    // const currentUserId = this.props.match.params.userid;
    // const url =`../chat/user?q=${convo.uniqueName}`
    console.log(this.state)
    const userChat = `/chat/user?user=${this.state.current_id}&target=${this.state.profileInfo.user_id}`;
    const {first_name, last_name, age, hobbies, pet_name, pet_type, pet_hobbies, pet_meet_description, username, description, gender, seeking_gender, photo_url, pet_description, photo_pet_url} = this.state.profileInfo;
    const petIcon = `fas fa-${pet_type}`;
    const genderIcon = `fas fa-${gender}`;

    if (this.state.loading) {
      return (
        <div className="loading-msg">
          <i className="fas fa-paw pink loading-icon"></i>
          <p>Loading Profile ...</p>
          <i className="fas fa-paw pink loading-icon"></i>
       </div>
      )
    }

    return (
      <Fragment>
        <div className="main container bg-white">
          <div className="sub-container">
            <h1 className="profile-heading">{first_name} & {pet_name}</h1>
            <span className="w-100 username-text">
              <i className="far fa-star pink"></i>
                {username}
              <i className="far fa-star pink"></i>
            </span>
            <div className="profile-img-container">
              <img className="profile-full-img" src={photo_url} alt=""/>
            </div>
            <div className="about-container">
              <h3 className="profile-sub-heading">About <span className="pink">Me! </span><i className={genderIcon}></i></h3>
              <p className="profile-sub-text">{description}</p>
            </div>
            <Link to={userChat} className="home-link"><button className='toggle-button btn modal-btn'>Message <i className="fas fa-comment"></i></button></Link>
            <div className="about-container">
              <h3 className="profile-sub-heading">Meet <span className="pink">{pet_name}! </span><i className={petIcon}></i></h3>
              <p className="profile-sub-text">{pet_description}</p>
              <button
                className="toggle-button btn modal-btn"
                id="centered-toggle-button"
                onClick={e => {
                    this.showModal(e);
                  }}
                >
                {" "}
                {pet_name}'s Profile <i className="fas fa-caret-right"></i>{" "}
              </button>
            </div>
            <div className="about-container">
              <h3 className="profile-sub-heading">My <span className="pink">Hobbies! </span><i className="fas fa-hiking"></i></h3>
              <p className="profile-sub-text">{hobbies}</p>
            </div>
            <h3 className="fp-heading">Additional <span className="pink">Information!</span></h3>  
            <div className="add-container">
             <div className="info-row">
                <p>First Name: <span className="font-alt">{first_name}</span></p>
              </div>            
              <div className="info-row">
                <p>Last Name: <span className="font-alt">{last_name}</span></p>
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
            </div>
          </div>
        </div>
        <div className="modal-container">
          <Modal onClose={this.showModal} show={this.state.show} img={photo_pet_url} petName={pet_name} petDescription={pet_description} petHobbies={pet_hobbies} petMeet={pet_meet_description}>
            {pet_description}
          </Modal>
        </div>
      </Fragment>
    )  
  }
}

export default ProfileFull;