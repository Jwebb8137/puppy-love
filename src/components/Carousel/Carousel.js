import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ProfileCard from '../ProfileCard/ProfileCard';
import './Carousel.css';

const DemoCarousel = () => {

  const [profiles, setProfiles] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const getProfiles = async () => {
    try {   
      const response = await fetch("/users")
      const jsonData = await response.json()

      setProfiles(jsonData)
    } catch (err) {
        console.error(err.message)
    }
  }

  async function getUser() {
    try {
      const response = await fetch("/dashboard/", {
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