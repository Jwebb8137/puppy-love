import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";
import Cat from '../../images/cat.png';

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
        <i class="fas fa-window-close pink" onClick={this.onClose}></i>
        <img src={this.props.img} className="profile-img"/>
        <i className="fas fa-paw modal-icon"></i>
        <h2><span className="pink">{this.props.petName}'s</span> Profile!</h2>
        <div class="content">
          <div>
            {this.props.petDescription}
          </div>
          <div>
            <h3 className="modal-sub-heading"><span className="pink">Hobbies </span><i class="fas fa-fish"></i></h3>
            {this.props.petHobbies}
          </div>
          <div>
            <h3 className="modal-sub-heading"><span className="pink">Our Story </span><i class="fas fa-heartbeat"></i></h3>
            {this.props.petMeet}
          </div>
        </div>
        <div class="actions">
          <button class="toggle-button btn font-alt" onClick={this.onClose}>
            Close <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};