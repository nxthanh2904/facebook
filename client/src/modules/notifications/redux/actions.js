import { NotificationServices } from './services';
import { NotificationConstants } from './constants';


export const NotificationActions = {
    getNotifications,
}

function getNotifications() {
    return dispatch => {
        dispatch({ type: NotificationConstants.GET_NOTIFICATION_REQUEST });
        NotificationServices.getNotifications()
            .then(res => {
                dispatch({
                    type: NotificationConstants.GET_NOTIFICATION_SUCCESS,
                    payload: res.data.content,
                });
            })
            .catch((err) => {
                dispatch({
                    type: NotificationConstants.GET_NOTIFICATION_FAILE,
                })
            })
    }
}
