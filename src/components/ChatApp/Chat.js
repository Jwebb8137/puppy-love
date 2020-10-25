import React, { Component } from 'react';
import config from '../../config';
import ChatApp from './ChatApp';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_id: '',
      target_id: this.props.match.params.userid,
      target_user: '',
      target_name: '',
      target_petName: '',
      username: '',
      loggedIn: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  componentDidMount() {

    const { API_ENDPOINT } = config;

    const getCurrentId = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}dashboard`, {
          method: "GET",
          headers: { token: localStorage.token }
        });
  
        const parseRes = await response.json();

        this.setState({
          current_id: parseRes.user_id,
          username: parseRes.username,
          loggedIn: true
        })
  
        console.log(this.state.current_id)
  
      } catch (err) {
        console.error(err.message)
      }
    }

    const getTargetInfo = async () => {
      const target_id = this.state.target_id;
      console.log("This is working")
      try {
        const response = await fetch(`${API_ENDPOINT}target-info?target=${this.state.target_id}`, {
          method: "GET",
          headers: { token: localStorage.token }
        });
  
        const parseRes = await response.json();

        this.setState({
          target_name: parseRes.first_name,
          target_petName: parseRes.pet_name
        })
  
        console.log(this.state.current_id)
  
      } catch (err) {
        console.error(err.message)
      }
    }

    getCurrentId();
    getTargetInfo();
    
  }


  handleLogin(event) {
    event.preventDefault();
    this.setState({ loggedIn: true });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    let loginOrChat;
    if (this.state.loggedIn) {
      loginOrChat = <ChatApp 
        username={this.state.username} 
        targetUser={this.state.target_id}
        targetUsername={this.state.target_name}
        targetPet={this.state.target_petName}
        currentUser={this.state.current_id}
      />;
    // } else {
    //   loginOrChat = (
    //     <ChatLogin
    //       handleLogin={this.handleLogin}
    //       handleUsernameChange={this.handleUsernameChange}
    //       username={this.state.username}
    //     />
    //   );
    }
    return (
      <div className="chat-container container bg-off-white">
        <div className="chat-container">{loginOrChat}</div>
      </div>
    );
  }
}

export default Chat;