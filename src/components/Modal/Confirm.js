import React from "react";
import "./Confirm.css";
import config from '../../config';

const { API_ENDPOINT } = config;

export default class Confirm extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  deleteAccount = async (e) => {
    const user = this.props.user;
    console.log(user)
    try {
      // eslint-disable-next-line
      const response = await fetch(`${API_ENDPOINT}/api/users/${user}`, {
        method: "DELETE",
        headers: { token: localStorage.token }
      });
    } catch (err) {
      console.error(err.message)
    }
    localStorage.clear();
    window.location.reload()
  };

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }
  
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="delete-modal">
        <i id="delete-close" className="fas fa-window-close pink" onClick={this.onClose}></i>
        <div className="delete-content mt-10">
          <h3>Are you sure you want to delete <br /> your account?</h3>
        </div>
        <div className="container delete-content">
          <p>There is no way to recover your account once it is deleted. To confirm your decision press delete below.</p>
          <button id="delete-btn" onClick={e => this.deleteAccount(e)} className="toggle-button btn font-alt mt-10">
            Delete <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  }
}