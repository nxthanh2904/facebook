import React from 'react';
import { Link } from "react-router-dom";
import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';
import { Avatar } from "@material-ui/core";

import './InfoBar.css';

const InfoBar = (props) => {
  const { room } = props;
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <div className="avt-chat">
          {room?.listuser?.length === 2 ?
            <Avatar style={{ marginRight: "7px" }} src={`${process.env.REACT_APP_SERVER}${room?.guest[0]?.avatar}`} />
            : <Avatar style={{ marginRight: "7px" }} src={`group.png`} />
          }
        </div>
        <h3>{room.name}</h3>
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      </div>
      <div className="rightInnerContainer">
        <Link to="/"><img src={closeIcon} alt="close icon" /></Link>
      </div>
    </div>
  )
};

export default InfoBar;