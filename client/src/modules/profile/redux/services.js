import {
    getStorage
} from '../../../config';

import { sendRequest } from '../../../helpers/requestHelper';

export const ChatServices = {
    getAllConversations,

}

async function changeAvatar() {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/auth/profile/change-avatars`,
        method: "GET",

    }, false, false, 'message')
}