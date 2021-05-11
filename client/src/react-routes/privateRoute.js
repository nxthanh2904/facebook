import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getStorage } from '../config';

const checkURL = (urlName, linkArr) => {
    var result = false;
    if (linkArr !== undefined) {
        linkArr.forEach(link => {
            if (link.url === urlName) {
                result = true;
            }
        });
    }

    return result;
}

const PrivateRoute = ({ auth, isLoading, arrPage, pageName, link, component: Component, layout: Layout, ...rest }) => {

    return <Route {...rest} render={props => {
        var logged = getStorage();
        if (logged) {
            return <Component {...props} />
        } else {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
    }} />
}

export { PrivateRoute };
