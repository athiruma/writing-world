import { USER_LOGIN, USER_SIGNUP, LOGIN_ERROR, SIGNUP_ERROR } from "../ActionTypes";
import jwt_decode from "jwt-decode";
import { Logout} from "./User.Acounts";


export const  LoginSuccess = (token, dispatch) => {
    dispatch({type:USER_LOGIN, payload: token })

}

export const SignUpSuccess = ( token, dispatch ) =>{
    dispatch({type:USER_SIGNUP, payload: token });

}

export const SignupFailed = ( error, dispatch) => {
    dispatch({type:SIGNUP_ERROR, payload:error});
}

export const LoginFailed = (error, dispatch) =>{
    dispatch({type:LOGIN_ERROR, payload : error})
}



export const runLogoutTimer = ( dispatch, timer, history) => {
    setTimeout(()=>{
        dispatch(Logout(history));
    }, timer);
}

export const checkToken = (dispatch, history) =>{

    const auth_token = localStorage.getItem("Auth");

    if( !auth_token ){
        dispatch(Logout(history));
        return;
    }

    const decode_token = jwt_decode(auth_token);
    let todayDate = new Date();
    if(todayDate > decode_token.exp * 1000){
        dispatch(Logout(history));
        return;
    }
    dispatch({type:USER_LOGIN, payload: decode_token })
}
