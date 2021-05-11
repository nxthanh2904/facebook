import { IntlReducer as Intl } from 'react-redux-multilingual';
import { socket } from '../modules/socket/redux/reducers';
import { clearStorage } from '../config';
import { combineReducers } from 'redux';
import { auth } from '../modules/auth/redux/reducers';
import { post } from '../modules/posts/redux/reducers';
const appReducer = combineReducers({
    socket,
    auth,
    Intl,
    post,
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined;
        clearStorage();
    }

    return appReducer(state, action);
}

export default rootReducer;