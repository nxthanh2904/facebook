import {
    getStorage
} from '../../../config';
import {
    sendRequest
} from '../../../helpers/requestHelper';

export const PostService = {
    createPost,

}

async function createPost(data) {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/auth/login`,
        method: 'POST',
        data
    }, false, false, 'post')
}
