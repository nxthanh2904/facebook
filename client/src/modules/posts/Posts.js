import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlipMove from "react-flip-move";
import Post from "./post/Post";
import db from "../../firebase";
import moment from "moment";
import { connect, useSelector, useDispatch } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { PostActions } from './redux/actions';
const Posts = (props) => {
  const classes = Style();
  const { type } = props;
  useEffect(() => {

    props.getNewFeed();
  }, []);

  const { posts } = props.post;
  const { user } = props.auth;

  const checkTypeVideo = (post) => {
    if (typeof post === 'string' || post instanceof String) {
      let index = post.lastIndexOf(".");
      let typeFile = post.substring(index + 1, post.length).toLowerCase();
      if (typeFile === "mp4") {
        return true;
      }
      else return false;
    }
    else return false;
  }

  let listPost = [];
  if (type === "profile") {
    listPost = posts.filter(post => post.creator._id === user._id)
  }
  else if (type === "watch") {
    listPost = posts.filter((post) => checkTypeVideo(post.images[0]))
  }
  else listPost = posts;

  return (
    <div className={classes.posts}>
      <FlipMove style={{ width: "100%" }}>
        {listPost ? listPost.map((post) => (
          <Post
            newFeed={post}
          />
        )) : <></>}
      </FlipMove>
    </div>
  );
};

const Style = makeStyles((theme) => ({
  posts: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const mapStateToProps = (state => {
  return state
});

const mapDispatchToProps = {
  getNewFeed: PostActions.getNewFeed
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Posts));
