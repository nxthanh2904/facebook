import {
    getStorage
} from '../../../config';
import {
    sendRequest
} from '../../../helpers/requestHelper';

export const PostServices = {
    createPost,
    getNewFeed,
    setComment,
    likePost,
    dislikePost,
    getPostById,
}

async function createPost(data) {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/post/create-post`,
        method: 'POST',
        data
    }, true, true, 'post')
}

async function getNewFeed() {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/post/get-list-post`,
        method: 'GET',

    }, false, false, 'post')
}

async function getPostById(id) {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/post/get-post/${id}`,
        method: 'GET',

    }, false, false, 'post')
}

async function setComment(formData, postId) {
    console.log('hello', formData);
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/post/set-comment/${postId}`,
        method: 'POST',
        data: formData
    }, true, true, 'post')
}

async function likePost(postId) {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/post/like-post/${postId}`,
        method: 'POST',
    }, true, true, 'post')
}

async function dislikePost(postId) {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/post/dislike-post/${postId}`,
        method: 'POST',
    }, true, true, 'post')
}