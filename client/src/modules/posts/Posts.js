import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlipMove from "react-flip-move";
import Post from "./post/Post";
import db from "../../firebase";
import moment from "moment";

const Posts = () => {
  const classes = Style();

  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection("posts")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snap) => setPosts(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() }))));
  //   return unsubscribe;
  // }, []);


  const fakeData = [
    {
      key: "1",
      profile: "",
      username: "NTQ",
      timestamp: moment("18-06-2021", "DD-MM-YYYY"),
      description: "QyDsd",
      // fileType: { post.data.fileType }
      // fileData: { post.data.fileData }
    },
    {
      key: "2",
      profile: "",
      username: "NTD",
      timestamp: moment("18-06-2021", "DD-MM-YYYY"),
      description: "QyDsd",
      // fileType: { post.data.fileType }
      // fileData: { post.data.fileData }
    },
    {
      key: "3",
      profile: "",
      username: "NQL",
      timestamp: moment("18-06-2021", "DD-MM-YYYY"),
      description: "QyDsd",
      // fileType: { post.data.fileType }
      // fileData: { post.data.fileData }
    },
    {
      key: "4",
      profile: "",
      username: "NTQD",
      timestamp: moment("18-06-2021", "DD-MM-YYYY"),
      description: "QyDsd",
      // fileType: { post.data.fileType }
      // fileData: { post.data.fileData }
    },
  ]

  return (
    <div className={classes.posts}>
      <FlipMove style={{ width: "100%" }}>
        {fakeData.map((post) => (
          <Post
            key={post.id}
            profile={post.profile}
            username={post.username}
            timestamp={post.timestamp}
            description={post.description}
            fileType={post.fileType}
            fileData={post.fileData}
          />
        ))}
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

export default Posts;
