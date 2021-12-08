import { COMMENT_POST, DELETE_COMMENT } from "../ActionTypes";

const Comments = ( state = {comment:{}}, action) => {
    switch (action.type) {
        case COMMENT_POST:{
            return {
                ...state,
                comment: action.payload
            }
        }
        case DELETE_COMMENT:{
            return {
                ...state,
            }
        }
        default: return{...state}

    }
}
export default Comments;
