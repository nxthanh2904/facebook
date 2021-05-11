import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import Avatar from "@material-ui/core/Avatar";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import PhotoRoundedIcon from "@material-ui/icons/PhotoRounded";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import Styles from "./Style";
import { DialogModal, UploadFile } from "../../../common-components";



function CreatePost(props) {
    const classes = Styles();
    const [state, setState] = useState({
        content: "",
        feeling: "",
        activity: "",
        images: [],
        videos: [],

    });

    console.log("propssss", props);

    const onChangeText = (e) => {
        setState({ ...state, content: e.target.value });
    }

    function handleUploadFile(value) {
        console.log('aaaaa', value);
        const { file, urlFile, fileUpload } = state
        if (value.length !== 0) {
            if (file !== value[0].fileName && urlFile !== value[0].urlFile && fileUpload !== value[0].fileUpload) {
                const newImage = {
                    file: value[value.length - 1].fileName,
                    urlFile: value[value.length - 1].urlFile,
                    fileUpload: value[value.length - 1].fileUpload
                }
                setState({
                    ...state,
                    images: [...state.images, newImage]
                })
            }
        }

    }


    const save = () => {
        const formData = new FormData();
        const { content, images } = state
        console.log('fffff', content, images);
        if (content) {
            formData.append('content', content);
        }
        if (images && images.length) {
            images.forEach(x => {
                formData.append("image", x.fileUpload);
            })
        }

    }
    return (
        <DialogModal
            modalID="modal-create-post"
            formID="form-create-post"
            title="Create Post"
            func={save} size="50"
        //disableSubmit={!isValidateForm()}
        >
            <div className={classes.post}>
                <div className={classes.post__header}>
                    <Avatar
                        src={"avt.png"}
                    />
                    <div className={classes.header__info}>
                        <h4>Thành đẹp trai vl</h4>
                        {/* <p>
                            <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} units="minute" />
                        </p> */}
                    </div>
                    {/* <MoreHorizOutlinedIcon /> */}
                </div>
                <div >
                    <input type="text"
                        placeholder={`What's on your mind, Thành`}
                        onChange={e => onChangeText(e)}
                    />
                </div>
                <div className={classes.upload__media}>
                    <label className={classes.media__options}>
                        <VideocamRoundedIcon style={{ color: "red" }} />
                        <h4>Video</h4>
                        <UploadFile
                            accept="image/*,audio/*,video/*"
                            multiple={true}
                            show={false}
                            onChange={handleUploadFile} />
                    </label>
                    <label htmlFor="upload-image" className={classes.media__options}>
                        <PhotoRoundedIcon style={{ color: "green" }} />
                        <h4>Photo</h4>
                    </label>
                    <div className={classes.media__options}>
                        <EmojiEmotionsOutlinedIcon style={{ color: "orange" }} />
                        <h4>Feeling/Activity</h4>
                    </div>
                </div>
                <div>
                    {
                        state.images && state.images.length > 1 ?
                            state.images.map((image, i) => {
                                return (
                                    <div >
                                        <img src={image.urlFile} width="80px" height="80px" alt="img" />
                                    </div>
                                )
                            }) : null
                    }
                </div>
            </div>

        </DialogModal>
    )




}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(CreatePost));
