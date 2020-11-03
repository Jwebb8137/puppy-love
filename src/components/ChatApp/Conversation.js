import React, { useEffect, useState, Fragment } from 'react';
import {Link} from 'react-router-dom';
import config from '../../config';

const Conversation = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const { API_ENDPOINT } = config;
  const [convoData, setConvoData] = useState({});
  const [convoId, setConvoId] = useState(props.id);
  const [isLoading, setIsLoading] = useState(true);

  const getConversationInfo = async (props) => {
    try {  
      const response = await fetch(`${API_ENDPOINT}/api/chat-info?chatId=${convoId}`, {
        method: "GET",
        headers: { token: localStorage.token }
      })
      const jsonData = await response.json();
      setConvoData(jsonData);
      setIsLoading(false)
    } catch (err) {
        console.error(err.message)
    }
  }

  useEffect(() => {
    getConversationInfo();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div className="loading-msg">
        <i className="fas fa-paw pink loading-icon"></i>
        <p>Loading Messages ...</p>
        <i className="fas fa-paw pink loading-icon"></i>
      </div>
    )
  }

  return (
    <Link to={props.url} key={props.i} className="inbox">
      <div className="row inbox-row">
       <p><i className="fas fa-paw"></i> {convoData.chat_member_secondary}</p>
       <span className="unread-count">{props.unreadCount} Unread</span>
       <span className="total-count">{props.convo.messagesCount} Total</span>
      </div>
    </Link>
  );
};

export default Conversation;