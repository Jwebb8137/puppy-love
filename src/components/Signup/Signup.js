import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import config from '../../config';
import './Signup.css';

const Signup = ({ setAuth }) => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [headline, setHeadline] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [age, setAge] = useState("24");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [pet_name, setPetname] = useState("");
  const [seeking_gender, setSeekingGender] = useState("");
  const [pet_type, setPetType] = useState("");
  const [description, setDescription] = useState("");
  const [pet_description, setPetDescription] = useState("");
  const [pet_hobbies, setPetHobbies] = useState("");
  const [pet_meet_description, setPetMeetDescription] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [petFileInputState, setPetFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [previewPetSource, setPreviewPetSource] = useState("");

  const { API_ENDPOINT } = config;

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if(!previewSource) return;

    console.log("Form submitted")

    try {
      const body = { email, username, password, headline, first_name, last_name, age, hobbies, gender, seeking_gender, description, pet_type, pet_name, pet_description, pet_meet_description, pet_hobbies, previewSource, previewPetSource }
      const response = await fetch(`${API_ENDPOINT}users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
      // window.location = "/browse"

    } catch (err) {
      console.error(err.message)
    }
  }

  //Profile image file

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  //Pet image file

  const handlePetFileInputChange = (e) => {
    const petFile = e.target.files[0]
    previewPetFile(petFile)
  }

  const previewPetFile = (petFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(petFile);
    reader.onloadend = () => {
      setPreviewPetSource(reader.result);
    }
  }

  return (
    <div className='signup'>
      <form className="form-container" onSubmit={e => onSubmitForm(e)}>
      <h2 className="signup-heading">Puppy <span className="pink">Love </span><i class="fas fa-paw"></i></h2>
      <h3 className="signup-sub-heading">Let's <span className="pink">Get Started!</span></h3>
        <div className="container-col">
          <div className='input-field mt-5'>
            <label>Email </label>
            <input typeof='email' value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className='input-field'>
            <label>Username </label>
            <input typeof='text' value={username} onChange={e => setUsername(e.target.value)}/>
          </div>
          <div className='input-field'>
            <label>Password </label>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <h3 className="signup-sub-heading mt-10">All About <span className="pink">You!</span></h3>
          <div className='input-field'>
            {previewSource && (
              <img 
                className="profile-preview"
                src={previewSource} 
                alt="chosen" 
              />
            )}
            {!previewSource && (
              <i class="fas fa-user-circle"></i>
            )}
            <input type="file"
              value={fileInputState} 
              onChange={handleFileInputChange} 
              name="image" 
              id="file" 
              class="inputfile" 
            />
            <label htmlFor="file">Upload Picture</label>
          </div>
          <div className='input-field mt-5'>
            <label>Headline</label>
            <input typeof='text' value={headline} maxlength="50" onChange={e => setHeadline(e.target.value)}/>
          </div>
          <span className="form-helper-text">(Your best one-liner! Keep it short tho <i class="fas fa-paw"></i>)</span>
          <div className="row mt-5">
            <div className='input-field'>
              <label>I am</label>
              <select onChange={e => setGender(e.target.value)}>
                <option value="none" selected disabled hidden></option> 
                <option value="male">A Man</option>
                <option value="female">A Woman</option>
              </select>
            </div>
            <div className='input-field ml-5'>
              <label>Seeking </label>
              <select onChange={e => setSeekingGender(e.target.value)}>
                <option value="none" selected disabled hidden></option> 
                <option value="male">A Man</option>
                <option value="female">A Woman</option>
              </select>
            </div>
          </div>
          <div className='input-field'>
            <label>First Name </label>
            <input typeof='text'  value={first_name} onChange={e => setFirstname(e.target.value)}/>
          </div>
          <div className='input-field'>
            <label>Last Name </label>
            <input typeof='text'  value={last_name} onChange={e => setLastname(e.target.value)}/>
          </div>
          <div className="mt-5">
            <label htmlFor="age" className="block">Your Age</label>
            <span className="age-range">18</span>
            <input className="range-input" type="range" id="age" name="age"
                  min="18" max="75" defaultValue="24" onChange={e => setAge(e.target.value)}/>
            <span className="age-range">75+</span>
            <span className="age-preview block">{age}</span>
          </div>
          <div className='input-field mt-5'>
            <label>A quick <span className="pink">introduction</span>!</label>
            <span className="form-helper-text block mt-1">(What do you want others to know that makes you, well you! <i class="fas fa-paw"></i>)</span>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Tell us a little about yourself!"
              maxlength="250">         
            </textarea>
          </div>
          <div className='input-field mt-5'>
            <label>Your <span className="pink">Hobbies & Interests</span>!</label>
            <span className="form-helper-text block mt-1">(Passions, interests, and other things you absolutely love to do! <i class="fas fa-paw"></i>)</span>
            <textarea 
              value={hobbies}
              onChange={e => setHobbies(e.target.value)}
              placeholder="Tell us a little about yourself!"
              maxlength="250">         
            </textarea>
          </div>
          <h3 className="signup-sub-heading mt-10">All About <span className="pink">Your Pet!</span></h3>
          <span className="form-helper-text block mt-1">Here is your chance to show them off! <i class="fas fa-paw"></i></span>
          <div className='input-field'>
            {previewPetSource && (
              <img 
                className="profile-preview"
                src={previewPetSource} 
                alt="chosen" 
              />
            )}
            {!previewPetSource && (
              <i class="fas fa-user-circle"></i>
            )}
            <input type="file"
              value={petFileInputState} 
              onChange={handlePetFileInputChange} 
              name="pet_image" 
              id="petFile" 
              class="petinputfile" 
            />
            <label htmlFor="petFile">Upload Picture</label>
          </div>
          <div className='input-field mt-5'>
            <label>Pet Name </label>
            <input typeof='text' value={pet_name} onChange={e => setPetname(e.target.value)}/>
          </div>
          <div className='input-field'>
            <label className="block">Pet Type </label>
            <select onChange={e => setPetType(e.target.value)} className="w-expanded">
              <option value="none" selected disabled hidden></option> 
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>
          <div className='input-field mt-5'>
            <label>Your Pet's <span className="pink">introduction</span>!</label>
            <span className="form-helper-text block mt-1">(Your chance to introduce your pet to the world! <i class="fas fa-paw"></i>)</span>
            <textarea 
              value={pet_description}
              onChange={e => setPetDescription(e.target.value)}
              maxlength="250">         
            </textarea>
          </div>
          <div className='input-field mt-5'>
            <label>Your Pet's <span className="pink">Hobbies</span>!</label>
            <span className="form-helper-text block mt-1">(Cool tricks, favorite treats, and anything else you want to share! <i class="fas fa-paw"></i>)</span>
            <textarea 
              value={pet_hobbies}
              onChange={e => setPetHobbies(e.target.value)}
              maxlength="250">         
            </textarea>
          </div>
          <div className='input-field mt-5'>
            <label>How Did You <span className="pink">Meet</span>?</label>
            <span className="form-helper-text block mt-1">(We want to know how you and your pet found each other / or met! <i class="fas fa-paw"></i>)</span>
            <textarea 
              value={pet_meet_description}
              onChange={e => setPetMeetDescription(e.target.value)}
              maxlength="250">         
            </textarea>
          </div>
        </div>
        <button typeof="submit" id="profile-submit" className="btn-sm btn-sm-bg-alt">Get Started <i class="fas fa-caret-right"></i></button>
      </form>
    </div>
  )
}

export default Signup;