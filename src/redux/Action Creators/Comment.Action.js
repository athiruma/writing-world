import { COMMENT_POST, DELETE_COMMENT } from "../ActionTypes";
import { baseUrl } from "../Shared/baseUrl";
import axios from "axios";

export const PostComment = (comment ,postId) => async dispatch => {
    const token = localStorage.getItem("Auth");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.put(`${baseUrl}/post/${postId}/comment`,{comment});
    if(res.data.newComment)
        dispatch({type:COMMENT_POST, payload:res.data.newComment})
}


export const DeleteComment = (postId, commentId) => async dispatch => {
    const token = localStorage.getItem("Auth");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios.delete(`${baseUrl}/post/${postId}/comment/${commentId}`);
    dispatch({type:DELETE_COMMENT})
}
