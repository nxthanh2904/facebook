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
            company,
            user,
            role,
            link,
            component,
            department,
            employeesManager,
        } = this.props;
        const { password2AlreadyExists, autoRedirectAfterQuestionAnswer } = auth;
        return (
            <React.Fragment>
                <Switch>
                    {/* <Route
                        exact={true}
                        path={"/answer-auth-questions"}
                        // component={AnswerAuthQuestionPage}
                        render={props =>
                            (password2AlreadyExists && autoRedirectAfterQuestionAnswer)
                                ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                                : <AnswerAuthQuestionPage {...props} />
                        }
                    /> */}

                    {/* <Route
                        exact={true}
                        path={"/friend"}
                        component={Listfriend}
                    />
                    {/* <Route 
                        exact={true}
                        path={"/"}
                        component={Home}
                    /> */}
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/login"
                        component={Login}
                    />
                    <PrivateRoute
                        isLoading={auth.isLoading}
                        key={"home"}
                        arrPage={[
                            { link: "/", name: "home", icon: "fa fa-home" },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/"}
                        path={"/"}
                        pageName={"home"}
                        layout={Layout}
                        component={Home}
                    />
                    <PrivateRoute
                        exact={true}
                        path={"/profile"}
                        component={Profile}
                    />
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/reset-password"
                        component={ResetPassword}
                    />

                    {/* 
                    <PrivateRoute
                        isLoading={false}
                        key={"all-time-sheet-log"}
                        arrPage={[
                            { link: "/", name: "home", icon: "fa fa-home" },
                            {
                                link: "/time-sheet-log/all",
                                name: "all_time_sheet_log",
                                icon: "fa fa-newspaper-o",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/time-sheet-log/all"}
                        path={"/time-sheet-log/all"}
                        pageName={"all_time_sheet_log"}
                        layout={Layout}
                        component={AllTimeSheetLog}
                    /> */}

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
