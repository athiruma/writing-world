import { Grid, TextField, Card, CardActionArea, CardContent, CardMedia, Button, Typography  } from "@material-ui/core";
import React,{useState} from "react";
import TextEditor from "./TextEditor";
import {Prompt} from "react-router-dom";
import { connect } from "react-redux";
import {useHistory} from "react-router-dom";
import {createPost} from "../../redux/Action Creators/Post.Creator";

 function CreatePost({ createPost }){
    const [title,setTitle] = useState();
    const [image,setImage] = useState("");
    const [body, setBody ] = useState("");
    let [isBlocking, setIsBlocking] = useState(false);
    const history = useHistory();
    const createMarkup = () => {
      return {__html: body};
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if( body === "" ){
            alert("Enter body of Post in Editor");
        }else{
        createPost(title, body, image, history);
        setIsBlocking(false);}
    }

    return(
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <form onSubmit={handleSubmit}>
                    <Prompt
                        when={isBlocking}
                        message={ () =>
                          `Are you sure you want leave,All data you may be lost`
                        }
                      />
                    <Grid container spacing={2}>
                            <Grid item xs={12} component={TextField} onChange={(e)=>{
                                    setTitle(e.target.value);
                                    setIsBlocking(e.target.value.length > 0);}
                                } type="text"  required fullWidth name="title" label="Title"  variant="outlined" />
                            <Grid item xs={12} component={TextField} variant="outlined" onChange={
                                    (e)=>{setImage(e.target.files[0]);
                                        setIsBlocking(true);}
                                    } fullWidth required name="photo" label="Post Image" type="file" />
                            <Grid item xs={12}>
                                <TextEditor  setBody={setBody}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" style={{backgroundColor:'#00b9fc',fontWeight:'bold'}} size="large" variant="contained">Publish</Button>
                            </Grid>
                    </Grid>
                </form>
            </Grid>


            <Grid item xs={6} >

                { ( title || image || body) && <Grid component={Card} style={{ width:"100%",display: 'flex', flexDirection: 'column'}}>
                    <CardActionArea >
                        { image && <CardMedia component="img" alt="post Image" src={URL.createObjectURL(image)} />}
                        <CardContent>
                            <Typography variant="h4" >{title}</Typography>
                           <Typography component="div" color="textSecondary" dangerouslySetInnerHTML={createMarkup()}/>
                         </CardContent>
                   </CardActionArea>
                </Grid>}
            </Grid>


        </Grid>
    );
}
const mapDispatchToProps = dispatch => ({
    createPost : (title, body, image, history) => dispatch(createPost(title, body, image, history)),
})
export default connect(null, mapDispatchToProps )(CreatePost);
