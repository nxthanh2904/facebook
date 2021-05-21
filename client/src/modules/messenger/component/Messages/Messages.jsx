import { useEventCallback } from '@material-ui/core';
import React, { useEffect, } from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';
import '../customScrollBar.css';

const Messages = (props) => {

  const { messages } = props;
  console.log('lítttttttmesssssssssssss', messages);
  useEffect(() => {
    //messages = props
  }, [props.currentConversation])
  return (
    // <ScrollToBottom className="body-scroll-content messages">
    <div className="body-scroll-content messages">
      {messages.map((message, i) => <div key={i}><Message message={message} /></div>)}
    </div>
  )
};

export default Messages;