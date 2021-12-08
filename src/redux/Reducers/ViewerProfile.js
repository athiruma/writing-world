import { LOGIN_PROFILE, PROFILE_UPDATE, UPGRADE_FAILED, USER_UPGRADED } from "../ActionTypes";
const ViewProfile = (state={
    profile:{},
    updated:false,
    upgraded: false,
}, action) => {
    switch (action.type) {
        case LOGIN_PROFILE:{
            return{
                ...state,
                profile:action.payload,
            }
        }
        case PROFILE_UPDATE:
        {
            return{
                ...state,
                updated:true,
            }
        }
        case USER_UPGRADED :{
            return{
                ...state,
                upgraded:true,
            }
        }
        case UPGRADE_FAILED:{
            return{
                ...state,
                upgraded:false,
            }
        }
        default:return{
            ...state,

        }

    }
}
export default ViewProfile;
