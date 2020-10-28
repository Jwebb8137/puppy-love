import React from "react";
import "./Modal.css";

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }
  
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
        <i className="fas fa-window-close pink" onClick={this.onClose}></i>
        <img src={this.props.img} className="profile-img" alt="Cute Animal"/>
        <i className="fas fa-paw modal-icon"></i>
        <h2><span className="pink">{this.props.petName}'s</span> Profile!</h2>
        <div className="content">
          <div>
            {this.props.petDescription}
          </div>
          <div>
           <h3 className="profile-sub-heading">My <span className="pink">Hobbies! </span><i className="fas fa-hiking"></i></h3>
            {this.props.petHobbies}
          </div>
          <div>
            <h3 className="profile-sub-heading">Our <span className="pink">Story! </span><i className="fas fa-heartbeat"></i></h3>
            {this.props.petMeet}
            </div>
        </div>
        <div className="actions">
          <button className="toggle-button btn font-alt" onClick={this.onClose}>
            Close <i className="fas fa-times color-w ml-1"></i>
          </button>
        </div>
      </div>
    );
  }
}