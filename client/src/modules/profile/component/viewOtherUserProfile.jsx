import React, { useEffect, useState } from 'react';
import { Grid, Hidden, Paper } from '@material-ui/core';
import Header from '../../header/Header';
import Form from '../../posts/form/Form';
import Posts from '../../posts/Posts';
import Background from './background';
import General from './general';
import Style from "./../../home/Style";
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { AuthActions } from '../../auth/redux/actions';
import { getStorage } from '../../../config';

const ViewOtherProfile = (props) => {
  const classes = Style();
  const viewType = "other-profile";

  const idParam = props.location?.pathname?.split("/").reverse()[0];
  console.log('profile id', idParam);
  const [profileId, setProfileId] = useState(idParam);

  const { otherUser } = props.auth;
  const userId = getStorage('userId');

  useEffect(() => {
    props.getProfileById(profileId);
  }, [profileId])

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
                  <Background profileId={profileId} type={viewType} />
                  <Grid item container className={classes.app__body}>
                    <Hidden smDown>
                      <Grid item container className={classes.general__info} md={3}>
                        <General profileId={profileId} type={viewType} />
                      </Grid>
                    </Hidden>
                    <Grid item container className={classes.body__feed} xs={12} sm={8} md={6}>
                      {profileId === userId ? <Grid item container className={classes.feed__form}>
                        {/* ----Upload Form---- */}
                        <Form />
                      </Grid> : null
                      }
                      <Grid item container className={classes.feed__posts}>
                        {/* ----Posts---- */}
                        <Posts profileId={profileId} type={viewType} />
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

const mapStateToProps = (state => {
  return state
});

const mapDispatchToProps = {
  getProfileById: AuthActions.getProfileById
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(ViewOtherProfile));
