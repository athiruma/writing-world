import React, {Suspense, useEffect}  from "react";
import {connect, useDispatch} from "react-redux";
// import {UserLogin} from "./redux/Action Creators/User.Acounts";
// import { GetAllPosts, GetSpecificPost } from "./redux/Action Creators/Posts";
import {checkToken} from "./redux/Action Creators/User";
// import {  LikePost, UnLike } from "./redux/Action Creators/Like.Actions";
// import { PostComment, DeleteComment} from "./redux/Action Creators/Comment.Action";
import AuthRoute from "./components/Routes/AuthRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Switch, Route, useHistory} from "react-router-dom";
import {Container} from "@material-ui/core";
import {Logout} from "./redux/Action Creators/User.Acounts";
import {LoginUserProfile} from "./redux/Action Creators/Profile";
import jwt_decode from "jwt-decode";


import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'



//***************************
import Navbar from "./components/Navbar";
import Login from "./components/User Accounts/login";
import SignUp from "./components/User Accounts/signup";
import  CreatePost from "./components/Create Post/create.post";
const Home = React.lazy(()=>import ("./components/HomePage"));

const Profile = React.lazy(()=>import("./components/Profile/profile.show"));
const ViewPost = React.lazy(()=>import( "./components/Posts/FullPost"));
//**************************

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
let privateAuth;
const App = ({ UserLogin, credentials, Logout, LoginProfile, LoginUserProfile }) => {

    const [auth, setAuth] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [type, setType] = React.useState(-1);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        const auth_token = localStorage.getItem("Auth");

        if( auth_token ){
            privateAuth = true;
            const decode_token = jwt_decode(auth_token);
            let todayDate = new Date();
            if(todayDate > decode_token.exp * 1000){
                Logout(history);
            }
        }else{
            privateAuth = false;
        }
    });

    useEffect(()=>{
        checkToken(dispatch, history)
        // eslint-disable-next-line
    },[]);
    ////*******************
    useEffect(()=>{
        if(credentials.authenticated)
            LoginUserProfile();
            // eslint-disable-next-line
    },[credentials.authenticated]);

    useEffect(()=>{
        localStorage.setItem("privateAuth",credentials.authenticated );
        setAuth(credentials.authenticated);
    },[credentials]);




    useEffect(()=>{
        if(LoginProfile.profile.data){
            setImageUrl(LoginProfile.profile.data.imageUrl);
            setUsername(LoginProfile.profile.data.username);
            setType(LoginProfile.profile.data.type);
        }
    },[LoginProfile.profile])


    const routes =( <Switch>
        <Route  exact   path="/" ><Home authenticated={auth}/></Route>
        <AuthRoute component={Login} authenticated={auth} path="/login"/>
        <AuthRoute component={SignUp} authenticated={auth} path="/signup" />
        <ProtectedRoute component={CreatePost} authenticated={privateAuth} path="/createpost"/>
        <ProtectedRoute component={Profile} authenticated={privateAuth} path="/profile/:username"/>
        <ProtectedRoute component={ViewPost} authenticated={privateAuth} path="/post/:postId" />

    </Switch>);

    return(
        <div>
            <Suspense fallback={<CircularProgress />}>
                <Navbar authenticated={auth} Logout={Logout} imageUrl={imageUrl} username={username}
                    type={type} />
                <Container style={{marginTop:'80px'}}>
                        {routes}
                </Container>
            </Suspense>


         </div>
    );
}
const mapStateToProps = state => ({
    credentials : state.credentials,
    LoginProfile : state.LoginProfile,
})
const mapDispatchToProps = dispatch => ({
    Logout : (history) => dispatch(Logout(history)),
    LoginUserProfile : () => dispatch(LoginUserProfile()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
