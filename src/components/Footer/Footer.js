import React, { Fragment } from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <Fragment>
      <div className="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="https://puppylove.com/"> PuppyLove.com <i className="fas fa-paw"></i></a>
      </div>
    </Fragment>
  )
}

export default Footer