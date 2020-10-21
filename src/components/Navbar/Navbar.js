import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import Logo from '../../images/logo.jpg';

export default class Navbar extends React.Component {
  handleMenu = () => {
    document.getElementById('nav').classList.toggle("nav-respond");
  }

  render() {
    return (
      <header>
        <div className="brand-logo">
          <Link to='/'><img id='logo' className='brand-logo' src={Logo} alt="Brand Logo" /></Link>
        </div>
        <nav>
          <ul  id='nav' className="navigation">
            <Link to='/'><li onClick={this.handleMenu}><i className="fas fa-house-damage"></i> Home</li></Link>
            <Link to='/browse'><li onClick={this.handleMenu}><i className="far fa-image"></i> Browse</li></Link>
            <Link to='/signin'><li onClick={this.handleMenu}><i className="fab fa-blogger-b"></i> Login</li></Link>
            <label htmlFor="toggle-btn" className="hide-menu-btn" onClick={this.handleMenu}><i className="fas fa-times"></i></label>
          </ul>
          <input typeof="checkbox" id="toggle-btn" />
          <label htmlFor="toggle-btn" className="show-menu-btn"><i className="fas fa-bars" onClick={this.handleMenu}></i></label>
        </nav>
      </header>
    )
  }
}