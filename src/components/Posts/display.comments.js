import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {   Divider, Grid, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Typography  } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {useHistory} from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
}));

const DisplayComments = ({commentId, comment, postId, username, imageUrl, createdAt, handleDeleteComment, deltePerson ,postAuthor }) => {

  const classes = useStyles();
  const history = useHistory();
    return (
        <div  className={classes.root}>

            <div className={classes.section1}>
              <Grid container alignItems="center">
                <Grid item xs>
                <ListItem  onClick={()=>history.push(`/profile/${username}`)} style={{cursor:'pointer'}}>
                    <ListItemAvatar>
                      <Avatar src={imageUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={username} secondary={createdAt && <ReactTimeAgo date={createdAt} locale="en-US"/>} />
              </ListItem>
                </Grid>
                <Grid item>
                    {(deltePerson=== username || postAuthor === deltePerson ) && <IconButton component={DeleteIcon}  onClick={()=>handleDeleteComment(commentId)}/>}
                </Grid>
              </Grid>
              <Typography  color="textSecondary" variant="body2">{comment}</Typography>
              </div>
            <Divider variant="middle" />
        </div>
    )
}
export default DisplayComments;
