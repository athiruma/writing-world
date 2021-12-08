import {GET_ALL_POSTS, GET_SINGLE_POST} from "../ActionTypes";
import { baseUrl } from "../Shared/baseUrl";
import axios from "axios";
export const GetAllPosts = () => async dispatch => {
    try {
        const token = localStorage.getItem("Auth");
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${baseUrl}/posts`);
        if(response.data.posts)
            dispatch({type:GET_ALL_POSTS,payload:response.data.posts});
        else{

        }
    } catch (e) {
        console.log(e);
    }
}

export const GetSpecificPost = (postId) => async dispatch => {
    try {
        const token = localStorage.getItem("Auth");
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${baseUrl}/post/${postId}`);
        if(response.data.data)
            dispatch({type:GET_SINGLE_POST,payload:response.data.data});
    } catch (e) {

    }
}
