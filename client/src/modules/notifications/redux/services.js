import {
    getStorage
} from '../../../config';
import {
    sendRequest
} from '../../../helpers/requestHelper';

export const NotificationServices = {
    getNotifications,
}

async function getNotifications() {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/auth/notifications`,
        method: 'GET',

    }, false, false, 'notify')
}