import {Table, TableRow, TableCell, Grid, Badge, Avatar, Fab, makeStyles, Button, TableBody, Typography, FormControlLabel, Switch } from "@material-ui/core";
import CameraEnhanceIcon from "@material-ui/icons/CameraEnhance";
import React from "react";
import Writer from "./Upgrade.to.writer";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));
const UserInfo = ({username, email, imageUrl, dob, type, posts, userEdit, ProfileUpdate}) => {
    const classes = useStyles();
    const [profile,setProfile] = React.useState();
    const [src,setSrc] = React.useState();
    const [upgrade, setUpgrade] = React.useState(false);
    //const USERNAME = props.match.params.username;
    const handleChange = (e)=>{
        setSrc(e.target.files[0]);
        setProfile(true);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        ProfileUpdate(src);
        setProfile(false);
    }

    return(

              <>    <Grid item style={{ position: 'sticky'}}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            userEdit && <label htmlFor="photo">
                                <input type="file" onChange={handleChange} style={{display:'none'}} name="photo" id="photo"/>
                                <Fab color="secondary" size="large" component="span" aria-label="update" >
                                    <CameraEnhanceIcon />
                                </Fab>
                            </label>
                        }
                    >
                        <Avatar alt={username} className={classes.large} src={src?URL.createObjectURL(src):imageUrl}/>
                      </Badge>
                     <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {profile && <Button type="submit" variant="contained">
                              upload
                          </Button>}

                    </form>
                        <Table border="0">
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{borderBottom: "none"}} colSpan="2"><Typography gutterBottom variant="h4" >{username}</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{borderBottom: "none",fontWeight:'bold'}}>UserType</TableCell>
                                    <TableCell style={{borderBottom: "none"}}>
                                        {type === 1 ?"WRITER":"READER"}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{borderBottom: "none",fontWeight:'bold'}}>Email</TableCell>
                                    <TableCell style={{borderBottom: "none"}}>
                                        {email}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{borderBottom: "none",fontWeight:'bold'}}>DateOfBirth</TableCell>
                                    <TableCell style={{borderBottom: "none"}}>
                                        {dob}
                                    </TableCell>
                                </TableRow>
                                { type === 1 && <><TableRow>
                                    <TableCell style={{borderBottom: "none",fontWeight:'bold'}}>Posts</TableCell>
                                    <TableCell style={{borderBottom: "none"}}>
                                        {posts}
                                    </TableCell>

                                </TableRow>
                                </>
                            }
                            {type===0 && <><TableRow>
                                                <TableCell colSpan="2" style={{borderBottom: "none"}}><FormControlLabel
                                                control={<Switch  checked={upgrade} onChange={()=>setUpgrade(!upgrade)}  />}
                                                label="Upgrade to Writer"
                                                /></TableCell>
                                        </TableRow>
                             { upgrade  && <TableRow>
                                  <TableCell colSpan="2" style={{borderBottom: "none"}}>
                                  <Writer /></TableCell>

                          </TableRow>}</>}
                            </TableBody>

                        </Table></Grid>
              </>
    );
}
export default UserInfo;
