import { Avatar } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { UploadFile } from '../../../common-components';
import { getStorage } from '../../../config';
import { PostActions } from '../redux/actions';
import Style from "./../post/Style";
import ReactEmoji from 'react-emoji';
import { AuthActions } from '../../auth/redux/actions';
import "./comment.css";

const Comment = (props) => {
  const classes = Style();
  const userId = getStorage("userId");
  const [state, setState] = useState({
    content: "",
    images: [],
    videos: [],
    userId: userId,
  })

  const checkTypeFile = (data) => {
    if (typeof data === 'string' || data instanceof String) {
      let index = data.lastIndexOf(".");
      let typeFile = data.substring(index + 1, data.length).toLowerCase();
      if (typeFile === "png" || typeFile === "jpg" || typeFile === "jpeg") {
        return true;
      }
      else return false;
    }
    else return false;
  }


  const handleUploadFile = (value) => {
    console.log('values', value);
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

  const handleChangeCommentText = (e) => {
    let { value } = e?.target;
    setState(state => {
      return {
        ...state,
        content: value
      }
    })
  }

  const sendComment = () => {
    const formData = new FormData();
    const { content, images, userId } = state
    const { postId } = props
    if (content) {
      console.log('conteent', content);
      formData.append('content', content);
    }
    if (images && images.length) {

      images.forEach(x => {
        console.log('img', x.fileUpload);
        formData.append("comment", x.fileUpload);
      })
    }
    formData.append('creator', userId);
    let data = { formData: formData, id: postId };
    props.setComment(formData, postId);
    props.getPostById(postId)
    setState({
      content: "",
      images: [],
      videos: [],
      userId: userId,
    })
  }

  const validateSubmit = () => {
    return state.content.trim() !== ""
  }

  const { content, images, videos } = state;
  const { postId, listComment } = props;
  const { auth } = props;

  const { user } = auth;

  return (
    <div className="coment-area" style={{ display: 'block', paddingLeft: "10px", paddingRight: "5px", marginTop: 0, borderTopColor: "#ccc", borderTopWidth: "1px", borderTopStyle: "solid" }}>
      <ul className="we-comet">
        {listComment && listComment.map((cmt, key) => {
          return (
            <li key={key}>
              <div className="comet-avatar" style={{ marginTop: "10px" }}>
                <Link to={`/profile/${cmt.creator?._id}`} onClick={() => props.getProfileById(cmt.creator?._id)}>
                  <Avatar
                    src={`${process.env.REACT_APP_SERVER}${cmt?.creator?.avatar}`}
                  />
                </Link>
              </div>
              <div className="we-comment">
                <h5>
                  <Link to={`/profile/${cmt.creator?._id}`} onClick={() => props.getProfileById(cmt.creator?._id)} style={{ fontSize: "15px", fontWeight: "bold" }}>{cmt.creator?.surName} {cmt.creator?.firstName}</Link>
                </h5>
                <br />
                <p>{ReactEmoji.emojify(cmt.described)}</p>
                {cmt.images.length ?
                  <div className={classes.body__image}>
                    {checkTypeFile(cmt.images[0]) ? (
                      <img style={{ maxWidth: "50%", borderRadius: "5px" }} src={`${process.env.REACT_APP_SERVER}${cmt.images[0]}`} alt="image" />
                    ) : (
                      <ReactPlayer style={{ maxWidth: "50%" }} url={`${process.env.REACT_APP_SERVER}${cmt.images[0]}`} controls={true} />
                    )}
                  </div> : <div></div>
                }

                <div className="inline-itms">
                  <span>{moment(cmt.createAt).fromNow()}</span>
                  {/* <a className="we-reply" href="#" title="Reply"><i className="fa fa-reply" /></a>
                  <a href="#" title><i className="fa fa-heart" /><span>20</span></a> */}
                </div>
              </div>
            </li>
          )
        }
        )}
        <li>
          {/* {listComment?.length >= 5 &&
            <a href="#" className="showmore underline">more comments+</a>
          } */}
        </li>
        <li className="post-comment">
          <div className="comet-avatar">
            <Avatar src={`${process.env.REACT_APP_SERVER}${user?.avatar}`} alt="" />
          </div>
          <div className="post-comt-box">
            <form>
              <textarea placeholder="Post your comment" value={content}
                onChange={(e) => handleChangeCommentText(e)}
              />
              <div className="add-smile">
                <div className="upload row" style={{ display: "flex", paddingBottom: "10px" }}>
                  <div className="col-md-11">
                    <UploadFile
                      accept="image/*,audio/*,video/*"
                      multiple={false}
                      // show={false}
                      onChange={(e) => handleUploadFile(e)}
                    />
                  </div>
                  <div className="col-md-auto" >
                    <a className="btn btn-success" title="Post comment" onClick={() => sendComment()}>
                      <i className="fa fa-paper-plane"></i>
                    </a>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </li>
      </ul>
    </div>

  );
};


const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
  setComment: PostActions.setComment,
  getPostById: PostActions.getPostById,
  getProfileById: AuthActions.getProfileById,
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Comment));
