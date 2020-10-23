import React from 'react'
import {Link} from 'react-router-dom';
import Main from '../../images/Main.png';
import AltMain from '../../images/bg-exp.png';
import Photo1 from '../../images/Photo1.png';
import Photo2 from '../../images/Photo2.png';
import Button from '../Buttons/Button';
import ButtonAlt from '../Buttons/ButtonAlt';
import './Home.css'

class Home extends React.Component {
  render() {
    return(
      <div className='main'>
        <img id='main-img' src={Main} alt='Puppy Love'/>
        <img id='sec-img' src={AltMain} alt='Puppy Love'/>
        <div className='btn-container'>
          <Link to='/signup'><Button name='Sign Up' icon='fas fa-plus'/></Link>
          <Link to='signin'><ButtonAlt name='Login' icon='fas fa-sign-in-alt'/></Link>      
        </div>
        <h2 className="mt-5">Pet <span className="pink">Lovers</span> Unite!</h2>
        <p className="sub-text">A dating app focused on pets? This should have been thought of sooner ...</p>
        <div className='container'>
          <img src={Photo1} className='photo-100'/>
          <div>
            <i class="fas fa-paw lg-icon pink"></i>
            <h2 className='sub-heading'>The secret to finding <span className='pink'>LOVE</span>?</h2>
            <p className='sub-text'>For pet lovers that's easy! Your furry best friend not only hold's our heart but is going to be your key for finding that special someone!</p>
            <Link to='signup'><Button name='Sign Up Now' icon='fas fa-paw'/></Link>
          </div>
          <img src={Photo2} className='photo-100'/>
          <div>
            <i class="fas fa-heart lg-icon pink"></i>            
            <h2 className='sub-heading'>Matching with a fellow <span className='pink'>PET LOVER</span> just makes sense!</h2>
            <p className='sub-text'>Knowing how special your furry companion is to you why would you waste time with anyone who wouldn't feel the same?</p>
            <Link to='browse'><ButtonAlt name='Look Nearby' icon='fas fa-city'/></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;