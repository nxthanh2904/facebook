import React from 'react'
import { Link } from "react-router-dom";
import './general.css'
import { connect, useSelector } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
function Friend() {
    const { user, otherUser } = useSelector(state => state.auth)
    const { listfriends } = otherUser;
    return (
        <div className="box" style={{ height: "fit-content" }}>
            <div className="box-header with-border">
                <h3 className="box-title">Bạn bè</h3>
                <Link to={`/friends/user/${otherUser._id}`} className="pull-right" style={{ color: "#1877F2", fontSize: "normal", cursor: "pointer" }}>Xem tất cả bạn bè</Link>
            </div>
            <div className="box-body" >
                <div >
                    {listfriends && listfriends.length ?
                        listfriends.map((friend, index) =>
                            <div className="col-xs-4" style={{ display: "flex", flexDirection: "column" }}>
                                <img src={`${process.env.REACT_APP_SERVER}${friend.avatar}`} alt="" className="avatar-friend" />
                                <span className="bold">{friend.surName} {friend.firstName}</span>
                            </div>
                        ) : <div>Không có bạn bè, cô đơn quá</div>
                    }
                </div>
            </div>
        </div>


    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, null)(withTranslate(Friend))
