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
        case PostConstants.EDIT_POST_FAILE:
        case PostConstants.DELETE_POST_REQUEST:
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
        case PostConstants.SET_COMMENT_SUCCESS:
        case PostConstants.LIKE_POST_SUCCESS:
        case PostConstants.DISLIKE_POST_SUCCESS:
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
  
        case PostConstants.EDIT_POST_SUCCESS:
            console.log('rrrrrrrrr', action.payload);
            const index = state.posts.findIndex(elem => elem._id === action.payload.content._id);
            state.posts[index] = action.payload.content;
            return {
                ...state,
                isLoading: false,
            }
        case PostConstants.DELETE_POST_SUCCESS:
            const posts = state.posts.filter(elem => elem._id !== action.postId);
            return {
                ...state,
                posts: posts,
                isLoading: false
            }
        case PostConstants.CREATE_POST_FAILE:
        case PostConstants.GET_NEW_FEED_FAILE:
        case PostConstants.SET_COMMENT_FAILE:
        case PostConstants.LIKE_POST_FAILE:
        case PostConstants.DISLIKE_POST_FAILE:
        case PostConstants.GET_POST_BY_ID_FAILE:
        case PostConstants.DELETE_POST_FAILE:
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