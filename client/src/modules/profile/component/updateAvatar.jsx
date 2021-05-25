import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import Avatar from "@material-ui/core/Avatar";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import PhotoRoundedIcon from "@material-ui/icons/PhotoRounded";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import Styles from "./Style";
import { DialogModal, UploadFile } from "../../../common-components";
import { PostActions } from '../redux/actions';
import { StarRateOutlined } from '@material-ui/icons';
import { AuthActions } from '../../auth/redux/actions';


function UpdateAvatar(props) {
    const classes = Styles();
    const { user } = props.auth;
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const onChangeText = (e) => {
        setContent(e.target.value);
    }

    function handleUploadFile(value) {
        console.log('uploadddd', value);
        const newImage = {
            file: value[0].fileName,
            urlFile: value[0].urlFile,
            fileUpload: value[0].fileUpload
        }
        console.log('newwwwwwwwwwwww', newImage);
        setImage(newImage);
    }


    const save = () => {
        const formData = new FormData();
        if (content) {
            console.log('imageesss', content);
            formData.append('content', content);
        }
        if (image) {
            console.log('imageesss', image.fileUpload);
            formData.append("avatar", image.fileUpload);
        }
        props.changeAvatar(formData);
    }
    return (
        <DialogModal
            modalID="modal-update-avatar"
            formID="form-update-avatar"
            title="Update Avatar"
            func={save} size="50"
            hasNote={false}
            hasCloseButton={false}
        //disableSubmit={!isValidateForm()}
        >
            <div className={classes.post}>
                <div className={classes.post__header}>
                    <Avatar
                        src={`${process.env.REACT_APP_SERVER}${user.avatar}`}
                    />
                    <div className={classes.header__info}>
                        <h4>{user.surName} {user.firstName}</h4>
                        {/* <p>
                            <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} units="minute" />
                        </p> */}
                    </div>
                    {/* <MoreHorizOutlinedIcon /> */}
                </div>
                {/* <div > */}
                <textarea type="text"
                    className={classes.input_text}
                    placeholder={`What's on your mind, ${user.firstName} ?`}
                    onChange={e => onChangeText(e)}
                />
                {/* </div> */}
                {/* <div className={classes.upload__media}> */}
                {/* <label className={classes.media__options}> */}

                {/* <h4>Video</h4> */}
                <div className="form-inline" style={{ width: "100%" }}>
                    <strong style={{ display: "inline", marginRight: 10 }}>Cập nhật ảnh đại diện</strong>
                    <VideocamRoundedIcon style={{ color: "red", marginRight: 10 }} />
                    <PhotoRoundedIcon style={{ color: "green", marginRight: 10 }} />
                    <EmojiEmotionsOutlinedIcon style={{ color: "orange", marginRight: 10 }} />

                    <UploadFile
                        accept="image/*"
                        multiple={false}
                        // show={false}
                        onChange={handleUploadFile} />
                </div>

            </div>

        </DialogModal>
    )




}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
    changeAvatar: AuthActions.changeAvatar,
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(UpdateAvatar));
