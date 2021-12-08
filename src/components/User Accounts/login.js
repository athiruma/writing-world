import { Grid, TextField, Button, Container, Avatar, Typography } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { green } from '@material-ui/core/colors';
import ForgotDialog from "./forgot.password";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

import {Link , useHistory} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";
import { UserLogin } from "../../redux/Action Creators/User.Acounts"

//******************8
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
}));
//****************

const Login = ({credentials, UserLogin}) => {
    const classes = useStyles();

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        UserLogin( e.target.elements.email.value, e.target.elements.password.value, history);
    }

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return(
        <Container className={classes.root}  maxWidth="xs">
            <Avatar className={classes.avatar}>
                <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            {credentials.errors && <Typography variant="h6" style={{color:'red'}} >{credentials.errors}</Typography>}
            <form  onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField  fullWidth type="text" variant="outlined"
                         label="Email" name="email" />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField  fullWidth variant="outlined" type="password" label="password" name="password"
                         />

                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.wrapper}>
                            <Button type="submit" color="primary" disabled={credentials.inititated}  fullWidth variant="contained"  size="large">LogIn</Button>
                            {credentials.inititated && <CircularProgress size={24} className={classes.buttonProgress} />}

                        </div>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Typography onClick={handleClickOpen}  variant="body2">
                          Forgot Password
                        </Typography>
                        {open && < ForgotDialog handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} />}
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-start">
                      <Grid item>
                          <Link to="/signup">Don't have an Account click here
                        </Link>
                      </Grid>
                    </Grid>

            </Grid>
            </form>
        </Container>

    )
}

const mapStateToProps = state => ({
    credentials : state.credentials,
})
const mapDispatchToProps = dispatch => ({
    UserLogin : (email, password, history) => dispatch(UserLogin(email, password, history)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
