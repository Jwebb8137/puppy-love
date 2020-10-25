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
            <Link to='/'><li className="top-border" onClick={this.handleMenu}><i className="fas fa-home"></i> Home</li></Link>
            <Link to='/browse'><li onClick={this.handleMenu}><i className="fas fa-users"></i> Browse</li></Link>
            <Link to='/signin'><li onClick={this.handleMenu}><i className="fas fa-user"></i> Login</li></Link>
            <label htmlFor="toggle-btn" className="hide-menu-btn" onClick={this.handleMenu}><i className="fas fa-times"></i></label>
            <img src={Logo} id="mobile-logo"/>
          </ul>
          <label htmlFor="toggle-btn" className="show-menu-btn"><i className="fas fa-bars" onClick={this.handleMenu}></i></label>
        </nav>
      </header>
    )
  }
}