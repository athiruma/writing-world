import { GET_ALL_POSTS } from "../ActionTypes";
const Posts = ( state = {
    posts : {},
}, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:{
            return {
                ...state,
                posts: action.payload,
            }
        }
        default: return {
            ...state,
        }

    }
}
export default Posts;
