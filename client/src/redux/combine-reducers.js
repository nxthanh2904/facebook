import { IntlReducer as Intl } from 'react-redux-multilingual';
import { socket } from '../modules/socket/redux/reducers';
import { clearStorage } from '../config';
import { combineReducers } from 'redux';
import { auth } from '../modules/auth/redux/reducers';
import { post } from '../modules/posts/redux/reducers';
import { chat } from '../modules/messenger/redux/reducers'
import { notification } from '../modules/notifications/redux/reducers';
import { search } from '../modules/header/redux/reducers';
const appReducer = combineReducers({
    socket,
    auth,
    Intl,
    post,
    chat,
    notification,
    search,
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined;
        clearStorage();
    }

    return appReducer(state, action);
}

export default rootReducer;