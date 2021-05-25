import React, { useState } from 'react';
import { SelectBox } from "../../../../common-components";

import onlineIcon from '../icons/onlineIcon.png';
import { Avatar } from "@material-ui/core";

import './TextContainer.css';
import { connect, useSelector } from 'react-redux';
import { SearchActions } from '../../../header/redux/actions';
import withTranslate from 'react-redux-multilingual/lib/withTranslate';
import { ChatActions } from '../../redux/action';
import { getStorage } from '../../../../config';

const TextContainer = (props) => {
  const userId = getStorage("userId");
  const { users } = props;
  const { user } = useSelector(state => state.search);
  const [listSearch, setListSearch] = useState([])
  let listData = [];
  listData = user?.users?.map(e => { return { text: `${e.surName} ${e.firstName}`, value: e._id } });

  const chooseUserToConversation = (value) => {
    setListSearch(value)
  }

  const onSearch = (txt) => {
    props.searchUser({
      keyword: txt,
      page: 1,
      limit: 5,
      type: 'paginate'
    })
  }

  const clickCreateConversation = () => {
    let data = {
      listuser: [...listSearch, userId],
      user: userId
    }
    console.log('data-create', data);
    props.createConversation(data)
  }

  console.log('state-qyd', listSearch);
  return (
    <div className="textContainer ">
      <div style={{ /*paddingLeft: "10px" */ textAlign: 'center' }}>
        <h1>Chat with friends 💬</h1>
      </div>
      <div className="chat-footer">
        <div className="form-inline">

          <div className="form-group col-md-10">
            <label></label>
            <SelectBox
              id={`search-conversation-box`}
              className="form-control select2"
              style={{ width: "100%" }}
              value={listSearch}
              items={listData ? listData : []}
              onChange={chooseUserToConversation}
              onSearch={onSearch}
              multiple={true}
              options={{ placeholder: 'Search user to chat with...' }}
            />
          </div>
          <button onClick={clickCreateConversation} className="btn btn-light col-xs-auto" title="Make a conversation">
            <i className="fa fa-address-book"></i> <b>+</b>
          </button>
        </div>
      </div>
      {
        users
          ? (
            <div className="activeContainer" >
              <h4 className="body-scroll-content" style={{ width: "100%", height: "calc(75vh + 5px)", overflow: "auto", backgroundColor: "#fff", color: "#111" }}>
                {users.map((user) => {
                  if (user?.listuser?.length === 2) {
                    return (
                      <div key={user.name} className="activeItem" onClick={() => props.setCurrentConversation(user)}>
                        <Avatar className="avt-chat-left" src={`${process.env.REACT_APP_SERVER}${user?.guest[0]?.avatar}`} />
                        &nbsp;&nbsp;
                        {user.name?.length >= 30 ? `${user.name.substring(0, 30)} ...` : user.name}
                        <img className="online-icon" alt="Online Icon" src={onlineIcon} />
                      </div>
                    )
                  } else {
                    return (
                      <div key={user.name} className="activeItem" onClick={() => props.setCurrentConversation(user)}>
                        <Avatar className="avt-chat-left" src={`group.png`} />
                        &nbsp;&nbsp;
                        {user.name?.length >= 30 ? `${user.name.substring(0, 30)} ...` : user.name}
                        <img className="online-icon" alt="Online Icon" src={onlineIcon} />
                      </div>
                    )
                  }
                })
                }
              </h4>
            </div>
          )
          : null
      }

    </div>
  )
};

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
  searchUser: SearchActions.searchUser,
  createConversation: ChatActions.createConversation,
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(TextContainer));
