import { PostConstants } from './constants';

export const CallApiStatus = {
    INITIALIZED: 0,
    CALLING: 1,
    FINISHED: 2,
}
var initState = {
    calledAPI: CallApiStatus.INITIALIZED,
    posts: [],
    postItem: {},
    isLoading: false,
}

export function post(state = initState, action) {
    switch (action.type) {
        case PostConstants.CREATE_POST_REQUEST:
        case PostConstants.GET_NEW_FEED_REQUEST:
        case PostConstants.SET_COMMENT_REQUEST:
        case PostConstants.LIKE_POST_REQUEST:
        case PostConstants.DISLIKE_POST_REQUEST:
        case PostConstants.GET_POST_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: false,
                error: null,
                calledAPI: CallApiStatus.CALLING,
            };

        case PostConstants.CREATE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                posts: [action.payload, ...state.posts]
            }
        case PostConstants.GET_NEW_FEED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                posts: action.payload
            }
        case PostConstants.GET_POST_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                postItem: action.payload
            }
        case PostConstants.SET_COMMENT_SUCCESS:
            // let x = state.posts.filter(e => (String(e._id) === String(action.payload._id)) ? action.payload : e)
            // console.log('action.payload', action.payload, action.payload._id, x);
            return {
                ...state,
                isLoading: false,
                posts: action.payload
            }
        case PostConstants.LIKE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                posts: action.payload
            }
        case PostConstants.DISLIKE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                posts: action.payload
            }

        case PostConstants.CREATE_POST_FAILE:
        case PostConstants.GET_NEW_FEED_FAILE:
        case PostConstants.SET_COMMENT_FAILE:
        case PostConstants.LIKE_POST_FAILE:
        case PostConstants.DISLIKE_POST_FAILE:
        case PostConstants.GET_POST_BY_ID_FAILE:
            return {
                ...state,
                isLoading: false,
                calledAPI: CallApiStatus.FINISHED,
            };


        default:
            return {
                ...state
            };

    }
}