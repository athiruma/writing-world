import { USER_LOGIN, USER_SIGNUP, LOGIN_ERROR, SIGNUP_ERROR, USER_INITIATED, LOGOUT } from "../ActionTypes";
const Authentication = (state = {
    inititated : false,
    token: {},
    errors:"",
    authenticated:false,
}, action ) => {
    switch(action.type) {
        case USER_INITIATED:{
            return {
                ...state,
                inititated:true,
            }
        }
        case USER_LOGIN : {
            return {
                ...state,
                token : action.payload,
                authenticated : true,
                inititated : false,
            }
        }
        case LOGIN_ERROR:{
            return {
                ...state,
                errors:action.payload,
                inititated : false,
            }
        }
        case USER_SIGNUP:{
            return {
                ...state,
                token : action.payload,
                authenticated : true,
                inititated : false,
            }
        }
        case SIGNUP_ERROR:{
            return {
                ...state,
                errors:action.payload,
                inititated : false,
            }
        }
        case LOGOUT:{
            return{
                ...state,
                inititated : false,
                token: {},
                errors:"",
                authenticated:false,
            }
        }
        default: return{
            ...state,
        }
    }
}
export default Authentication;
