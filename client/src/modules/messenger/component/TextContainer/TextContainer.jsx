import React from 'react';

import onlineIcon from '../icons/onlineIcon.png';
import { Avatar } from "@material-ui/core";

import './TextContainer.css';

const TextContainer = (props) => {

  const { users } = props;
  console.log('uuuuuuuuuuuu', users);
  return (
    <div className="textContainer">
      <div style={{ /*paddingLeft: "10px" */ }}>
        <h1>Chat with friends 💬</h1>
      </div>
      {
        users
          ? (
            <div className="activeContainer" >
              <h2 className="body-scroll-content" style={{ width: "100%", height: "calc(75vh + 5px)", overflow: "auto", backgroundColor: "#fff", color: "#111" }}>
                {users.map((user) => {
                  if (user?.listuser?.length === 2) {
                    return (
                      <div key={user.name} className="activeItem" onClick={() => props.setCurrentConversation(user)}>
                        <Avatar className="avt-chat-left" src={`${process.env.REACT_APP_SERVER}${user?.guest[0]?.avatar}`} />
                        &nbsp;&nbsp;
                        {user.name?.length >= 20 ? `${user.name.substring(0, 20)} ...` : user.name}
                        <img className="online-icon" alt="Online Icon" src={onlineIcon} />
                      </div>
                    )
                  } else {
                    return (
                      <div key={user.name} className="activeItem" onClick={() => props.setCurrentConversation(user)}>
                        <Avatar className="avt-chat-left" src={`group.png`} />
                        &nbsp;&nbsp;
                        {user.name?.length >= 20 ? `${user.name.substring(0, 20)} ...` : user.name}
                        <img className="online-icon" alt="Online Icon" src={onlineIcon} />
                      </div>
                    )
                  }
                })
                }
              </h2>
            </div>
          )
          : null
      }
      <div className="chat-footer">
        <input placeholder="Search conversation..." type="text" />
        <button>Search</button>
      </div>
    </div>
  )
};

export default TextContainer;