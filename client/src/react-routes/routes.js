import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { PrivateRoute } from "./privateRoute";
import { AuthRoute } from "./authRoute";

import Layout from "../layout/layout";

import { NotFound } from "../modules/not-found/components";

import Login from "../modules/auth/components/login";
import ResetPassword from "../modules/auth/components/resetPassword";
import Home from "../modules/home/home";
import Watch from "../modules/watch/watch";
import General from "../modules/profile/component/general";
import Profile from "../modules/profile/component/profile";
import Listfriend from "../modules/profile/component/friend/Listfriend";
import Chat from '../modules/messenger/component/chat';
import Search from '../modules/search/Search';
import ViewSinglePost from "../modules/posts/post/viewSinglePost";
import ViewOtherProfile from "../modules/profile/component/viewOtherUserProfile";
import ViewAlbums from "../modules/profile/component/view-detail/viewAlbums";
import ViewFriends from "../modules/profile/component/view-detail/viewFriends";

class Routes extends Component {
    render() {
        const {
            auth,
        } = this.props;
        return (
            <React.Fragment>
                <Switch>
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/login"
                        component={Login}
                    />
                    <PrivateRoute
                        // isLoading={auth.isLoading}
                        // auth={auth}
                        exact={true}
                        path={"/"}
                        pageName={"home"}
                        component={Home}
                    />
                    {/* <PrivateRoute
                        path={"/profile"}
                        pageName={"Profile"}
                        component={Profile}
                    /> */}
                    <PrivateRoute
                        path={"/profile/:id"}
                        pageName={"Profile"}
                        // component={Profile}
                        component={ViewOtherProfile}
                    />
                    <PrivateRoute
                        path={"/friends/user/:id"}
                        pageName={"view_friend"}
                        component={ViewFriends}
                    />
                    <PrivateRoute
                        path={"/albums/user/:id"}
                        pageName={"view_albums"}
                        component={ViewAlbums}
                    />
                    <PrivateRoute
                        path={"/watch"}
                        pageName={"Watch"}
                        component={Watch}
                    />

                    <PrivateRoute
                        // exact={true}
                        path={"/messenger"}
                        pageName={"Chat"}
                        component={Chat}
                    />

                    <PrivateRoute
                        // exact={true}
                        path={"/search"}
                        pageName={"Search"}
                        component={Search}
                    />

                    <PrivateRoute
                        // exact={true}
                        path={"/post/:id"}
                        pageName={"View Post"}
                        component={ViewSinglePost}
                    />
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/reset-password"
                        component={ResetPassword}
                    />

                    {/* NOT FOUND */}
                    <Route component={NotFound}></Route>
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, null)(Routes);
