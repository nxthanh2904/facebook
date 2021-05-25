import React, { useEffect, useState } from 'react';
import { Grid, Hidden, Paper } from '@material-ui/core';
import Header from '../../../header/Header';
import Background from '../background';
import Style from "./../../../home/Style";
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { AuthActions } from '../../../auth/redux/actions';
import { getStorage } from '../../../../config';
import ListAlbum from './listAlbum';
import { PostActions } from '../../../posts/redux/actions';

const ViewAlbums = (props) => {
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
  useEffect(() => {
    props.getNewFeed();
  }, [])

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
                    {/* <Grid item container className={classes.feed__posts}> */}
                    <ListAlbum />
                    {/* </Grid> */}
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
  getProfileById: AuthActions.getProfileById,
  getNewFeed: PostActions.getNewFeed
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(ViewAlbums));
