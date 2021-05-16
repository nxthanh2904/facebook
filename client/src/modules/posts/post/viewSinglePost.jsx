import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import LayoutWithHeader from '../../../layout-factbook/layoutWithHeader';
import { PostActions } from '../redux/actions';
import Post from './Post';

const ViewSinglePost = (props) => {

  const { postItem } = useSelector(state => state.post);
  const idParam = props.location?.pathname?.split("/").reverse()[0];
  console.log('posItd', idParam);
  const [postId, setPostId] = useState(idParam);

  useEffect(() => {
    props.getPostById(postId)
  }, [postId])

  console.log('render', window.location.href, props.location);
  return (
    <LayoutWithHeader>
      <div className="container">
        {Object.keys(postItem).length !== 0 ?
          <Post
            viewType="single"
            newFeed={postItem}
          /> : <div></div>
        }
      </div>
    </LayoutWithHeader>
  );
};

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
  getPostById: PostActions.getPostById,
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(ViewSinglePost));
