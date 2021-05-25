import { Grid, Hidden, Paper } from '@material-ui/core';
import React from 'react';
import Header from '../../header/Header';
import Form from '../../posts/form/Form';
import Posts from '../../posts/Posts';
import Background from './background';
import General from './general';
import Style from "./../../home/Style";
import FlipMove from 'react-flip-move';

const Profile = () => {
    const classes = Style();
    return (
        <>
            <div style={{ backgroundColor: "#F0F2F5" }}>
                <Paper
                    elevation={0}
                    className={classes.root}
                >
                    <Grid className={classes.app}>
                        <Grid item container className={classes.app__header}>
                            {/* ----Header---- */}
                            <Header />
                        </Grid>
                        <div className={classes.content}>
                            <FlipMove style={{ width: "100%" }}>
                                <React.Fragment>
                                    <Background />
                                    <Grid item container className={classes.app__body}>
                                        <Hidden smDown>
                                            <Grid item container className={classes.general__info} md={3}>
                                                <General />
                                            </Grid>
                                        </Hidden>
                                        <Grid item container className={classes.body__feed} xs={12} sm={8} md={6}>
                                            <Grid item container className={classes.feed__form}>
                                                {/* ----Upload Form---- */}
                                                <Form />
                                            </Grid>
                                            <Grid item container className={classes.feed__posts}>
                                                {/* ----Posts---- */}
                                                <Posts type={"profile"} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            </FlipMove>
                        </div>
                    </Grid>
                </Paper>
            </div>
        </>
    );
};

export default Profile;