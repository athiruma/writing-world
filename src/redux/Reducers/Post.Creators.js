import { CREATE_POST, DELETE_POST} from "../ActionTypes";
const PostCreate = (state={
    success:false,delete:false
}, action) => {
    switch (action.type) {
        case CREATE_POST:{
            return{
                ...state,success:true,
            }
        }
        case DELETE_POST:{
            return{
                ...state,delete:true,
            }
        }
        default: return{...state}

    }
}
export default PostCreate;
