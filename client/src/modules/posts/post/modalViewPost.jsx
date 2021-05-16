import React from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { PostActions } from '../redux/actions';
import { DialogModal, UploadFile } from "../../../common-components";
import Post from './Post';

const ModalViewPost = (props) => {

  const { id, postItem, viewType } = props;
  console.log('propsView', props);

  return (
    <DialogModal
      modalID={`modal-view-post-${id}`}
      formID={`form-view-post-${id}`}
      title="Xem bài viết"
      size="50"
      hasNote={false}
      hasSaveButton={false}
    >
      <Post
        viewType="single"
        newFeed={postItem}
      />
    </DialogModal>
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


export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(ModalViewPost));