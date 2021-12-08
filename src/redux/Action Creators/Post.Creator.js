import { CREATE_POST, DELETE_POST} from "../ActionTypes";
import { baseUrl } from "../Shared/baseUrl";
import axios from "axios";

export const createPost = (title, body, image, history ) => async dispatch => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("Auth")}`;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        formData.append("image", image);
        const res = await axios.post(`${baseUrl}/createpost`, formData, {'Content-Type': 'multipart/form-data' });
        if( res.data){
        dispatch({type: CREATE_POST});
        history.push('/');}
    } catch (e) {

    }

}

export const DeletePost = (postId, username, history) => async dispatch  => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("Auth")}`;
        const res = await axios.delete(`${baseUrl}/deletepost/${postId}`);
        if( res.data){
            dispatch({type: DELETE_POST});
            history.push(`/profile/${username}`);
        }

    } catch (e) {

    }
}
