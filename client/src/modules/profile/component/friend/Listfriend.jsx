import React from 'react'
import './friend.css'
function Listfriend() {
    return (
        <div className="box" style={{ width: "60%", marginLeft: "20%" }}>
            <div className="box-header with-border">
                <h3 className="box-title">Bạn bè</h3>
                <a className="pull-right" style={{ color: "#1877F2", fontSize: "normal", cursor: "pointer" }}>Xem tất cả bạn bè</a>
            </div>
            <div className="box-body" >
                <div>
                    <div className="col-xs-6 custom">
                        <div className="friend-box row">
                            <div className="col-xs-3" style={{ padding: 0 }}>
                                <img src="avt.png" alt="" className="avatar-friend" />
                            </div>
                            <div className="friend-name col-xs-7">
                                <p className="name">Nguyen Xuan Thanh</p>
                                <span style={{ color: "#555", fontSize: 13 }}>3 bạn chung</span>
                            </div>
                            <div className="col-xs-1" style={{ marginTop: 30, marginLeft: 20 }}>
                                <i className="fa fa-ellipsis-v"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 custom">
                        <div className="friend-box row">
                            <div className="col-xs-3" style={{ padding: 0 }}>
                                <img src="avt.png" alt="" className="avatar-friend" />
                            </div>
                            <div className="friend-name col-xs-7">
                                <p className="name">Nguyen The Quang</p>
                                <span style={{ color: "#555", fontSize: 13 }}>3 bạn chung</span>
                            </div>
                            <div className="col-xs-1" style={{ marginTop: 30, marginLeft: 20 }}>
                                <i className="fa fa-ellipsis-v"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Listfriend
