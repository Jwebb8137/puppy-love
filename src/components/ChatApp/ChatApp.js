import React, { Component, Fragment } from 'react';
import Chat from 'twilio-chat';
import config from '../../config';
import './ChatApp.css';
import { Chat as ChatUI } from '@progress/kendo-react-conversational-ui';
import {withRouter} from 'react-router-dom';
// eslint-disable-next-line
import queryString, { parse } from 'query-string'
import GoBackButton from '../Buttons/GoBackButton';
import Logo from "../../images/logo-alt.jpg";

function MessageTemplate(props) {
  return (
    <div className="k-bubble">
      <div>{props.item.text}</div>
    </div>
  );
}

const { API_ENDPOINT } = config;

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      messages: [],
      target_name: "",
      target_username: "",
      target_petName: "",
      target_id: ""
    };
    this.user = {
      id: props.username,
      name: props.username,
      avatarUrl: ""
    };
    this.setupChatClient = this.setupChatClient.bind(this);
    this.messagesLoaded = this.messagesLoaded.bind(this);
    this.messageAdded = this.messageAdded.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    const { API_ENDPOINT } = config;
    const values = queryString.parse(this.props.location.search)
    fetch(`${API_ENDPOINT}/chat/token`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      body: `identity=${encodeURIComponent(this.props.username)}`
    })
      .then(res => res.json())
      .then(data => Chat.create(data.token))
      .then(this.setupChatClient)
      .catch(this.handleError);

      const getTargetInfo = async () => {
        try {
          // eslint-disable-next-line
          const response = await fetch(`${API_ENDPOINT}/api/target-info?target=${values.target}`, {
            method: "GET",
            headers: { token: localStorage.token }
          });
          const parseRes = await response.json();
          this.setState({
            target_id: parseRes.user_id,
            target_name: parseRes.first_name,
            target_petName: parseRes.pet_name,
            target_username: parseRes.username
          })
        } catch (err) {
          console.error(err.message)
        }
      }
    getTargetInfo();
  }

  handleError(error) {
    console.error(error);
    this.setState({
      error: 'Could not load chat.'
    });
  }

  setupChatClient(client) {
    const values = queryString.parse(this.props.location.search)
    const uid = values.q ? values.q : `${(parseInt(values.target) / 5) * (parseInt(values.user) / 5)}`;
    
    const chatInfo = async () => {
      try {
        const chatMemberSecondary = this.state.target_username;
        const chatMemberOrigin = this.props.username;
        const body = { uid, chatMemberOrigin, chatMemberSecondary };
        console.log = console.warn = console.error = () => {};
        const response = await fetch(`${API_ENDPOINT}/api/chatroom/info`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
      } catch (err) {
        console.error(err.message)
      }
    }

    chatInfo();
    this.client = client;
    this.client
      .getChannelByUniqueName(uid)
      .then(channel => channel)
      .catch(error => {
        console.log(error)
        if (error.body.code === 50300) {
          return this.client.createChannel({ uniqueName: uid });
        } else {
          this.handleError(error);
        }
      })
      .then(channel => {
        this.channel = channel;
        return this.channel.join().catch(() => {});
      })
      .then(() => {
        this.setState({ isLoading: false });
        this.channel.getMessages().then(this.messagesLoaded);
        this.channel.on('messageAdded', this.messageAdded);
        this.channel.setAllMessagesConsumed();
      })
      .catch(this.handleError);
  }

  twilioMessageToKendoMessage(message) {
    return {
      text: message.body,
      author: { id: message.author, name: message.author },
      timestamp: message.state.timestamp
    };
  }

  messagesLoaded(messagePage) {
    this.setState({
      messages: messagePage.items.map(this.twilioMessageToKendoMessage)
    });
  }

  messageAdded(message) {
    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        this.twilioMessageToKendoMessage(message)
      ]
    }));
  }

  sendMessage(event) {
    this.channel.sendMessage(event.message.text);
  }

  handleInputChange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = (event) => {
      let message = {
        author: this.user,
        text: '',
        attachments: [{
          content: event.target.result,
          contentType: 'image'
        }]
      }
      this.setState((prevState) => ({
        messages: [
          ...prevState.messages,
          message
        ],
      }));
    };
    reader.readAsDataURL(file);
  }

  uploadButton = (props) => {
    return (
      <React.Fragment>
        <input type='file' onChange={this.handleInputChange} style={{display: 'none'}} ref={el => this.fileUpload = el}/>
        <button className={'k-button k-flat k-button-icon'}  onClick={() => this.fileUpload.click()}>
          <span className={'k-icon ' + props.icon} style={{fontSize: '20px'}}/>
        </button>
      </React.Fragment>
    )
  }

  customMessage = (props) => {
    return <React.Fragment>
        {props.sendButton}
        {props.messageInput}
        {this.uploadButton({icon: 'k-i-image-insert'})}
    </React.Fragment>;
  }

  componentWillUnmount() {
    this.client.shutdown();
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (this.state.isLoading) {
      return (
        <div className="loading-msg">
          <i className="fas fa-paw pink loading-icon"></i>
          <p>Loading Chat ...</p>
          <i className="fas fa-paw pink loading-icon"></i>
        </div>
      )
    }
    return (
      <Fragment>
        <GoBackButton props={this.props}/>
        <div className="col-flex">
          <h2 className="chat-header">           
            <i className="fas fa-paw pink" /> Now Chatting <i className="fas fa-paw pink" />        
            <span className="form-helper-text block chat-helper">(Try asking them about their pet, favorite animal, or their interests!)</span> 
          </h2>
          <ChatUI
            user={this.user}
            messages={this.state.messages}
            onMessageSend={this.sendMessage}
            width={500}
            messageBox={this.customMessage}
            messageTemplate={MessageTemplate}
            placeholder={'Type a message...'}
          />
          <img src={Logo} id="card-icon" alt="Puppy Love Logo" className="mt-10"/>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(ChatApp);