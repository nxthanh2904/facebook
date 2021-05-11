import React from 'react'
import './general.css'
function Friend() {
    return (
        <div className="box" style={{ height: "fit-content" }}>
            <div className="box-header with-border">
                <h3 className="box-title">Bạn bè</h3>
                <a className="pull-right" style={{ color: "#1877F2", fontSize: "normal", cursor: "pointer" }}>Xem tất cả bạn bè</a>
            </div>
            <div className="box-body" >
                <div >
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="avatar-friend" />
                        <span className="bold">user name</span>
                    </div>
                    <div className="col-xs-4">

                        <img src="avt.png" alt="" className="avatar-friend" />
                        <span className="bold">user name</span>
                    </div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="avatar-friend" />
                        <span className="bold">user name</span>
                    </div>
                    <div className="w-100"></div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="avatar-friend" />
                    </div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="avatar-friend" />
                    </div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="avatar-friend" />
                    </div>
                    <div className="w-100" style={{ height: "10px" }}></div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="avatar-friend" />
                    </div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="avatar-friend" />
                    </div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="avatar-friend" />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Friend
