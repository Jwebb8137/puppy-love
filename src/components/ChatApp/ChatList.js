import { parse } from 'query-string';
import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import Chat from 'twilio-chat';
import config from '../../config';
import "./ChatList.css";
import Logo from "../../images/logo-alt.jpg";
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
      testing: ""
    };
  }

  

  componentDidMount() {
    const { API_ENDPOINT } = config;
    async function getName() {
      try {
        const response = await fetch(`${API_ENDPOINT}dashboard`, {
          method: "GET",
          headers: { token: localStorage.token }
        });
  
        const parseRes = await response.json();
  
        chatClient(parseRes)
      } catch (err) {
        console.error(err.message)
      }
    }

    getName()

  const chatClient = async (parseRes) => {
    const { API_ENDPOINT } = config;
    fetch(`${API_ENDPOINT}chat/token`, {
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
        isLoading: false
      })  
      console.log(this.state)
    }
    const uid = this.state.current_id;
    this.client = client;
    try {
      const getMessages = await client.getUserChannelDescriptors().then(function(paginator) {
        const messageList = paginator.items.map(item => {
          return item
        })
        // for (i=0; i<paginator.items.length; i++) {
        //   var channel = paginator.items[i];
        //   console.log('Channel: ' + channel.friendlyName);
        // }
        console.log(messageList)
        updateMessages(messageList);
      });
    } catch (error) {
      this.handleError(error)
    }
  }}

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (this.state.isLoading) {
      return (
        <Fragment>
          <div className="container">
            <div className="loading-msg">
              <i class="fas fa-paw pink loading-icon"></i>
              <p>Loading Chat ...</p>
              <i class="fas fa-paw pink loading-icon"></i>
            </div>
          </div>
        </Fragment>
      )
    }
      
      return (
        <Fragment>
        <div className="container h-100 bg-white inbox-container">
          
          <div className="block">
            <h2 className="chat-heading"><i class="fas fa-paw pink"></i> Conversations <i class="fas fa-paw pink"></i></h2>
            <div>
           <span className="helper-text">Keep conversations going and have fun getting to know others!</span>
          </div>
          <div className="message-box">
            {this.state.messages
                .map((convo, i) => {
                  const getUserInfo = async (ServiceSid, Sid) => {
                    fetch(`https://chat.twilio.com/v2/Services/${ServiceSid}/Users/${Sid}`, {
                      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                      method: 'GET',
                    })
                      .then(res => res.json())
                      .then(data => console.log(data))
                      .catch("Not Working");
                  }
                const Sid = convo.descriptor.member_sid;
                console.log(Sid)
                const ServiceSid = "IS68bd1bf08d9740eaacbd4dfccb81f34e"
                const url =`../chat/user?q=${convo.uniqueName}`
                const count = convo.messagesCount;
                const unreadCount = convo.lastConsumedMessageIndex === null ? count : count - convo.lastConsumedMessageIndex - 1
                getUserInfo(ServiceSid, Sid)
                return (
                  <Link to={url} className="inbox">
                    <div className="row inbox-row">
                      <p><i class="fas fa-paw"></i> Conversation {i+1}</p>
                      <span className="unread-count">{unreadCount} <i class="far fa-comment"></i></span>
                    </div>
                  </Link>
                  )   
                })
              }          
            </div>
            <img src={Logo} className="logo-msg"/>
          </div>
        </div>
      </Fragment>
      )
    }
  
}

export default ChatList;