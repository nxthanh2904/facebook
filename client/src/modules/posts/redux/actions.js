import { PostServices } from './services';
import { PostConstants } from './constants';


export const PostActions = {
    createPost,
    getNewFeed,
    setComment,
    likePost,
    dislikePost,
    getPostById,
    editPost,
    deletePost,
}

function createPost(data) {
    return dispatch => {
        dispatch({ type: PostConstants.CREATE_POST_REQUEST });
        PostServices.createPost(data)
            .then(res => {
                dispatch({
                    type: PostConstants.CREATE_POST_SUCCESS,
                    payload: res.data.content,
                });
            })
            .catch((err) => {
                dispatch({
                    type: PostConstants.CREATE_POST_FAILE
                })
            })
    }
}

function getPostById(id) {
    return dispatch => {
        dispatch({ type: PostConstants.GET_POST_BY_ID_REQUEST });
        PostServices.getPostById(id)
            .then(res => {
                dispatch({
                    type: PostConstants.GET_POST_BY_ID_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch((err) => {
                dispatch({
                    type: PostConstants.GET_POST_BY_ID_FAILE
                })
            })
    }
}

function getNewFeed() {
    return dispatch => {
        dispatch({ type: PostConstants.GET_NEW_FEED_REQUEST });
        PostServices.getNewFeed()
            .then(res => {
                dispatch({
                    type: PostConstants.GET_NEW_FEED_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch((err) => {
                dispatch({
                    type: PostConstants.GET_NEW_FEED_FAILE
                })
            })
    }
}

function setComment(data, postId) {
    return dispatch => {
        dispatch({ type: PostConstants.SET_COMMENT_REQUEST });
        PostServices.setComment(data, postId)
            .then(res => {
                dispatch({
                    type: PostConstants.SET_COMMENT_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch((err) => {
                dispatch({
                    type: PostConstants.SET_COMMENT_FAILE
                })
            })
    }
}

function likePost(postId) {
    return dispatch => {
        dispatch({ type: PostConstants.LIKE_POST_REQUEST });
        PostServices.likePost(postId)
            .then(res => {
                dispatch({
                    type: PostConstants.LIKE_POST_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch((err) => {
                dispatch({
                    type: PostConstants.LIKE_POST_FAILE
                })
            })
    }
}

function dislikePost(postId) {
    return dispatch => {
        dispatch({ type: PostConstants.DISLIKE_POST_REQUEST });
        PostServices.dislikePost(postId)
            .then(res => {
                dispatch({
                    type: PostConstants.DISLIKE_POST_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch((err) => {
                dispatch({
                    type: PostConstants.DISLIKE_POST_FAILE
                })
            })
    }
}

function editPost(data, postId) {
    return dispatch => {
        dispatch({
            type: PostConstants.EDIT_POST_REQUEST
        });
        PostServices.editPost(data, postId)
            .then(res => {
                dispatch({
                    type: PostConstants.EDIT_POST_SUCCESS,
                    payload: res.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: PostConstants.EDIT_POST_FAILE})
            })
    }
}

function deletePost(postId) {
    return dispatch => {
        dispatch({ type: PostConstants.DELETE_POST_REQUEST });
        PostServices.deletePost(postId)
            .then(res => {
                dispatch({
                    type: PostConstants.DELETE_POST_SUCCESS,
                    payload: res.data,
                    postId: postId
                })
            })
            .catch((err) => {
                dispatch({
                    type: PostConstants.DELETE_POST_FAILE})
            })
    }
}


