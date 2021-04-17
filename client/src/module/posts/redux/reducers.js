import { PostConstants } from './constants';

export const CallApiStatus = {
    INITIALIZED: 0,
    CALLING: 1,
    FINISHED: 2,
}
var initState = {
    calledAPI: CallApiStatus.INITIALIZED,
    user: {},
    links: [],
    components: [],
    error: null,
    forgotPassword: false,
    reset_password: false,
    showFiles: [],
    isLoading: false,
    password2AlreadyExists: false,
    posts: [],

}

export function post(state = initState, action) {
    switch (action.type) {
        case PostConstants.CREATE_POST_REQUEST:
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
                posts: [...posts, action.payload]
            }
        case PostConstants.CREATE_POST_FAILE:
            return {
                ...state,
                isLoading: false,
                calledAPI: CallApiStatus.FINISHED,
            };

    }
}