import {Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button, Grid, TextField, Container, Typography} from '@material-ui/core';
import React from "react";
import { UserForgotPassword } from "../../redux/Action Creators/User.Acounts";
import {connect} from "react-redux";
 function ForgotDialog({handleClose, open, handleClickOpen,UserForgotPassword }) {
    const [email,setEmail] = React.useState("");
    const [send,setSend] = React.useState(false);
    const handleChange = (e) =>{
        setEmail(e.target.value)
    }
    const sendMail =async  ()=>{
         UserForgotPassword(email);
        setSend(true);
    }
  return (
    <Container maxWidth="xs">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {send && <Typography color="secondary">Mail has been Sent,Check you Inbox</Typography>}
                <br />
                <Grid item xs={12}>
                  <TextField  name="email" onChange={handleChange} value={email} variant="outlined" required fullWidth id="email" label="email" />
                </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={sendMail} color="primary" autoFocus>
            { !send && "Submit"}{send && "Resend"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

const mapDispatchToProps = dispatch => ({
    UserForgotPassword : (email) => { dispatch(UserForgotPassword(email))},
});
export default connect(null, mapDispatchToProps)(ForgotDialog);
