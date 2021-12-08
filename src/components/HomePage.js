import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { GetAllPosts } from "../redux/Action Creators/Posts";
import Post from "./Posts/Posts";
import CircularProgress from '@material-ui/core/CircularProgress';


const Home = ({authenticated, Posts, GetAllPosts}) =>{
    const [data, setData] = useState({});
    useEffect(()=>{
        if(authenticated)
            GetAllPosts();
        // eslint-disable-next-line
    },[]);

    useEffect(()=>{
        setData(Posts.posts)
    },[Posts.posts]);

    const showPosts = () => {
        try {
            if(data.length > 0 )
            return( data.map(post => <Post key={post.postId} username={post.username} createdAt={post.createdAt} imageUrl={post.postImage}
                title={post.title} body={post.body} comments={post.comments} FullPost={true}
                postId={post.postId} postLike={post.postLikes} authorImage={post.authorImage} showLess={true}
                userId = {post.userId}
                />)
         )
        } catch (e) {
            return <div><CircularProgress /></div>
        }
    }

    return(
        <div>

            { !authenticated && <img src="/assets/main.png" alt="HomePage"/>}
            {authenticated && data && <div>{showPosts()}</div>}
        </div>
    )
}
const mapStateToProps = state => ({
    Posts: state.Posts,
})
const mapDispatchToProps = dispatch => ({
    GetAllPosts : () => dispatch(GetAllPosts()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
