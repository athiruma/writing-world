import { LIKE_POST, UN_LIKE_POST } from "../ActionTypes";
const Like = ( state = {
    likes:0,
}, action) => {
    switch(action.types){
        case LIKE_POST:{
            return {
                ...state,
                likes:action.payload,
            }
        }
        case UN_LIKE_POST:{
            return {
                ...state,
                likes:action.payload,
            }
        }
        default : return {
            ...state,
        }
    }
}
export default Like;
