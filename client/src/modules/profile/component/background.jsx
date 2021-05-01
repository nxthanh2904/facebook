import React from 'react';
import "./background.css"

// boxShadow: "0px -60px 100px 50px #888888" 
const Background = () => {
    return (
        <div className="wrap-content-bg" style={{ backgroundColor: "#FFF", height: "60vh" }}>
            <div className="container">
                <div className="img-bg" style={{ height: "40vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img onClick={() => { console.log('background'); }} src="bg.png" alt="background image" 
                        style={{ width: "85vw", height: "40vh", borderRadius: "10px"}} 
                    />
                </div>
                <div className="img-profile" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img onClick={() => { console.log('profile-image'); }} src="avt.png" style={{
                        width: "20vh",
                        height: "20vh",
                        borderRadius: "50%",
                        marginTop: "-18vh",
                        border: "5px solid #fff",
                        zIndex: 10
                    }} alt="" />
                </div>
                <div className="profile-name" style={{ display: "flex", justifyContent: "center" }}>
                    <p style={{ fontSize: "30px", fontWeight: "bolder" }}>Quang Nguyễn Thế</p>
                </div>
                <hr style={{ borderTopColor: "#ccc" }}></hr>
                <div className="profile-option-bar">
                    <div className="row">
                        <div className=" col-md-8 tab-option" style={{display: "flex", justifyContent: "center"}}>
                            <a className="btn">Bài viết</a>
                            <a className="btn">Giới thiệu</a>
                            <a className="btn">Bạn bè</a>
                            <a className="btn">Ảnh</a>
                            <a className="btn">Video</a>
                            <a className="btn">Xem thêm</a>
                        </div>
                        <div className="btn-option col-md-4" style={{display: "flex", justifyContent: "center"}}>
                            <button className="btn">
                                <i className="fa fa-user-plus"></i> &nbsp;Thêm bạn bè
                            </button>
                            <button className="btn">
                                <i className="fa fa-commenting"></i> &nbsp;Nhắn tin
                            </button>
                            <button className="btn">
                                <i className="fa fa-phone"></i> &nbsp;Gọi điện
                            </button>
                        </div>
                    </div>


                </div>
            </div>

        </div>

    );
};

export default Background;