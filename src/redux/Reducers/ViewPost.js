import { GET_SINGLE_POST } from "../ActionTypes";
const ViewPost = ( state = {
    post : {},
}, action) => {
    switch (action.type) {
        case GET_SINGLE_POST:{
            return {
                ...state,
                post: action.payload,
            }
        }
        default: return {
            ...state,
        }

    }
}
export default ViewPost;
