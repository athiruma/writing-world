import {Container, ImageList, ImageListItem, ImageListItemBar, IconButton  } from "@material-ui/core"
import { useState, useEffect} from "react";
import {useHistory } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import {DeletePost} from "../../redux/Action Creators/Post.Creator";
import {connect} from "react-redux";
const UserPosts = ({myposts, DeletePost, Profile, setPostCount, count}) => {
    const history = useHistory();
    const [posts, setMyPosts] = useState([]);
    useEffect(()=>{
        setMyPosts(myposts);
    },[myposts]);
    const handleDelete = (id) => {
        if(window.confirm("Are You Sure To Delete, Once Delete Can't restore")){
            DeletePost(id);
            setMyPosts(posts.filter(post => post.postId !== id));
            setPostCount(count- 1);
        }
    }
    return(
        <Container maxWidth="md">
          <ImageList gap={1}>

            {posts.map((item) => (
              <ImageListItem key={item.postId} >
                <img src={item.postImage} alt={item.title} onClick={()=>history.push(`/post/${item.postId}`)}/>
                    <ImageListItemBar
                          title={item.title}
                          position="bottom"
                          actionIcon={
                            Profile.profile.data.username === item.username && <><IconButton aria-label={`star ${item.title}`} style={{color: 'rgba(255, 255, 255, 0.54)',}}>
                              <DeleteIcon color="secondary" onClick={()=>handleDelete(item.postId, Profile.profile.data.username,  history)} />
                            </IconButton></>
                          }
                          actionPosition="right"
                        />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
    )
}
const mapStateToProps = state => ({
    Profile : state.LoginProfile,
})
const mapDispatchToProps = dispatch => ({
    DeletePost : (postId) => dispatch(DeletePost(postId)),
})
export default connect(mapStateToProps, mapDispatchToProps )(UserPosts);
