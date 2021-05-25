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
import ReactEmoji from 'react-emoji'
//import Carousel from 'react-bootstrap/Carousel';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import Dropdown from 'react-bootstrap/Dropdown'
import Style from "./Style";
import { connect, useSelector, useDispatch } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { PostActions } from '../redux/actions';
import moment from 'moment';
import Comment from "../comment/comment";
import ModalViewPost from "./modalViewPost";
import { Link } from "react-router-dom";
import { AuthActions } from "../../auth/redux/actions";
import EditPost from "./editPost";

const Post = (props) => {
  const classes = Style();
  const { viewType } = props
  const [onViewPost, setViewPost] = useState(undefined);
  const [showComment, setShowComment] = useState(viewType === "single");
  const [likedPost, setLikedPost] = useState(false);
  const [thumsUpIconOrder, setThumsUpIconOrder] = useState(1);
  const userId = localStorage.getItem("userId");
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === newFeed.images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? newFeed.images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  useEffect(() => {
    const { newFeed } = props;
    const reaction = newFeed.reactions;

    const liked = reaction.find(x => x.userId === userId)

    if (liked) {
      setLikedPost(true);
    }
  }, []);

  const { newFeed } = props;
  const comment = newFeed?.comment;
  const user = newFeed ? newFeed.creator : {}
  const { postEdit } = props;
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

  const toggleEditPost = (e) => {
    e.preventDefault();
    props.setPostEdit(newFeed)
    window.$('#modal-edit-post').modal('show');
  }

  const deletePost = () => {
    props.deletePost(newFeed._id);
  }
  console.log('-------------------------', newFeed);
  const listImage = newFeed.images.map((image, index) => (
    <CarouselItem className={classes.body__image}
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={image}
    >
      {checkTypeFile(image) ? (
        <img className="d-block w-100" src={`${process.env.REACT_APP_SERVER}${image}`} alt={index} id={index} />
      ) : (
        <ReactPlayer url={`${process.env.REACT_APP_SERVER}${image}`} controls={true} />
      )}
    </CarouselItem>
  ))


  return (
    <Paper className={classes.post}>
      <EditPost postEdit={postEdit} />
      <div className={classes.post__header}>
        <Link to={`/profile/${user?._id}`} onClick={() => props.getProfileById(user?._id)}>
          <Avatar
            style={{ marginLeft: "10px" }}
            src={`${process.env.REACT_APP_SERVER}${user.avatar}`}
          />
        </Link>
        <div className={classes.header__info}>
          <div style={{ display: 'flex' }}>
            <h4 style={{ cursor: "pointer" }} onClick={() => props.getProfileById(user?._id)}>
              <Link to={`/profile/${user?._id}`} >{user.surName} {user.firstName}</Link>
            </h4>
            {newFeed.feeling ? (
              <h4>
                &nbsp;&nbsp;đang {ReactEmoji.emojify(newFeed.feeling.code)} cảm thấy <strong>{newFeed.feeling.name}</strong>
              </h4>
            ) : <> </>
            }
          </div>
          <p style={{ cursor: "pointer" }} onClick={(e) => clickViewPost(e, newFeed._id)}>
            {/* <ReactTimeago date={newFeed ?newFeed.createAt.toUTCString() : null} units="minute" /> */}
            {moment(newFeed.createdAt).fromNow()}
          </p>
        </div>
        {/* <MoreHorizOutlinedIcon /> */}
        {
          user._id === userId ?
            (
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#111"
                }}>
                  <MoreHorizOutlinedIcon />
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ minWidth: "100px" }}>
                  <Dropdown.Item style={{ display: "flex", alignItems: 'center', }} onClick={toggleEditPost}>
                    <span style={{ padding: "5px" }}>
                      <i className="fa fa-pencil-square-o" ></i>&nbsp;Chỉnh sửa
                    </span>
                  </Dropdown.Item>
                  <br />
                  <Dropdown.Item style={{ display: "flex", alignItems: 'center', }} onClick={deletePost}>
                    <span style={{ padding: "5px" }}>
                      <i className="fa fa-trash" ></i>&nbsp;Xóa
                    </span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : <> </>
        }
      </div>
      <div className={classes.post__body}>
        <div className={classes.body__description} style={{ cursor: "pointer" }} onClick={(e) => clickViewPost(e, newFeed._id)}>
          <p>{ReactEmoji.emojify(newFeed.content)}</p>
        </div>
        {newFeed.images.length ?
          <div>
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
            >
              <CarouselIndicators items={newFeed.images} activeIndex={activeIndex} onClickHandler={goToIndex} />
              {listImage}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
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
  getProfileById: AuthActions.getProfileById,
  deletePost: PostActions.deletePost
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Post));
