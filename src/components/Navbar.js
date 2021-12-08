import {AppBar, Toolbar, IconButton, Avatar, Typography,
     ClickAwayListener, Paper, Popper, MenuItem, MenuList, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {useState, useRef} from "react";

const useStyles = makeStyles(theme=>({
    root:{
        flexGrow:1,
        display:'flex'
    },
    title:{
        flexGrow:1,
        color:'white',
        textDecoration:'none'

    },
    button:{
        marginRight:theme.spacing(4)
    }
}));

const Navbar = ({authenticated, Logout, imageUrl, username, type}) => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
     };
      const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
              return;
            }
            setOpen(false);
        };
    function handleListKeyDown(event) {
            if (event.key === 'Tab') {
              event.preventDefault();
              setOpen(false);
            }
        }

    return(
        <AppBar className={classes.root}>
            <Toolbar>
                <IconButton>
                    <Avatar component={Link} to="/" src="/assets/logo.png"  />
                </IconButton>
                <Typography  className={classes.title} variant="h6" component={Link}
                 to="/">WRITING WORLD</Typography>
             <p></p>
                { authenticated && <> { type===1 &&<Button variant="contained"  component={Link} to="/createpost" color="secondary" className={classes.button} startIcon={<CloudUploadIcon />}>CreatePost</Button>}
            <Avatar ref={anchorRef} src={imageUrl} alt={"My"}  aria-haspopup="true" onClick={handleToggle}/>
                     <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                     <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleClose}>
                                <Button component={Link} to={`/profile/${username}`}  className={classes.button}>Profile</Button>
                            </MenuItem>
                        <MenuItem onClick={handleClose}><Button onClick={()=>Logout(history)} className={classes.button} >LogOut</Button></MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                  </Popper></>}

                 { !authenticated &&  <><Button variant="contained" className={classes.button} component={Link}  to="/login">Login</Button>
              <Button variant="contained" className={classes.button} component={Link}  to="/signup"  style={{background:'#ffffaa'}}>SignUp</Button></>}
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
