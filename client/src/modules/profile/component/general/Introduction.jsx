import React from 'react'

function Introduction() {
    return (
        <div className="box" style={{lineHeight: 2.5}}>
            <div className="box-header with-border">
                <h3 className="box-title">Giới thiệu</h3>
            </div>
            <div className="box-body">
                <div >
                    <i className="fa fa-birthday-cake" style={{ width: 25 }}></i>
                    <span style={{ marginRight: 3 }}>Ngày sinh</span>
                    <span style={{ fontWeight: "bold" }}>23/01/1999</span>
                </div>
                <div >
                    <i className="fa fa-user" style={{ width: 25 }}></i>
                    <span style={{ marginRight: 3 }}>Giới tính</span>
                    <span style={{ fontWeight: "bold" }}>Nam</span>
                </div>
                <div >
                    <i className="fa fa-clock-o" style={{ width: 25 }}></i>
                    <span style={{ marginRight: 3 }}>Đã tham gia từ</span>
                    <span style={{ fontWeight: "bold" }}>10/10/2012</span>
                </div>
            </div>
        </div>
    )
}

export default Introduction
