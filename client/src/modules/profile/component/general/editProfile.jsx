import React, { useState, useEffect } from 'react';
import { DialogModal, SelectBox, DatePicker } from '../../../../common-components';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import moment from 'moment';
import { AuthActions } from '../../../auth/redux/actions';
const EditProfile = (props) => {
    
    const { user } = props.auth;
    const [firstName, setFirstName] = useState(user.firstName);
    const [surName, setSurName] = useState(user.surName);
    const [birthday, setBirthday] = useState(user.birthday);
    const [gender, setGender] = useState(user.gender);

    useEffect(() => {
        setFirstName(user.firstName);
        setSurName(user.surName);
        setBirthday(user.birthday);
        setGender(user.gender);
    }, [user]);
    
    const save = () => {
        console.log('edit profileeeeeeee', firstName, surName, birthday, gender);
        props.changeInformation({ firstName, surName, birthday, gender });
    }
    
    const changeBirthday = (e) => {

         let splitter = e.split("-");
        let dateISO = new Date(splitter[2], splitter[1] - 1, splitter[0])
        setBirthday(dateISO)
    }

    const isValidateForm = () => {
        if (
            firstName !== user.firstName ||
            surName !== user.surName ||
            birthday !== user.birthday ||
            gender !== user.gender
        )
            return true;
        return false;
    }

   console.log('edit profileeeeeeee', user);
    return (
        <DialogModal
            modalID="modal-edit-profile"
            formID="form-edit-profile"
            title="Edit Profile"
            func={save} 
            size="50"
            hasNote={false}
            disableSubmit={!isValidateForm()}
        >
            <div className="qlcv" style={{ textAlign: "center" }}>
                <div className="form-inline">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Họ"
                            value={surName} onChange={e=> setSurName(e.target.value.trim())}/>

                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Tên"
                            value={firstName} onChange={e=> setFirstName(e.target.value.trim())}/>

                    </div>

                </div>
                 <div className="form-inline">
                    <DatePicker
                        id="end-date"
                       // dateFormat="day-month-year"
                        value={moment(birthday).format("DD-MM-YYYY")}
                        disabled={false}
                        onChange={(e) => { setBirthday(e) }}
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
                        value={gender}
                        onChange={(value) => { setGender(value[0]) }}
                    />
                </div>
            
        </div>

        </DialogModal>
    )
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = {
    changeInformation: AuthActions.changeInformation,
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(EditProfile))

