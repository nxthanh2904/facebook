import React from 'react'
import SearchIcon from "@material-ui/icons/Search";
import Style from "./Style";
import { useState } from 'react';
import Notifications from "../notifications/components/notification";
import { connect, useSelector } from 'react-redux';
import { SearchActions } from './redux/actions';
import { Link, Redirect } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

function SearchBox(props) {
    const { result } = useSelector(state => state.search);
    const classes = Style();

    const onChangeSearchText = (e) => {
        let { value } = e.target;
        props.searchPost(value);
    }

    // const onPressEnter = () => {
    //     console.log("press Enter \n\n\n");
    //     return <Redirect to='/profile' />
    // }

    return (
        <div>
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    <li className="dropdown notifications-menu">
                        {/* <div className={classes.logo__search}> */}
                        <input className="dropdown-toggle"
                            className={classes.input_search}
                            data-toggle="dropdown"
                            aria-expanded="false"
                            placeholder="Search facebook ..."
                            onChange={(e) => { onChangeSearchText(e) }}
                        // onKeyPress={event => event.key === 'Enter' ? onPressEnter(event) : null}
                        >
                        </input>

                        {/* </div> */}
                        <ul className="dropdown-menu" style={{ width: "310px", boxShadow: "3px 3px 5px #DDD" }}>
                            <li>
                                <ul className="menu" style={{ maxHeight: "60vh" }}>
                                    {result?.user?.map((e, key) => {
                                        return <li key={key}>
                                            <a href={`http://localhost:3000/profile/${e._id}`} style={{ whiteSpace: "break-spaces" }}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <Avatar src={`${process.env.REACT_APP_SERVER}${e.avatar}`} /> &nbsp;&nbsp;
                                                    <div>{e.surName + " " + e.firstName}</div>
                                                </div>
                                            </a>
                                        </li>
                                    })
                                    }
                                    {result?.post?.length || result?.user?.length ? <li key="more">
                                        <Link to={`/search`} style={{ whiteSpace: "break-spaces" }}>
                                            <div style={{ textAlign: "center", color: "blue" }}>
                                                <div>Tìm kiếm thêm</div>
                                            </div>
                                        </Link>
                                    </li> : null
                                    }

                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
    )
}
const mapDispatchToProps = {
    searchPost: SearchActions.searchPost,
}

export default connect(null, mapDispatchToProps)(SearchBox);
