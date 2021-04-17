import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Chip, Paper, Divider, LinearProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import PhotoRoundedIcon from "@material-ui/icons/PhotoRounded";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import Styles from "./Style";
import swal from "@sweetalert/with-react";
import { UploadFile, DialogModal } from '../../../common-components/';
import CreatePost from "../post/createPost";
import { getStorage } from '../../../config';
const Form = () => {
  const classes = Styles();
  // const { displayName, photoURL } = useSelector((state) => state.user);

  const [uploadData, setUploadData] = useState({
    description: "",
    file: {
      type: "",
      name: "",
      data: "",
    },

    file: "",
    urlFile: "",
    fileUpload: "",

  });

  const [state, setState] = useState({
    content: "",
    feeling: "",
    activity: "",
    image: [{
      file: "",
      urlFile: "",
      fileUpload: "",
    }],
    video: [{
      file: "",
      urlFile: "",
      fileUpload: "",
    }],

  })

  const [progress, setProgress] = useState("");


  const handleSubmitButton = () => {

  }


  function handleUploadFile(value) {
    const { file, urlFile, fileUpload } = state
    if (value.length !== 0) {
      if (file !== value[0].fileName && urlFile !== value[0].urlFile && fileUpload !== value[0].fileUpload) {
        setState({
          ...state,
          file: value[0].fileName,
          urlFile: value[0].urlFile,
          fileUpload: value[0].fileUpload

        })
      }
    }

  }


  function toggleCreatePost(event) {
    event.preventDefault();
    window.$('#modal-create-post').modal('show');
  }


  const displayName = "NTQ"
  return (
    <Paper className={classes.upload}>
      <div className={classes.upload__header}>
        <Avatar />
        <form className={classes.header__form} onSubmit={handleSubmitButton}>
          <input
            placeholder={`What's on your mind, ${displayName}?`}
            value={uploadData.description}
            onFocus={toggleCreatePost}
            onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
          />

          <button type="submit">Post</button>
        </form>
      </div>
      {/* {uploadData.file.name && !progress && (
        <div className={classes.selectedFile}>
          <Chip
            color="primary"
            size="small"
            onDelete={resetState}
            icon={uploadData.file.type === "image" ? <PhotoRoundedIcon /> : <VideocamRoundedIcon />}
            label={uploadData.file.name}
          />
        </div>
      )} */}
      {progress ? (
        <div className={classes.uploading}>
          <LinearProgress variant="determinate" value={progress} className={classes.progress} />
          <p>{progress} %</p>
        </div>
      ) : (
        ""
      )}
      <Divider />

      <div className={classes.upload__media}>
        <label className={classes.media__options}>
          <VideocamRoundedIcon style={{ color: "red" }} />
          <h4>Video</h4>
          {/* <UploadFile multiple={true} onChange={handleUploadFile} /> */}
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
      <CreatePost />
    </Paper>
  );
};

export default Form;
