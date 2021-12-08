
import {Card, CardContent, CardActionArea, Grid, CardActions, CardHeader, Typography, CardMedia, IconButton, Avatar} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import React from 'react';
import ReactTimeAgo from 'react-time-ago'


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding:10
  },
image:{
    height:300,
}
});

const Post= ({username, createdAt, imageUrl  ,title, body, comments, postId, likes, postLiked, authorImage, FullPost, handlePostLike, showLess, userId}) => {
    const history = useHistory();
    const classes = useStyles();
    const showProfile = (id)=>{
        history.push(`/profile/${id}`);
    }
    const fullPost = (id) =>{
        if(FullPost)
            if(id !== null )
                history.push(`/post/${id}`)


    }
    const createMarkup = () => {

            if(showLess)
            return {__html: body.substr(0,30)};
             return {__html: body};
    }
    return(
        <Grid component={Card} style={{ width:"75%",display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardHeader
                 title={ username } onClick={()=>showProfile(username)}
                 avatar={
                     <Avatar aria-label="author" >
                        <img src={authorImage} height="50" loading="lazy" alt={username} width="50"/>
                    </Avatar>
                }
                style={{cursor:"pointer"}}
                subheader={createdAt && <ReactTimeAgo date={createdAt} locale="en-US"/>}
             />
            <CardActionArea onClick={()=>fullPost(postId)}>
                <CardMedia  className={classes.image} title={title} image={imageUrl} />
                <CardContent>
                    <Typography gutterBottom variant="h4" >{title}</Typography>
                   <Typography component="div" color="textSecondary" dangerouslySetInnerHTML={createMarkup()}/>
               </CardContent>
           </CardActionArea>
           {likes>=0 &&
           <CardActions>
               <IconButton  aria-label="add to favorites" onClick={handlePostLike} color={postLiked?"secondary":"inherit"}><FavoriteIcon /></IconButton>
               <Typography color="inherit"> {likes} Likes</Typography>
               <IconButton aria-label="Comments"><CommentIcon /></IconButton>
               <Typography color="inherit"> {comments} Comments</Typography>
          </CardActions>
           }
        </Grid>
    );
}

export default Post;
