import React, { useEffect , useState} from 'react';

import { connect} from "react-redux";
import {Card ,Grid, Button, TextField} from "@material-ui/core";
import DisplayComments from "./display.comments";
import CircularProgress from '@material-ui/core/CircularProgress';

import Post from "./Posts";

import { GetSpecificPost } from "../../redux/Action Creators/Posts";
import { LikePost, UnLike} from "../../redux/Action Creators/Like.Actions";
import { PostComment, DeleteComment  } from "../../redux/Action Creators/Comment.Action";

const ViewPost = ( { FullPost, match, post, Profile, LikePost, UnLike, like, comment, PostComment, DeleteComment}) =>{
    const POSTID = match.params.postId;
    useEffect(()=>{
        FullPost(POSTID);
        // eslint-disable-next-line
    },[POSTID]);
    const [postComments, setPostComments] = useState([]);
    const [postLikes, setPostLikes] = useState([]);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [liked, setLiked] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(()=>{
        try{
            if(post.post){
                setLikes(post.post.data.likes);
                setComments(post.post.data.comments)
                setPostComments(post.post.comments);
                setPostLikes(post.post.likes);
            }
        }catch(e){
        }
    },[post.post]);

    useEffect(()=>{
        try{
            if(comment.comment){
                setPostComments([comment.comment, ...postComments ])
            }
        }catch(e){
        }
        // eslint-disable-next-line
    },[comment.comment]);
    //
    useEffect(()=>{
        try {
            if(Profile.profile){
                setUsername(Profile.profile.data.username);
            }
        } catch (e) {

        }
    },[Profile.profile])
    //
    useEffect(()=>{
        getPostLike(username);
    })
    //
    const getPostLike = (user) =>{
        try{
            const res = postLikes.filter(postLike => postLike.username === username ).length > 0 ? true : false;
            setLiked(res);
        }catch(e){
            setLiked(false);
        }
    }

    const [myComment, setMyComment] = React.useState("");

    const handlePostComment = () => {
        setComments(comments + 1);
        PostComment(myComment, POSTID);
        setMyComment("");
    }
    const handleDeleteComment = (myComId) => {
        setPostComments(postComments.filter(postComment => postComment.commentId !== myComId));
        setComments(comments - 1);
         DeleteComment(POSTID, myComId);
    }

    const handlePostLike = () => {
        if(liked){

            setLikes(likes-1);
            UnLike(POSTID);
            setPostLikes([...postLikes.filter(postLike => postLike.username !== username )]);
            setLiked(false);
            console.log("Delete");
        }
        else{
            setLikes(likes+1);
            LikePost(POSTID);
            const LIKED = {"postId":POSTID,username};
            setPostLikes([...postLikes, LIKED])
            setLiked(true);
            console.log("Add");
        }
    }

    const displayComments =()=>{
     return postComments.map((postComment) => {
         return (
             <Grid item key={postComment.commentId}>
                  <DisplayComments
                      commentId={postComment.commentId} createdAt={postComment.createdAt}
                      imageUrl={postComment.imageUrl} username={postComment.username}
                      postId={postComment.postId}  comment={postComment.comment} key={postComment.commentId}
                      handleDeleteComment={handleDeleteComment}
                      deltePerson={username}
                      postAuthor={post.post.data.username}

                      FullPost={false} showLess={false}/>
              </Grid>
          )
      })
   }

    return(
        <Grid container component={Card}>
            { !post.post.data && <CircularProgress />}
            {post.post.data &&
                 <>
                        <Post username={post.post.data.username}
                        createdAt={post.post.data.createdAt}
                        authorImage={post.post.data.authorImage}
                        imageUrl={post.post.data.postImage}
                        title={post.post.data.title}
                        body={post.post.data.body}
                        likes={likes}
                        comments={comments}
                        postLiked={liked}
                        userId={post.post.data.userId}
                        handlePostLike={handlePostLike}
                         />
                     <Grid container spacing={3} style={{marginTop:'10'}}>
                    <Grid item xs={6} >
                        <TextField name="comment" value={myComment} onChange={(e)=>setMyComment(e.target.value)} fullWidth variant="outlined" id="comment" label="Comment"/>
                    </Grid>
                    <Grid item xs={4}>
                        <Button size="large" variant="contained" color="secondary" onClick={handlePostComment}>ADD</Button>
                    </Grid>

                     <Grid item xs={12}>
                         {displayComments()}
                     </Grid>
            </Grid>
                </>


         }

        </Grid>
    )
}

const mapStateToProps = state => ({
    post : state.ViewPost,
    like : state.Like,
    comment : state.Comments,
    Profile : state.LoginProfile,
});
const mapDispatchToProps = dispatch => ({
    FullPost : (postId) => dispatch(GetSpecificPost(postId)),
    LikePost : (postId)=> dispatch(LikePost(postId)),
    UnLike : (postId) => dispatch(UnLike((postId))),
    PostComment : (comment ,postId)=> dispatch(PostComment(comment ,postId)),
    DeleteComment : (postId, commentId) => dispatch(DeleteComment(postId, commentId)),
})
export default connect(mapStateToProps, mapDispatchToProps )(ViewPost);
