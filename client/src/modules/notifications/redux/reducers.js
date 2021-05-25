import { NotificationConstants } from './constants';

export const CallApiStatus = {
    INITIALIZED: 0,
    CALLING: 1,
    FINISHED: 2,
}
var initState = {
    calledAPI: CallApiStatus.INITIALIZED,
    isLoading: false,
    notify: {}
}

export function notification(state = initState, action) {
    switch (action.type) {
        case NotificationConstants.GET_NOTIFICATION_REQUEST:
            return {
                ...state,
                isLoading: false,
                error: null,
                calledAPI: CallApiStatus.CALLING,
            };

        case NotificationConstants.GET_NOTIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                notify: action.payload
            }

        case NotificationConstants.GET_NOTIFICATION_FAILE:
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