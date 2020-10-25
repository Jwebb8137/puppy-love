import React from 'react';
import {Link} from 'react-router-dom';
import "./ProfileCard.css";
import Logo from "../../images/logo-alt.jpg";

const ProfileCard = (props) => {
  const profileLink = `/user/${props.id}`;
  const userChat = `/chat/${props.id}`;
  return(
    <div className='results'>
      <img className='profile-img carousel-img' src={props.img} alt="profile-image"/>
      <div className='profile-txt'>
        <div className='icon-container'>
          <i className={`${props.gender} flex-1`}></i>
          <img src={props.petUrl} className="img-bubble flex-2"/>
          <i className={`${props.petType} flex-1`}></i>
        </div>
        <h3 className='profile-name'><i class="fas fa-paw pink"></i> {props.firstName} & {props.petName} <i class="fas fa-paw pink"></i></h3>
        <p>{props.headline}</p>
        <Link to={userChat}><button className='btn profile-msg-btn'>Message <i class="fas fa-caret-right"></i></button></Link>
        <Link to={profileLink}><button className='btn-alt-2 profile-msg-btn'>Profile <i class="fas fa-caret-right"></i></button></Link>
      </div>
      <img src={Logo} id="card-icon"/>
    </div>
  )
}

export default ProfileCard