import { LIKE_POST, UN_LIKE_POST } from "../ActionTypes";
import { baseUrl } from "../Shared/baseUrl";
import axios from "axios";

export const LikePost = (postId ) => async dispatch => {
    try {
        const token = localStorage.getItem("Auth");
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.post(`${baseUrl}/like/${postId}`);
         if(res.data.likes)
            dispatch({type:LIKE_POST,payload:res.data.likes});
    } catch (e) {
            console.log(e);
    }
}

export const UnLike = (postId) => async(dispatch) => {
    const token = localStorage.getItem("Auth");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.delete(`${baseUrl}/like/${postId}`);
    if(res.data.likes)
        dispatch({type:UN_LIKE_POST,payload:res.data.likes});
}
