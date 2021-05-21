import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <textarea
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      rows='3'
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>
      <SendIcon style={{ width: "100px", height: "30px" }} />
    </button>
  </form>
)

export default Input;