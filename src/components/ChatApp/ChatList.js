import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import Chat from 'twilio-chat';
import config from '../../config';
import "./ChatList.css";
import Logo from "../../images/logo-alt.jpg";
import Cat from "../../images/no-messages.jpg";
import Conversation from "./Conversation";
import ButtonAlt from "../../components/Buttons/ButtonAlt";

require('dotenv').config();

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_id: "",
      username: "",
      logginIn: "",
      error: null,
      isLoading: true,
      messages: [],
      messageList: false
    };
  }

  componentDidMount() {
    const { API_ENDPOINT } = config;
    async function getName() {
      try {
        const response = await fetch(`${API_ENDPOINT}/api/dashboard`, {
          method: "GET",
          headers: { token: localStorage.token }
        }); 
        const parseRes = await response.json();
        chatClient(parseRes)
      } catch (err) {
        console.error(err.message)
      }
    }
    getName();

    const chatClient = async (parseRes) => {
      const { API_ENDPOINT } = config;
      fetch(`${API_ENDPOINT}/chat/token`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        body: `identity=${encodeURIComponent(parseRes.username)}`
      })
      .then(res => res.json())
      .then(this.setState({username: parseRes.username}))
      .then(this.setState({current_id: parseRes.user_id}))
      .then(data => Chat.create(data.token))
      .then(setupChatClient)
      .catch(handleError);
    }
    

    const handleError = error => {
      console.error(error);
      this.setState({
        error: 'Could not load chat.'
      });
    }

    const setupChatClient = async (client) => {
      const updateMessages = messageList => {
        this.setState({
          messages: messageList,
          isLoading: false,
          messageList: true
        })  
      }
      this.client = client;
      try {
        // eslint-disable-next-line
        const getMessages = await client.getUserChannelDescriptors().then(function(paginator) {
          const messageList = paginator.items.map(item => {
            return item
          })
          updateMessages(messageList);
        });
      } catch (error) {
        this.handleError(error)
      }
    }
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (this.state.isLoading) {
      return (
        <Fragment>
          <div className="container">
            <div className="loading-msg">
              <i className="fas fa-paw pink loading-icon"></i>
              <p>Loading Messages ...</p>
              <i className="fas fa-paw pink loading-icon"></i>
            </div>
          </div>
        </Fragment>
      )
    }
    if (this.state.messages.length < 1) {
      return (
        <Fragment>
        <div className="container h-100 bg-white inbox-container"> 
          <div className="block">
            <h2 className="chat-heading"><i className="fas fa-paw pink"></i> Conversations <i className="fas fa-paw pink"></i></h2>
            <img className="no-message-img" src={Cat} alt="No messages cat" />
            <span className="helper-text">Looks like you haven't started any conversation yet!</span>
            <Link to='../browse'><ButtonAlt name='Start Looking' icon='fas fa-city'/></Link>
          </div>
          <img src={Logo} className="logo-msg-no" alt="Puppy Love Logo"/>
        </div>
        </Fragment>  
      )
    }    
    return (
      <Fragment>
      <div className="container h-100 bg-white inbox-container"> 
        <div className="block">
          <h2 className="chat-heading"><i className="fas fa-paw pink"></i> Conversations <i className="fas fa-paw pink"></i></h2>
          <span className="helper-text-alt">(Keep conversations going and have fun getting to meet and chat with others!)</span>
        </div>
        <div className="message-box">
          {this.state.messages
            .map((convo, i) => {
            const url =`../chat/user?q=${convo.uniqueName}`
            const count = convo.messagesCount;
            const unreadCount = convo.lastConsumedMessageIndex === null ? count : count - convo.lastConsumedMessageIndex - 1
            return (
              <Conversation 
                convo={convo} 
                index={i} 
                id={convo.uniqueName}
                url={url}
                unreadCount={unreadCount}
              />
              )   
            })
          }          
          <img src={Logo} className="logo-msg" alt="Logo"/>
        </div>
      </div>
    </Fragment>
    )
  }
}

export default ChatList;