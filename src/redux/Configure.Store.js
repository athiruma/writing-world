import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// ********************
import Authentication from "./Reducers/Authentication";
import Posts from "./Reducers/Posts";
import ViewPost from "./Reducers/ViewPost";
import Like  from "./Reducers/Like";
import Comments from "./Reducers/Comments";
import Profile from "./Reducers/Profile";
import ViewProfile from "./Reducers/ViewerProfile";
import PostCreate from "./Reducers/Post.Creators";
// ******************

const rootReducer = combineReducers({
    credentials : Authentication,
    Posts : Posts,
    ViewPost : ViewPost,
    Like : Like,
    Comments: Comments,
    Profile: Profile,
    LoginProfile: ViewProfile,
    PostCreate : PostCreate
});

export const store = createStore(
    rootReducer, composeWithDevTools(
    applyMiddleware(thunk, logger)
));
