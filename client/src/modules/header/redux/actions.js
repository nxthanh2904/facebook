import { SearchServices } from './services';
import { SearchConstants } from './constants';


export const SearchActions = {
    searchPost,
    searchUser,
}

function searchPost(keyword) {
    return dispatch => {
        dispatch({ type: SearchConstants.SEARCH_POST_REQUEST });
        SearchServices.searchPost(keyword)
            .then(res => {
                dispatch({
                    type: SearchConstants.SEARCH_POST_SUCCESS,
                    payload: res.data.content,
                });
            })
            .catch((err) => {
                dispatch({
                    type: SearchConstants.SEARCH_POST_FAILE,
                })
            })
    }
}

function searchUser(keyword) {
    return dispatch => {
        dispatch({ type: SearchConstants.SEARCH_USER_REQUEST });
        SearchServices.searchUser(keyword)
            .then(res => {
                dispatch({
                    type: SearchConstants.SEARCH_USER_SUCCESS,
                    payload: res.data.content,
                });
            })
            .catch((err) => {
                dispatch({
                    type: SearchConstants.SEARCH_USER_FAILE,
                })
            })
    }
}
