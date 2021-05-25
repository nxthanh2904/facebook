import {
    getStorage
} from '../../../config';
import {
    sendRequest
} from '../../../helpers/requestHelper';

export const SearchServices = {
    searchPost,
    searchUser,
}

async function searchPost(keyword) {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/search/search-post`,
        method: 'POST',
        data: { keyword }
    }, false, false, 'searchPost')
}

async function searchUser(key) {
    console.log('keyword', key);
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/search/search-user`,
        method: 'GET',
        params: key
    }, false, false, 'searchUser')
}