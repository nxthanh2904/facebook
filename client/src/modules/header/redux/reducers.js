import { SearchConstants } from './constants';

export const CallApiStatus = {
    INITIALIZED: 0,
    CALLING: 1,
    FINISHED: 2,
}
var initState = {
    calledAPI: CallApiStatus.INITIALIZED,
    isLoading: false,
    result: {},
    user: {},
}

export function search(state = initState, action) {
    switch (action.type) {
        case SearchConstants.SEARCH_POST_REQUEST:
        case SearchConstants.SEARCH_USER_REQUEST:
            return {
                ...state,
                isLoading: false,
                error: null,
                calledAPI: CallApiStatus.CALLING,
            };

        case SearchConstants.SEARCH_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                result: action.payload
            }

        case SearchConstants.SEARCH_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }

        case SearchConstants.SEARCH_POST_FAILE:
        case SearchConstants.SEARCH_USER_FAILE:
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