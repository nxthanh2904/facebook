import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '../redux/actions';
import { withTranslate } from 'react-redux-multilingual';
import ForgotPassword from './forgotPassword';
import { getStorage } from '../../../config';
import { ErrorLabel } from " ../../../src/common-components"
import './login.css';
import Register from './register';

const Login = (props) => {
    const [state, setState] = useState({
        email: "",
        password: "",
        emailForgot: null,
        newPassword: null,
        confirmNewPassword: null,
        portal: getStorage('portal')
    })

    useEffect(() => {


    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        let { email, password } = state;
        console.log('iiijiji', { email, password })
        props.login({ email, password });
    }

    const forgotPassword = () => {
        const { emailForgot } = state;
        props.forgotPassword(emailForgot);
    }

    const handleClickRegister = () => {
        window.$('#register-modal').modal('show');
    }

    console.log('This is login page');
    const { translate } = props;
    const { email, password, errorOnName, errorOnPass } = state;

    return (
        <div style={{ backgroundColor: "#F0F2F5" }}>
            <Register />
            <div className="container" style={{ height: "80vh" }}>
                <div className="row">
                    <div className="col-xs-6" style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div className="name-app" style={{ color: "#166FE5", fontSize: "60px", fontWeight: "bold" }}>
                                factbook
                                </div>
                            <div className="sologan" style={{ fontSize: "20px" }}>
                                Factbook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                                </div>
                        </div>
                    </div>
                    <div className="col-xs-6" style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="box" style={{ padding: "20px" }}>
                            {/* Tên công việc */}
                            <div className={`form-group ${errorOnName === undefined ? "" : "has-error"}`}>
                                <label>Email hoặc số điện thoại<span className="text-red">*</span></label>
                                <input type="text" className="form-control"
                                    placeholder={translate('task.task_management.name')}
                                    onChange={(e) => { setState({ ...state, email: e.target.value }) }}
                                    value={(email)}
                                    placeholder={"Email hoặc số điện thoại"} />
                                <ErrorLabel
                                    content={errorOnName}
                                />
                            </div>
                            <div className={`form-group ${errorOnPass === undefined ? "" : "has-error"}`}>
                                <label>Mật khẩu<span className="text-red">*</span></label>
                                <input type="text" className="form-control"
                                    onChange={(e) => { setState({ ...state, password: e.target.value }) }}
                                    placeholder={translate('task.task_management.name')}
                                    value={(password)}
                                    placeholder={"Mật khẩu"} />
                                <ErrorLabel
                                    content={errorOnPass}
                                />
                            </div>
                            <div className="form-group">
                                <button className={"form-control"} style={{ backgroundColor: "#166FE5", color: "#FFFFFF" }} onClick={handleSubmit}>Đăng nhập</button>
                            </div>
                            <div style={{ textAlign: "center", color: "#166FE5" }}>
                                {/* <p style={{ color: "#166FE5" }}> Quên mật khẩu</p> */}
                                    Quên mật khẩu?
                                </div>

                            <hr style={{ borderBlockColor: "#ccc" }} />

                            <div className="form-group" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <button className="btn btn-success" onClick={handleClickRegister}>Tạo tài khoản mới</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "#FFFFFF", minHeight: "20vh" }}>
                <div className="container">

                    <p>Tiếng Việt &nbsp;&nbsp; English</p>

                    <hr style={{ borderBlockColor: "#ccc" }} />

                    <span style={{ padding: "7px" }}>Đăng ký</span>
                    <span style={{ padding: "7px" }}>Đăng nhập</span>
                    <span style={{ padding: "7px" }}>Messenger</span>
                    <span style={{ padding: "7px" }}>Facebook Lite</span>
                    <span style={{ padding: "7px" }}>Watch</span>
                    <span style={{ padding: "7px" }}>Danh bạ</span>
                    <span style={{ padding: "7px" }}>Trang</span>
                    <span style={{ padding: "7px" }}>Hạng mục Trang</span>
                    <span style={{ padding: "7px" }}>Địa điểm</span>
                    <span style={{ padding: "7px" }}>Trò chơi</span>
                    <span style={{ padding: "7px" }}>Vị trí</span>
                    <span style={{ padding: "7px" }}>Marketplace</span>
                    <span style={{ padding: "7px" }}>Facebook Pay</span>
                    <span style={{ padding: "7px" }}>Nhóm</span>
                    <span style={{ padding: "7px" }}>Việc làm</span>
                    <span style={{ padding: "7px" }}>Oculus</span>
                    <span style={{ padding: "7px" }}>Portal</span>
                    <span style={{ padding: "7px" }}>Instagram</span>
                    <span style={{ padding: "7px" }}>Địa phương</span>
                    <span style={{ padding: "7px" }}>Chiến dịch gây quỹ</span>
                    <span style={{ padding: "7px" }}>Dịch vụ</span>
                    <span style={{ padding: "7px" }}>Trung tâm thông tin bỏ phiếu</span>
                    <span style={{ padding: "7px" }}>Giới thiệu</span>
                    <span style={{ padding: "7px" }}>Tạo quảng cáo</span>
                    <span style={{ padding: "7px" }}>Tạo Trang</span>
                    <span style={{ padding: "7px" }}>Nhà phát triển</span>
                    <span style={{ padding: "7px" }}>Tuyển dụng</span>
                    <span style={{ padding: "7px" }}>Quyền riêng tư</span>
                    <span style={{ padding: "7px" }}>Cookie</span>
                    <span style={{ padding: "7px" }}>Lựa chọn quảng cáo</span>
                    <span style={{ padding: "7px" }}>Điều khoản</span>
                    <span style={{ padding: "7px" }}>Trợ giúp</span>

                    <br />
                    <br />

                        FactBook &#169; 2021
                    </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
    login: AuthActions.login,
    forgotPassword: AuthActions.forgotPassword,
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Login));