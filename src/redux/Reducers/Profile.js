import { PROFILE_USER } from "../ActionTypes";
const Profile = ( state = {profile:{}}, action) => {
    switch (action.type) {
        case PROFILE_USER:{
            return{
                ...state,
                profile: action.payload,
            }
        }
        default: return{
            ...state
        }

    }
}
export default Profile;
