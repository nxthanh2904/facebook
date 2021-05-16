import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ReplyOutlinedIcon from "@material-ui/icons/ReplyOutlined";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ReactPlayer from "react-player";
import ReactTimeago from "react-timeago";
import Style from "./Style";
import { connect, useSelector, useDispatch } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { PostActions } from '../redux/actions';
import moment from 'moment';
import Comment from "../comment/comment";
import ModalViewPost from "./modalViewPost";

const Post = (props) => {
  const classes = Style();
  const { profile, username, timestamp, description, fileType, fileData } = props
  const { viewType } = props
  const [onViewPost, setViewPost] = useState(undefined);
  const [showComment, setShowComment] = useState(viewType === "single");
  const [likedPost, setLikedPost] = useState(false);
  const [thumsUpIconOrder, setThumsUpIconOrder] = useState(1);

  useEffect(() => {
    const { newFeed } = props;
    const reaction = newFeed.reactions;
    const userId = localStorage.getItem("userId");
    const liked = reaction.find(x => x.userId === userId)

    if (liked) {
      setLikedPost(true);
    }
  }, []);

  const { newFeed } = props;
  const comment = newFeed?.comment;
  const user = newFeed ? newFeed.creator : {}

  const Reactions = () => {
    return (
      <div>
        {newFeed.reactions.length ?
          <div className={classes.footer__stats}>
            <div>
              <ThumbUpAltIcon style={{ color: " #2e81f4", order: `${thumsUpIconOrder} ` }} />
            </div>
            <h4>{newFeed.reactions.length}</h4>
          </div> : <div></div>
        }
      </div>
    );
  };
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

  const collapseComment = () => {
    setShowComment(showComment => showComment = !showComment);
  }

  const onClickLikePost = () => {
    const { newFeed } = props;
    const postId = newFeed._id;
    if (likedPost) {
      props.dislikePost(postId);
      setLikedPost(false);
    } else {
      props.likePost(postId);
      setLikedPost(true);
    }
  }


  const clickViewPost = (e, id) => {
    e.preventDefault();
    setViewPost(id);
    window.$(`#modal-view-post-${id}`).modal('show');
  }

  return (
    <Paper className={classes.post}>
      <div className={classes.post__header}>
        <Avatar
          style={{ marginLeft: "10px" }}
          src={`${process.env.REACT_APP_SERVER}${user.avatar}`}
        />
        <div className={classes.header__info}>
          <h4 style={{ cursor: "pointer" }}>{user.surName} {user.firstName}</h4>
          <p style={{ cursor: "pointer" }} onClick={(e) => clickViewPost(e, newFeed._id)}>
            {/* <ReactTimeago date={newFeed ?newFeed.createAt.toUTCString() : null} units="minute" /> */}
            {moment(newFeed.createdAt).fromNow()}
          </p>
        </div>
        <MoreHorizOutlinedIcon />
      </div>
      <div className={classes.post__body}>
        <div className={classes.body__description} style={{ cursor: "pointer" }} onClick={(e) => clickViewPost(e, newFeed._id)}>
          <p>{newFeed.content}</p>
        </div>
        {newFeed.images.length ?
          <div className={classes.body__image}>
            {checkTypeFile(newFeed.images[0]) ? (
              <img src={`${process.env.REACT_APP_SERVER}${newFeed.images[0]}`} alt="post" />
            ) : (
              <ReactPlayer url={`${process.env.REACT_APP_SERVER}${newFeed.images[0]}`} controls={true} />
            )}
          </div> : <div></div>
        }
      </div>
      <div className={classes.post__footer}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Reactions />
          {comment?.length ? <div onClick={collapseComment} style={{ cursor: "pointer" }}>
            {comment?.length}&nbsp;comment
          </div> : <div></div>
          }
        </div>

        <div className={classes.footer__actions} >
          <div onClick={onClickLikePost} className={classes.action__icons} style={{ color: likedPost && "#2e81f4" }}>
            <ThumbUpAltOutlinedIcon />
            <h4>Like</h4>
          </div>
          <div onClick={collapseComment} className={classes.action__icons}>
            <ChatBubbleOutlineOutlinedIcon />
            <h4>Comment</h4>
          </div>
          <div className={classes.action__icons}>
            <ReplyOutlinedIcon style={{ transform: "scaleX(-1)" }} />
            <h4>Share</h4>
          </div>
        </div>
      </div>
      {
        showComment && <Comment postId={newFeed?._id} listComment={comment} />
      }
      {onViewPost &&
        <ModalViewPost viewType={"single"} id={newFeed?._id} postItem={newFeed} />
      }
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
  getNewFeed: PostActions.getNewFeed,
  likePost: PostActions.likePost,
  dislikePost: PostActions.dislikePost,
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Post));
