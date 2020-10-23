import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ProfileCard from '../ProfileCard/ProfileCard';
import config from '../../config';
import './Carousel.css';

const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState("");

const DemoCarousel = () => {

  const { API_ENDPOINT } = config;

  const [profiles, setProfiles] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const getProfiles = async () => {
    try {   
      const response = await fetch(`${API_ENDPOINT}users`);
      const jsonData = await response.json();

      setProfiles(jsonData);
      setIsLoading(false);
    } catch (err) {
        console.error(err.message)
        setError(err)
    }
  }

  async function getUser() {
    try {
      const response = await fetch(`${API_ENDPOINT}dashboard`, {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      setUserInfo(parseRes)

      console.log("Getting user info")

    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getProfiles();
    getUser();
  }, []);

  console.log(userInfo)

  if (error) {
    return <p>{error}</p>;
  } else if (isLoading) {
    return <p className="loading-msg">Loading Users... <br />
      <i class="fas fa-paw pink mt-5"></i></p>;
  }

  return (
      <Carousel>
        {profiles
          .filter(profile => profile.user_id !== userInfo.user_id && profile.gender === userInfo.seeking_gender)
          .map(profile => {
          return (
            <ProfileCard 
              id={profile.user_id}
              username={profile.username}
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