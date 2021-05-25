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
import { AuthActions } from '../../auth/redux/actions';
import Picker from 'emoji-picker-react';
import Feeling from './feelingModal';
import ReactEmoji from 'react-emoji';
function CreatePost(props) {
    const classes = Styles();
    const { user } = props.auth;
    const [ feeling, setFeeling]  = useState(null);
    const [state, setState] = useState({
        content: "",
        activity: "",
        images: [],
        videos: [],

    });
    useEffect(() => {
        console.log('feelinggggg', feeling);
    }, [feeling]);

    const onChangeText = (e) => {
        setState({ ...state, content: e.target.value });
    }

    function handleUploadFile(value) {
        const { file, urlFile, fileUpload } = state
        if (value.length !== 0) {
            if (file !== value[0].fileName && urlFile !== value[0].urlFile && fileUpload !== value[0].fileUpload) {
                const newImage = {
                    file: value[value.length - 1].fileName,
                    urlFile: value[value.length - 1].urlFile,
                    fileUpload: value[value.length - 1].fileUpload
                }
                console.log('aaaaaaaaaaaaaaaaaaaaaa', newImage);
                setState({
                    ...state,
                    images: [...state.images, newImage]
                })
            }
        }

    }

    const onChangeFeeling = (value) => {
        console.log('emoji create', value);
        setFeeling(value);
    }

    const toggleFeeling = (e) => {
        e.preventDefault();
        window.$("#modal-create-post-feeling").modal('show');
    }
    


    const save = () => {
        const formData = new FormData();
        const { content, images } = state
        if (content) {
            console.log('imageesss', content);
            formData.append('content', content);
        }
        if (images && images.length) {

            images.forEach(x => {

                console.log('imageesss', x.fileUpload);
                formData.append("post", x.fileUpload);
            })
        }
        if (feeling) {
            formData.append("feeling_code", feeling.code);
            formData.append("feeling_name", feeling.name);
        }
        props.createPost(formData);
    }
    const isValidateForm = () => {
        const { content, images } = state;
        if (content || images.length)
            return true;
        return false;
    }
    return (
        <DialogModal
            modalID="modal-create-post"
            formID="form-create-post"
            title="Create Post"
            func={save} size="50"
            hasNote={false}
            hasCloseButton={false}
            disableSubmit={!isValidateForm()}
        >
            <Feeling onChangeFeeling={ onChangeFeeling}/>
            <div className={classes.post}>
                <div className={classes.post__header}>
                    <Avatar
                        src={`${process.env.REACT_APP_SERVER}${user.avatar}`}
                    />
                    <div className={classes.header__info}>
                        <h4>{user.surName} {user.firstName}</h4>
                        {feeling ? (
                        <div >
                            đang đang {ReactEmoji.emojify(feeling.code)} cảm thấy <strong>{feeling.name}</strong>
                        </div>
                    ) : <> </>
                    }
                    </div>
                    
                </div>
                <textarea type="text"
                    className={classes.input_text}
                    placeholder={`What's on your mind, ${user.firstName} ?`}
                    onChange={e => onChangeText(e)}
                />
                <div className="form-inline" style={{ width: "100%" }}>
                    <strong style={{ display: "inline", marginRight: 10 }}>Thêm vào bài viết</strong>
                    <VideocamRoundedIcon style={{ color: "red", marginRight: 10 }} />
                    <PhotoRoundedIcon style={{ color: "green", marginRight: 10 }} />
                    <EmojiEmotionsOutlinedIcon onClick={toggleFeeling} style={{ color: "orange", marginRight: 10 }} />

                    <UploadFile
                        accept="image/*,audio/*,video/*"
                        multiple={true}
                        // show={false}
                        onChange={handleUploadFile} />
                    {/* <Picker onEmojiClick={onEmojiClick} groupVisibility={{smileys_people: false, }} pickerStyle={{ width: '100%' }} /> */}
                </div>
            </div>

        </DialogModal>
    )

}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
    createPost: PostActions.createPost,
    changeAvatar: AuthActions.changeAvatar,
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(CreatePost));
