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
const EditPost = (props) => {
    const classes = Styles();
    const { user } = props.auth;
    const { postEdit } = props;
    const [content, setContent] = useState(postEdit ? postEdit.content: "");
    const [images, setImages] = useState(postEdit ? postEdit.images : []);

    useEffect(() => {
        if (postEdit) {
            setContent(postEdit.content);
            setImages(postEdit.images)
       }
    }, [props.postEdit])

    function handleUploadFile(value) {
        if (value.length !== 0) {
            const newImage = {
                file: value[value.length - 1].fileName,
                urlFile: value[value.length - 1].urlFile,
                fileUpload: value[value.length - 1].fileUpload
            }
            setImages([...images, newImage])
        }

    }

    const save = () => {
        const formData = new FormData();
        if (content) {
            console.log('imageesss', content);
            formData.append('content', content);
        }
        // if (images && images.length) {

        //     images.forEach(x => {

        //         console.log('imageesss', x.fileUpload);
        //         formData.append("post", x.fileUpload);
        //     })
        // }
        props.editPost(formData, postEdit._id);
    }

    const isValidateForm = () => {
        if (postEdit && content !== postEdit.content) {
            return true;
        }
        return false;
    }

    return (
        <DialogModal
            modalID="modal-edit-post"
            formID="form-edit-post"
            title="Edit Post"
            func={save} size="50"
            hasNote={false}
            //hasCloseButton={false}
            disableSubmit={!isValidateForm()}
        >
            <div className={classes.post}>
                <div className={classes.post__header}>
                    <Avatar
                        src={`${process.env.REACT_APP_SERVER}${user.avatar}`}
                    />
                    <div className={classes.header__info}>
                        <h4>{user.surName} {user.firstName}</h4>
                    </div>
                </div>
                <textarea type="text"
                    className={classes.input_text}
                    placeholder={`What's on your mind, ${user.firstName} ?`}
                    onChange={e => setContent(e.target.value)}
                    value={content}
                />
                <div className="form-inline" style={{ width: "100%" }}>
                    <strong style={{ display: "inline", marginRight: 10 }}>Thêm vào bài viết</strong>
                    <VideocamRoundedIcon style={{ color: "red", marginRight: 10 }} />
                    <PhotoRoundedIcon style={{ color: "green", marginRight: 10 }} />
                    <EmojiEmotionsOutlinedIcon style={{ color: "orange", marginRight: 10 }} />
{/* 
                    <UploadFile
                        accept="image/*,audio/*,video/*"
                        multiple={true}
                        // show={false}
                        onChange={handleUploadFile} /> */}
                </div>
            </div>

        </DialogModal>
    )

}


const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
    editPost: PostActions.editPost,
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(EditPost));
