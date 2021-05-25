import { ChatServices } from './services';
import { ChatConstants } from './constants';

export const ChatActions = {
    getAllConversations,
    receiveMessage,
    createConversation,
}

function createConversation(data) {
    return dispatch => {
        dispatch({ type: ChatConstants.CREATE_CONVERSATION_REQUEST });
        ChatServices.createConversation(data)
            .then(res => {
                dispatch({
                    type: ChatConstants.CREATE_CONVERSATION_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: ChatConstants.CREATE_CONVERSATION_FAILE })
            })
    }
}


function getAllConversations() {
    return dispatch => {
        dispatch({ type: ChatConstants.GET_ALL_CONNECTIONS_REQUEST });
        ChatServices.getAllConversations()
            .then(res => {
                dispatch({
                    type: ChatConstants.GET_ALL_CONNECTIONS_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: ChatConstants.GET_ALL_CONNECTIONS_FAILE })
            })
    }
}

function receiveMessage(message, roomId) {
    return dispatch => {
        dispatch({
            type: ChatConstants.RECEIVE_MESSAGE_SUCCESS,
            payload: message,
            roomId: roomId

        })
    }
}