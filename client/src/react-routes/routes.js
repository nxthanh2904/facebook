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
import General from "../modules/profile/component/general";
import Profile from "../modules/profile/component/profile";
import Listfriend from "../modules/profile/component/friend/Listfriend";


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
                    <PrivateRoute
                        // exact={true}
                        path={"/profile"}
                        pageName={"Profile"}
                        component={Profile}
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
