import React from 'react'
import './general.css'
function Album() {
    return (
        <div className="box" style={{ height: "fit-content" }}>
            <div className="box-header with-border">
                <h3 className="box-title">Ảnh</h3>
                <a className="pull-right" style={{ color: "#1877F2", fontSize: "normal", cursor: "pointer" }}>Xem tất cả</a>
            </div>
            <div className="box-body" >
                <div >
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="album" />
                    </div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="album" />
                    </div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="album" />
                    </div>
                    <div className="w-100"></div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="album" />
                    </div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="album" />
                    </div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="album" />
                    </div>
                    <div className="w-100" style={{ height: "10px" }}></div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="album" />
                    </div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="album" />
                    </div>
                    <div className="col-xs-4">
                        <img src="avt.png" alt="" className="album" />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Album
