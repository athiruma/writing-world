import React from "react";
import {TextField, Button} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {updateUser} from "../../redux/Action Creators/Profile";
import {connect} from "react-redux";
const Writer = ({updateUser}) => {
    const [yes, setYes] = React.useState("");
    const handleChange = () =>{
        if( yes === "Yes"){
            updateUser();
        }
        else{
            alert("Only Type Yes")
        }
    }
    return(
        <div style={{display:'flex'}}>
            <TextField type="text" onChange={(e)=>setYes(e.target.value)} fullWidth placeholder="type Yes To Become Writer" name="upgrade" />
            <Button onClick={handleChange}><CheckCircleIcon style={{color:'green'}}/></Button>
        </div>
    );
}
const mapDispatchToProps = dispatch => ({
    updateUser: ()=>dispatch(updateUser()),
})
export default connect(null, mapDispatchToProps )(Writer);
