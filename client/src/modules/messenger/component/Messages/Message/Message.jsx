import React from 'react';

import './Message.css';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import ReactEmoji from 'react-emoji';
import { Avatar } from "@material-ui/core";
const Message = (props) => {

  console.log('messssssssssss', props);

  let isSentByCurrentUser = false;
  const { content, name, creator } = props.message;
  const { user } = props.auth;
  //const trimmedName = name.trim().toLowerCase();
  if (user._id === creator._id) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          {/* <p className="sentText pr-10">{name}</p> */}
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(content)}</p>
          </div>
          <Avatar style={{ marginLeft: "7px" }} src={`${process.env.REACT_APP_SERVER}${user.avatar}`} />
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <Avatar style={{ marginRight: "7px" }} src={`${process.env.REACT_APP_SERVER}${creator.avatar}`} />
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(content)}</p>
          </div>
          {/* <p className="sentText pl-10 ">{name}</p> */}
        </div>
      )
  );
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, null)(withTranslate(Message));