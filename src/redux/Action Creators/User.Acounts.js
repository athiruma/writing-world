import axios from "axios";
import  {baseUrl}  from "../Shared/baseUrl";
import jwt_decode from "jwt-decode";
import { LoginSuccess, SignUpSuccess, LoginFailed, SignupFailed, runLogoutTimer } from "./User";
import {USER_INITIATED, LOGOUT} from "../ActionTypes";
import {LoginUserProfile} from "./Profile";
import { GetAllPosts } from "./Posts";

/*
    **************************
*/

export const UserLogin = ( email, password, history ) => async dispatch => {

    try {
        dispatch({type:USER_INITIATED});
        
        const response = await axios.post(`${baseUrl}/login`, {
            email, password
        });
        
        if( response.data.token) {
            localStorage.setItem("Auth",response.data.token);
            const token = jwt_decode(response.data.token);
            if(!token.email_verified){
                alert("We send an verification email, verify");
            }
            LoginSuccess(token, dispatch);

            dispatch(GetAllPosts());
            dispatch(LoginUserProfile());

            runLogoutTimer(dispatch, token.exp, history);
            history.push("/");
        }else{
            LoginFailed(response.data.error, dispatch);
        }

    } catch (e) {
        console.log(e);
    }
}

export const UserSignUp = ({ email, password, username, type, dob}, history) => async dispatch => {
    console.log(email, password, username, type, dob);
    try {
        dispatch({type:USER_INITIATED});

        const response = await axios.post(`${baseUrl}/signup`, {
            email, password, username, type, dob
        });
        if( response.data.token) {
            localStorage.setItem("Auth",response.data.token);
            const token = jwt_decode(response.data.token);
            SignUpSuccess(token, dispatch);
            runLogoutTimer(dispatch, token.exp );
            history.push("/");
        }else{
            SignupFailed(response.data.error, dispatch, history);
        }

    } catch (e) {
        console.log(e);
    }
}

export const UserForgotPassword = (email) => dispatch => {
     axios.post(`${baseUrl}/forgotpassword`, { email } );
}

export const Logout = (history) => dispatch => {
    localStorage.removeItem("Auth");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                localStorage.removeItem("authentication");
    history.push("/");
    dispatch({type:LOGOUT});
}
