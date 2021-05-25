import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Grid, Hidden, Avatar, Tooltip, Paper, Badge } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { HomeOutlined, PlayCircleFilledWhiteOutlined, StoreMallDirectoryOutlined, SupervisedUserCircleOutlined } from "@material-ui/icons";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import AddIcon from "@material-ui/icons/Add";
import Chat from "@material-ui/icons/Chat";
import Zoom from "@material-ui/core/Zoom";
import logo from "../../assets/images/logo.png";
import Style from "./Style";
import Notifications from "../notifications/components/notification";
import { AuthActions } from "../auth/redux/actions"
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { NotificationActions } from "../notifications/redux/actions";
import SearchBox from "./SearchBox";
import { SearchActions } from "./redux/actions";


function Header(props) {
  const classes = Style();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.util);

  useEffect(() => {
    props.searchUser({ type: "all" });
    props.getInforUser();
    props.getNotifications();
  }, [])

  const { user } = props.auth
  const avatar = `${process.env.REACT_APP_SERVER}${user.avatar}`;
  return (
    <Paper elevation={0} style={{ borderRadius: 0, width: "100%", height: "100%" }}>
      <Grid container className={classes.header}>
        {/*----Logo & Search icon--------*/}
        <Hidden xsDown>
          <Grid item className={classes.header__logo} sm={2} md={3}>
            <Link to="/">
              <img className={classes.logo__image} src={logo} alt="facebook-logo" />
            </Link>
            <Hidden smDown>
              {/* <div className={classes.logo__search}> */}
              {/* <SearchIcon /> */}
              {/* <input placeholder="Search facebook ..." /> */}
              <SearchBox />
              {/* </div> */}
            </Hidden>
          </Grid>
        </Hidden>
        {/*----Nav-Bar--------*/}
        <Grid item className={classes.header__nav} xs={12} sm={8} md={6}>
          <div className={`${classes.nav__links} ${classes.nav__links__specail}`}>
            <Avatar src={logo} />
          </div>

          <Link to="/" className={classes.nav__links}>
            <HomeOutlined />
          </Link>

          <Link to="/watch" className={classes.nav__links}>
            <PlayCircleFilledWhiteOutlined />
          </Link>

          <Hidden xsDown>
            <div className={classes.nav__links}>
              <StoreMallDirectoryOutlined />
            </div>
            <div className={classes.nav__links}>
              <SupervisedUserCircleOutlined />
            </div>
          </Hidden>

          <Link to={`/profile/${user._id}`} onClick={() => props.getProfileById(user?._id)} className={`${classes.nav__links} ${classes.nav__links__specail}`}>
            <Avatar
              src={avatar}
            />
          </Link>
        </Grid>
        {/*----Userinfo and options--------*/}
        <Hidden xsDown>
          <Grid item className={classes.header__userinfo} sm={2} md={3}>
            <Tooltip
              placement="left"
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 300 }}
              title={`${user.firstName}`}
              arrow
            >
              <Link to={`/profile/${user._id}`} onClick={() => props.getProfileById(user?._id)}>
                <Avatar
                  src={avatar}
                />
              </Link>

            </Tooltip>

            <Hidden smDown>
              <div className={classes.userinfo__options}>
                <AddIcon />
                <Link to={"/messenger"}>
                  <Chat />
                </Link>
                {/* <Badge badgeContent={10} max={9} {...defaultProps} /> */}
                <Notifications />
                {/* <ArrowDropDownRoundedIcon /> */}
                <Tooltip
                  placement="left"
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 300 }}
                  title={`Log out`}
                  arrow
                  onClick={props.logout}
                >
                  <ExitToAppIcon />
                </Tooltip>
              </div>

            </Hidden>
          </Grid>
        </Hidden>
      </Grid>
    </Paper>
  );
};

const defaultProps = {
  color: "secondary",
  children: <NotificationsNoneOutlinedIcon />,
};

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = {
  getInforUser: AuthActions.getInforUser,
  logout: AuthActions.logout,
  searchUser: SearchActions.searchUser,
  getNotifications: NotificationActions.getNotifications,
  getProfileById: AuthActions.getProfileById,
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Header));
