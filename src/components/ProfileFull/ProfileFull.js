import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import config from '../../config';
import Modal from '../Modal/Modal';
import './ProfileFull.css';

class ProfileFull extends React.Component {
  state = {
    profileInfo: [],
    show: false,
    loading: true
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

    const getProfile = async () => {
      console.log("getting data")
      try {   
        const response = await fetch(`${API_ENDPOINT}users/${currentUserId}`)
        const jsonData = await response.json()
  
        setProfileInfo(jsonData)
      } catch (err) {
          console.error(err.message)
      }
    }  
    getProfile();
  }  

  render() {
    const currentUserId = this.props.match.params.userid;
    const userChat = `/chat/${currentUserId}`;
    const {first_name, last_name, age, hobbies, pet_name, pet_type, pet_hobbies, pet_meet_description, username, description, gender, seeking_gender, photo_url, pet_description, photo_pet_url} = this.state.profileInfo;
    const petIcon = `fas fa-${pet_type}`;
    const genderIcon = `fas fa-${gender}`;

    if (this.state.loading) {
      return (
        <div className="loading-msg">
          <i class="fas fa-paw pink loading-icon"></i>
          <p>Loading Profile ...</p>
          <i class="fas fa-paw pink loading-icon"></i>
       </div>
      )
    }

    return (
      <Fragment>
        <div className="main container bg-white">
          <div className="sub-container">
            <h1 className="profile-heading">{first_name} & {pet_name}</h1>
            <span className="w-100 username-text">
              <i class="far fa-star pink"></i>
                {username}
              <i class="far fa-star pink"></i>
            </span>
            <div className="profile-img-container">
              <img className="profile-full-img" src={photo_url}/>
            </div>
            <div className="about-container">
              <h3 className="profile-sub-heading">About <span className="pink">Me! </span><i class={genderIcon}></i></h3>
              <p className="profile-sub-text">{description}</p>
            </div>
            <Link to={userChat} className="home-link"><button className='toggle-button btn modal-btn'>Message <i class="fas fa-comment"></i></button></Link>
            <div className="about-container">
              <h3 className="profile-sub-heading">Meet <span className="pink">{pet_name}! </span><i className={petIcon}></i></h3>
              <p className="profile-sub-text">{pet_description}</p>
              <button
                class="toggle-button btn modal-btn"
                id="centered-toggle-button"
                onClick={e => {
                    this.showModal(e);
                  }}
                >
                {" "}
                {pet_name}'s Profile <i class="fas fa-caret-right"></i>{" "}
              </button>
            </div>
            <div className="about-container">
              <h3 className="profile-sub-heading">My <span className="pink">Hobbies! </span><i class="fas fa-hiking"></i></h3>
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
          <Modal onClose={this.showModal} show={this.state.show} img={this.state.profileInfo.photo_pet_url} petName={pet_name} petDescription={pet_description} petHobbies={pet_hobbies} petMeet={pet_meet_description}>
            {pet_description}
          </Modal>
        </div>
      </Fragment>
    )  
  }
}

export default ProfileFull;