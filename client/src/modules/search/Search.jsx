import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Hidden, Paper } from "@material-ui/core";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { lightPrimary } from "../../assets/Colors";
import PublicIcon from '@material-ui/icons/Public';
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ReactPlayer from "react-player";
import moment from 'moment'
import Style from "../home/Style";
import './styles.css'


const Reactions = (props) => {

    const { newFeed } = props;
    return (
        <div>
            {newFeed.reactions.length ?
                <div className="reactions">
                    <ThumbUpAltIcon style={{ color: " #2e81f4" }} />
                    <h5 style={{ display: "inline", marginLeft: 5, color: "#333" }}>{newFeed.reactions.length}</h5>
                </div> : <div></div>
            }
        </div>
    );
};

const PostSearched = (props) => {
    const classes = Style();

    const { newFeed } = props;
    const checkTypeFile = (data) => {
        if (typeof data === 'string' || data instanceof String) {
            let index = data.lastIndexOf(".");
            let typeFile = data.substring(index + 1, data.length).toLowerCase();
            if (typeFile === "png" || typeFile === "jpg" || typeFile === "jpeg") {
                return true;
            }
            else return false;
        }
        else return false;
    }
    return (
        <div>
            {/* <div className={classes.post__header}>
        <Avatar
          style={{ marginLeft: "10px" }}
          src={`${process.env.REACT_APP_SERVER}${user.avatar}`}
        />
        <div className={classes.header__info}>
          <h4 style={{ cursor: "pointer" }}>{user.surName} {user.firstName}</h4>
          <p style={{ cursor: "pointer" }} onClick={(e) => clickViewPost(e, newFeed._id)}>
            {moment(newFeed.createdAt).fromNow()}
          </p>
        </div>
        <MoreHorizOutlinedIcon />
      </div> */}
            <div >
                <div className={classes.body__description} style={{ cursor: "pointer" }}>
                    <p style={{ color: "#333" }}>{newFeed.content}</p>
                </div>
                {newFeed.images.length ?
                    <div className={classes.body__image}>
                        {checkTypeFile(newFeed.images[0]) ? (
                            <img style={{ maxHeight: "60vh" }} src={`${process.env.REACT_APP_SERVER}${newFeed.images[0]}`} alt="post" />
                        ) : (
                                <ReactPlayer url={`${process.env.REACT_APP_SERVER}${newFeed.images[0]}`} controls={true} />
                            )}
                    </div> : <div></div>
                }
            </div>
            <div className={classes.post__footer}>
                <div>
                    <Reactions newFeed={newFeed} />
                    {/* {comment?.length ? <div style={{ cursor: "pointer" }}>
                        {comment?.length}&nbsp;comment
          </div> : <div></div>
                    } */}
                </div>

                {/* <div className={classes.footer__actions} >
          <div onClick={onClickLikePost} className={classes.action__icons} style={{ color: likedPost && "#2e81f4" }}>
            <ThumbUpAltOutlinedIcon />
            <h4>Like</h4>
          </div>
          <div onClick={collapseComment} className={classes.action__icons}>
            <ChatBubbleOutlineOutlinedIcon />
            <h4>Comment</h4>
          </div>
          <div className={classes.action__icons}>
            <ReplyOutlinedIcon style={{ transform: "scaleX(-1)" }} />
            <h4>Share</h4>
          </div>
        </div> */}
            </div>
            {/* {
        showComment && <Comment postId={newFeed?._id} listComment={comment} />
      }
      {onViewPost &&
        <ModalViewPost viewType={"single"} id={newFeed?._id} postItem={newFeed} />
      } */}
        </div>
    )
}
const SearchResult = () => {
    const classes = Style();

    const { result } = useSelector(state => state.search);
    return (
        <div style={{ width: "inherit" }}>
            <section className="section">
                <p style={{ fontSize: 20, fontWeight: "600" }}>Mọi người</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {result?.user?.map((e, key) => {
                        return <li key={key} className="list_user">
                            <a href={`http://localhost:3000/profile/${e._id}`} style={{ whiteSpace: "break-spaces" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Avatar style={{ height: 60, width: 60 }} src={`${process.env.REACT_APP_SERVER}${e.avatar}`} /> &nbsp;&nbsp;
                                    <div >
                                        <strong className="user_name">{e.surName + " " + e.firstName}</strong>
                                        <span className="is_fr">Bạn bè</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    })
                    }
                </ul>
            </section>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {result?.post?.map((item, key) => {
                    return <li key={key} className="section">
                        <Link to={`/post/${item?._id}`} style={{ whiteSpace: "break-spaces" }}>
                            <div className="header_user_post">
                                <Avatar style={{ height: 40, width: 40 }} src={`${process.env.REACT_APP_SERVER}${item.creator.avatar}`} /> &nbsp;&nbsp;
                                <div >
                                    <strong className="user_name">{item.creator.surName + " " + item.creator.firstName}</strong>
                                    <span className="is_fr">Bạn bè</span>
                                </div>
                            </div>
                            <div>
                                <span style={{ color: "#777", marginRight: 5 }}>{moment(item.createdAt).format("DD.MM.YYYY")}</span>
                                <PublicIcon style={{ top: 3, position: "relative", color: "#777" }} />
                                <PostSearched
                                    newFeed={item}
                                />
                            </div>
                        </Link>
                    </li>
                })
                }
            </ul>
        </div>
    )
}

const Search = () => {
    const classes = Style();
    return (
        <ThemeProvider>
            <Paper
                elevation={0}
                className={classes.root}
                style={{ backgroundColor: lightPrimary }}
            >

                <Grid className={classes.app}>
                    <Grid item container className={classes.app__header} >
                        {/* ----Header---- */}
                        <Header />
                    </Grid>
                    <Grid item container className={classes.app__body} >
                        {/* ----Body---- */}
                        <Hidden smDown>
                            <Grid item container className={classes.body__left} md={3}>
                                <Sidebar />
                            </Grid>
                        </Hidden>

                        <Hidden smDown>
                            <Grid item container className={classes.body__feed} md={6}>
                                <SearchResult />
                            </Grid>
                        </Hidden>

                        <Hidden smDown>
                            <Grid item container className={classes.body__right} md={3}>

                            </Grid>
                        </Hidden>
                    </Grid>
                </Grid>

            </Paper>
        </ThemeProvider>
    );
};

export default Search;