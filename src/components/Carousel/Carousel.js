import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ProfileCard from '../ProfileCard/ProfileCard';
import config from '../../config';
import './Carousel.css';

const DemoCarousel = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const { API_ENDPOINT } = config;
  const [profiles, setProfiles] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getProfiles = async () => {
    try {   
      const response = await fetch(`${API_ENDPOINT}/api/users`);
      const jsonData = await JSON.parse(JSON.stringify(response));

      setProfiles(jsonData);
      setIsLoading(false)
    } catch (err) {
        console.error(err.message)
    }
  }

  async function getUser() {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/dashboard`, {
        method: "GET",
        headers: { token: localStorage.token }
      });
      const parseRes = await JSON.parse(JSON.stringify(response));
      setUserInfo(parseRes)
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    getProfiles();
    getUser();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div className="loading-msg">
        <i className="fas fa-paw pink loading-icon"></i>
        <p>Searching Your Area ...</p>
        <i className="fas fa-paw pink loading-icon"></i>
      </div>
    )
  }
  return (
    <Carousel showThumbs={false}>
      {profiles
        .filter(profile => profile.user_id !== userInfo.user_id && profile.gender === userInfo.seeking_gender)
        .map(profile => {
        return (
          <ProfileCard
            key={profile.user_id} 
            id={profile.user_id}
            username={profile.username}
            user_id={userInfo.user_id}
            img={profile.photo_url} 
            firstName={profile.first_name}
            lastName={profile.last_name}
            petName={profile.pet_name}
            description={profile.description}
            headline={profile.headline}
            gender={`fas fa-${profile.gender}`}
            petType={`fas fa-${profile.pet_type}`}
            petUrl={profile.photo_pet_url}
          />
        )
      })}
    </Carousel>
  );
};

export default DemoCarousel;