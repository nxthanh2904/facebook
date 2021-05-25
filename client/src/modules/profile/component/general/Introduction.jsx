import React from 'react'
import { connect, useSelector } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import moment from 'moment';
import EditProfile from './editProfile';
function Introduction() {
    const formatGender = (gender) => {
        if (gender == 0) return "Nam"
        else if (gender == 1) return "Nữ"
        else return "Giới tính thứ ba"
    }
    const { user, otherUser } = useSelector(state => state.auth)

    const toggleEditProfile = (e) => {
        e.preventDefault();
        window.$('#modal-edit-profile').modal('show');
    }


    return (
        <div className="box" style={{ lineHeight: 2.5 }}>
            <EditProfile />
            <div className="box-header with-border">
                <h3 className="box-title">Giới thiệu</h3>
            </div>
            <div className="box-body">
                <div >
                    <i className="fa fa-birthday-cake" style={{ width: 25 }}></i>
                    <span style={{ marginRight: 3 }}>Ngày sinh</span>
                    <span style={{ fontWeight: "bold" }}>{moment(otherUser.birthday).format("DD/MM/YYYY")}</span>
                </div>
                <div>
                    <i className="fa fa-user" style={{ width: 25 }}></i>
                    <span style={{ marginRight: 3 }}>Giới tính</span>
                    <span style={{ fontWeight: "bold" }}>{user.gender ? formatGender(otherUser.gender) : "Unknow"}</span>
                </div>
                <div >
                    <i className="fa fa-clock-o" style={{ width: 25 }}></i>
                    <span style={{ marginRight: 3 }}>Đã tham gia từ</span>
                    <span style={{ fontWeight: "bold" }}>{user.createdAt ? moment(otherUser.createdAt).format("DD/MM/YYYY") : "Unknow"}</span>
                </div>
                <div>
                    <button type="button" className="btn btn-light" onClick={toggleEditProfile}>Chỉnh sửa thông tin cá nhân</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, null)(withTranslate(Introduction))
