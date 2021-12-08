import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid} from '@material-ui/core';
import { connect} from "react-redux";
import UserInfo from "./UserInfo";
import UserPost from "./UserPosts";
import {UserPofile, ProfileUpdate} from "../../redux/Action Creators/Profile";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));


 function Profile({profile, UserPofile, match, credentials, ProfileUpdate}){

    const USERNAME = match.params.username;
    const classes = useStyles();
    const [show, dataShow] = React.useState(false);
    const [postCount ,setPostCount] = React.useState(0);
    React.useEffect(()=>{
        UserPofile(USERNAME);
        setTimeout(()=>{dataShow(true)}, 1000)
        // eslint-disable-next-line
    },[USERNAME]);

    //const USERNAME = props.match.params.username;
    return(

        <div className={classes.root}>
            {!show && <CircularProgress />}
            <Grid container spacing={4}>
                {show && profile.profile.data &&
                    <>
                        <Grid item xs={12} md={4} >

                            <UserInfo username={profile.profile.data.username}
                                imageUrl={profile.profile.data.imageUrl}
                                type={profile.profile.data.type}
                                dob={profile.profile.data.dob}
                                email={profile.profile.data.email}
                                posts={postCount || profile.profile.data.posts}
                                userEdit={profile.profile.data.user_id === credentials.token.user_id}
                                ProfileUpdate={ProfileUpdate}

                                />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <UserPost setPostCount={setPostCount} count={profile.profile.data.posts} myposts={profile.profile.myposts} />
                        </Grid>
                    </>
                }

            </Grid>
        </div>

    );
}
const mapStateToProps = state => ({
    profile : state.Profile,
    credentials : state.credentials
});

const mapDispatchToProps = dispatch => ({
    UserPofile : username => dispatch(UserPofile(username)),
    ProfileUpdate : photo => dispatch(ProfileUpdate(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
/*
{ !show && <CircularProgress />}

*/
