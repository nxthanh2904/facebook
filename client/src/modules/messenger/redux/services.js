import {
    getStorage
} from '../../../config';

import { sendRequest } from '../../../helpers/requestHelper';

export const ChatServices = {
    getAllConversations,
    createConversation,
}

async function getAllConversations() {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/chat/get-all-conversations`,
        method: "GET",

    }, false, false, 'message')
}

async function createConversation(data) {
    console.log('data-send', data);
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/chat/create-conversations`,
        method: "POST",
        data: data
    }, false, false, 'message')
}

async function saveMessage() {

}