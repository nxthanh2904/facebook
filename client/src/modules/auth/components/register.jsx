import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '../redux/actions';
import { withTranslate } from 'react-redux-multilingual';
import { DialogModal, DatePicker, SelectBox } from '../../../common-components'

function Register(props) {

    const [state, setState] = useState({
        firstName: "",
        surName: "",
        email: "",
        password: "",
        birthday: "",
        gender: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        let { email, password, firstName, surName, birthday, gender } = state;
        props.register({ email, password, firstName, surName, birthday, gender });
        window.$(`#register-modal`).modal("hide");
    }


    return (
        <DialogModal
            size='25' modalID="register-modal"
            formID="form-view-asset"
            title="Đăng ký tài khoản"
            hasSaveButton={false}
            hasCloseButton={false}
            hasNote={false}
        >
            <div className="qlcv" style={{ textAlign: "center" }} >
                {/* Tên công việc */}
                {/* <div className={`form-group ${errorOnName === undefined ? "" : "has-error"}`}> */}
                <div className="form-inline">
                    <div className="form-group">
                        {/* <label>Họ<span className="text-red">*</span></label> */}
                        <input type="text" className="form-control" placeholder="Họ" onChange={(e) => { setState({ ...state, surName: e.target.value }) }} />
                        {/* <ErrorLabel
                        content={errorOnName}
                    /> */}
                    </div>
                    {/* <div className={`form-group ${errorOnPass === undefined ? "" : "has-error"}`}> */}
                    <div className="form-group">
                        {/* <label>Tên<span className="text-red">*</span></label> */}
                        <input type="text" className="form-control" placeholder="Tên" onChange={(e) => { setState({ ...state, firstName: e.target.value }) }} />
                        {/* <ErrorLabel
                        content={errorOnPass}
                    /> */}
                    </div>
                </div>
                <div className="form-inline">
                    <input type="text" className="form-control" placeholder="Số di động hoặc email" onChange={(e) => { setState({ ...state, email: e.target.value }) }} />
                    <input type="text" className="form-control" placeholder="Mật khẩu" onChange={(e) => { setState({ ...state, password: e.target.value }) }} />
                </div>
                {/* <div className="form-inline">
                    <input type="text" className="form-control" placeholder="Mật khẩu mới" />
                </div> */}
                <div className="form-inline">
                    <DatePicker
                        id="end-date"
                        //  dateFormat="day-month-year"
                        value={""}
                        disabled={false}
                        onChange={(e) => { setState({ ...state, birthday: e }) }}
                    />
                    <SelectBox
                        id="selectGender"
                        className="form-control select"
                        style={{ width: "100%" }}
                        items={[
                            { value: '', text: 'Giới tính' },
                            { value: 0, text: "Nam" },
                            { value: 1, text: "Nữ" },
                            { value: 2, text: "Khác" },
                        ]}
                        onChange={(value) => { setState({ ...state, gender: value[0] }) }}
                    />
                </div>
                <p style={{ width: "72%", fontSize: 12, marginLeft: "14%" }}>
                    Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách dữ liệu và Chính sách cookie của chúng tôi.
                    Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
                </p>
                <div className="form-inline">
                    <button className="btn btn-success" style={{ width: 200 }} onClick={handleSubmit}>Đăng ký</button>
                </div>


            </div>
        </DialogModal>
    )
}
const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
    register: AuthActions.register,
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Register));