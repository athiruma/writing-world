import { LOGIN_PROFILE, PROFILE_USER, PROFILE_UPDATE, USER_UPGRADED, UPGRADE_FAILED } from "../ActionTypes";
import { baseUrl } from "../Shared/baseUrl";
import axios from "axios";
//*********************

export const LoginUserProfile = () => async dispatch => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("Auth")}`;
        const res = await axios.get(`${baseUrl}/profile`);
        if( !res.data.error){
            let profile ={};
            profile = res.data;
            dispatch({type:LOGIN_PROFILE,payload:profile});
        }

    } catch (e) {

    }
}

export const UserPofile = ( username ) =>async  dispatch => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("Auth")}`;
        const res = await axios.get(`${baseUrl}/profile/${username}`);
        let profile = {};
        profile.data = res.data.data;
        const data = await axios.get(`${baseUrl}/myposts/${username}`);
        if(! data.data.error ){
            profile.myposts = data.data.posts;
            dispatch({type:PROFILE_USER,payload:profile});
        }

    } catch (e) {

    }
}
export const ProfileUpdate = (photo ) => async dispatch => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("Auth")}`;
        const formData = new FormData();
        formData.append("photo", photo)
         const res = await axios.put(`${baseUrl}/UpdateProfile/`,formData,{'Content-Type': 'multipart/form-data' });
         if( res.data.Success ){
             dispatch(LoginUserProfile())
         }
        dispatch({type:PROFILE_UPDATE})

    } catch (e) {

    }

}

export const updateUser = () => async dispatch => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("Auth")}`;
         const res = await axios.put(`${baseUrl}/updateUser`);
         if( res.data.success){
             dispatch({type:USER_UPGRADED});
             window.location.reload();
         }
         else{
             dispatch({type:UPGRADE_FAILED});
         }
    } catch (e) {

    }
}
