import React from 'react';
import { Link } from "react-router-dom";
import '../general/general.css'
import { useSelector } from 'react-redux';
import "../../../messenger/component/customScrollBar.css"

const ListFriend = () => {
  const { user, otherUser } = useSelector(state => state.auth)
  const { listfriends } = otherUser;
  return (
    <div className='container body-scroll-content' style={{ overflow: "auto", height: "90vh" }}>
      <div className="box" style={{ height: "fit-content" }}>
        <div className="box-header with-border">
          <h3 className="box-title">Bạn bè</h3>
        </div>
        <div className="box-body" >
          <div >
            {listfriends && listfriends.length ?
              listfriends.map((friend, index) =>
                <Link to={`/profile/${friend._id}`}>
                  <div className="col-xs-4" style={{ display: "flex", flexDirection: "column" }}>
                    <img src={`${process.env.REACT_APP_SERVER}${friend.avatar}`} alt="" className="avatar-friend-view" />
                    <span className="bold">{friend.surName} {friend.firstName}</span>
                  </div>
                </Link>
              ) : <div>Không có bạn bè, cô đơn quá</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListFriend;