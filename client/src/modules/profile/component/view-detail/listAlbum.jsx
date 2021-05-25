import React from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from "react-player";
import '../general/general.css'
import "../../../messenger/component/customScrollBar.css"

const ListAlbum = () => {
  const { posts } = useSelector(state => state.post)
  const { user, otherUser } = useSelector(state => state.auth)
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
  const listPostIMG = posts.filter(post => !checkTypeVideo(post.images[0]) && post.creator._id === otherUser._id);
  const listPostVideo = posts.filter(post => checkTypeVideo(post.images[0]) && post.creator._id === otherUser._id);

  let allImages = [];
  let allVideos = []
  listPostIMG.forEach(post => {
    if (post.images?.length != 0) {
      let x = post.images?.map(e => { return { src: e, postId: post._id } });
      allImages = [...allImages, ...x];
    }
  })
  listPostVideo.forEach(post => {
    if (post.images?.length != 0) {
      let x = post.images?.map(e => { return { src: e, postId: post._id } });
      allVideos = [...allVideos, ...x];
    }
  })

  return (
    <div className='container body-scroll-content' style={{ overflow: "auto", height: "90vh" }}>
      <div className="box" style={{ height: "fit-content" }}>
        <div className="box-header with-border">
          <h3 className="box-title">Ảnh</h3>
        </div>
        <div className="box-body" >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {
              allImages.length ?
                allImages.map((image) =>
                  <div className="col-xs-3">
                    <img src={`${process.env.REACT_APP_SERVER}${image.src}`} alt="" className="album-view" />
                  </div>
                ) : <div>Chưa có ảnh</div>
            }
          </div>
        </div>
      </div>
      <div className="box" style={{ height: "fit-content" }}>
        <div className="box-header with-border">
          <h3 className="box-title">Video</h3>
        </div>
        <div className="box-body" >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {
              allVideos.length ?
                allVideos.map((image) =>
                  <div className="col-xs-6" s>
                    <ReactPlayer className="video-player" url={`${process.env.REACT_APP_SERVER}${image.src}`} controls={true} />
                  </div>
                ) : <div>Chưa có video</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAlbum;