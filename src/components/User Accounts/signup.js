import React from 'react';
import {Container,TextField,Grid,Avatar,Button,Typography,Select,InputLabel,FormControl, Link} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";

 import { UserSignUp } from "../../redux/Action Creators/User.Acounts";

const useStyles = makeStyles((theme) => ({
  paper: {
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

 function SignUp({credentials, userSignUp}) {

     const { register, handleSubmit,  formState: { errors }  } = useForm();

      const classes = useStyles();
      const history = useHistory();

      const onSubmit = (data)=>{

          data.type = parseInt(data.type);
          console.log(data);
        userSignUp(data, history);
      }

  return (
    <Container component="main" maxWidth="xs">

               <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign up
                    </Typography>
                    {credentials.errors && <Typography variant="h6" style={{color:'red'}} >{credentials.errors}</Typography>}
                <form onSubmit={handleSubmit(onSubmit)} >
                      <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField error={errors.username}  name="username" variant="outlined" required {...register("username", {required:true})}  fullWidth id="username" label="Username" autoFocus />

                            </Grid>
                            <Grid item xs={12}>
                              <TextField error={errors.email} variant="outlined" required fullWidth id="email" {...register("email", {required:true})} type="email" label="Email Address" name="email" />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField error={errors.password} variant="outlined" required fullWidth name="password" {...register("password", {required:true})} label="Password" type="password" id="password" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField error={errors.dob} fullWidth variant="outlined" label="Date Of Birth" id="date" {...register("dob", {required:true})}  name="dob"  type="date" InputLabelProps={{
                                  shrink: true,
                                }}/>
                           </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
                            <Select error={errors.type} {...register("type", {required:true})} native  label="Type" name="type" id="outlined-age-native-simple"  required>
                                        <option selected   disabled >--Select--</option>
                                        <option value={1}>Writer</option>
                                        <option value={0}>Reader</option>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <div className={classes.wrapper}>
                                    <Button type="submit" color="primary" disabled={credentials.inititated}  fullWidth variant="contained"  size="large">LogIn</Button>
                                    {credentials.inititated && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </div>
                            </Grid>
                       </Grid>
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <p  variant="body2">
                            <Link to="/login">Already have an account? Sign in</Link>
                        </p>
                        </Grid>
                      </Grid>
                </form>

               </div>
    </Container>
  );
}
const mapStateToProps = state => ({
    credentials : state.credentials,
})
const mapDispatchToProps = (dispatch) => ({
    userSignUp :  (data, history) =>{dispatch(UserSignUp(data, history))},
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
