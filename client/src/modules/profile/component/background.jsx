import React, { useEffect, useState } from 'react';
import "./background.css"
import { connect, useSelector } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { AuthActions } from '../../auth/redux/actions';
import UpdateAvatar from './updateAvatar';
import { getStorage } from '../../../config';
// boxShadow: "0px -60px 100px 50px #888888"
const Background = (props) => {
    const userId = getStorage('userId');
    const { user, otherUser } = useSelector(state => state.auth)
    let userProfile = otherUser;
    // if (props.profileId !== userId) {
    //     console.log('');
    //     userProfile = otherUser;
    // } else {
    //     userProfile = user;
    // }
    console.log('backkkkkkkkkkkk', userProfile._id, userId);
    const { listfriends } = user;

    // friendCheck là bạn bè thì true, không là bạn bè thì false
    let friendCheck = listfriends?.find(e => String(e?._id) === String(userProfile?._id)) ? true : false
    const [isFriend, setIsFriend] = useState(friendCheck);
    useEffect(() => {
        setIsFriend(friendCheck)
    }, [friendCheck])

    const toggleUpdateAvatar = (event) => {
        event.preventDefault();
        if (userProfile._id === userId) {
            window.$('#modal-update-avatar').modal('show');
        }
    }

    const clickUnFriend = (id) => {
        console.log('unfriend');
        props.unFriend(id);
        setIsFriend(false);
    }

    const clickAddFriend = (id) => {
        console.log('add friend');
        props.addFriend(id);
        setIsFriend(true);
    }


    return (
        <div className="wrap-content-bg" style={{ backgroundColor: "#FFF", height: "60vh" }}>

            <div className="container">
                <div className="img-bg" style={{ height: "40vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img onClick={() => { console.log('background'); }} src="/bg.png" alt="background image"
                        style={{ width: "85vw", height: "40vh", borderRadius: "10px" }}
                    />
                </div>
                <UpdateAvatar />
                <div className="img-profile" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img onClick={toggleUpdateAvatar} src={`${process.env.REACT_APP_SERVER}${userProfile.avatar}`} style={{
                        width: "20vh",
                        height: "20vh",
                        borderRadius: "50%",
                        marginTop: "-18vh",
                        border: "5px solid #fff",
                        zIndex: 10
                    }} alt="" />
                </div>
                <div className="profile-name" style={{ display: "flex", justifyContent: "center" }}>
                    <p style={{ fontSize: "30px", fontWeight: "bolder" }}>{userProfile.surName} {userProfile.firstName}</p>
                </div>
                <hr style={{ borderTopColor: "#ccc" }}></hr>
                <div className="profile-option-bar">
                    <div className="row">
                        <div className={`tab-option ${userProfile._id !== userId ? "col-md-8 " : "col-md-12"}`} style={{ display: "flex", justifyContent: "center" }}>
                            <a className="btn">Bài viết</a>
                            <a className="btn">Giới thiệu</a>
                            <a className="btn">Bạn bè</a>
                            <a className="btn">Ảnh</a>
                            <a className="btn">Video</a>
                            <a className="btn">Xem thêm</a>
                        </div>
                        {userProfile._id !== userId &&
                            <div className="btn-option col-md-4" style={{ display: "flex", justifyContent: "center" }}>
                                {isFriend ?
                                    <button className="btn btn-danger" onClick={() => clickUnFriend(userProfile._id)}>
                                        <i className="fa fa-user-times"></i> &nbsp;Hủy bạn bè
                                    </button> :
                                    <button className="btn btn-primary" onClick={() => clickAddFriend(userProfile._id)}>
                                        <i className="fa fa-user-plus"></i> &nbsp;Thêm bạn bè
                                    </button>
                                }
                                <button className="btn">
                                    <i className="fa fa-commenting"></i> &nbsp;Nhắn tin
                                </button>
                                <button className="btn">
                                    <i className="fa fa-phone"></i> &nbsp;Gọi điện
                                </button>
                            </div>
                        }

                    </div>


                </div>
            </div>

        </div>

    );
};

const mapStateToProps = state => {
    return state;
}
const mapDispatchToProps = {
    changAvatar: AuthActions.changeAvatar,
    addFriend: AuthActions.addFriend,
    unFriend: AuthActions.unFriend,
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Background));