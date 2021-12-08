import { Route, Redirect } from "react-router-dom"
export const ProtectedRoute = ({component:Component,authenticated,...rest}) =>{
    return(
        <Route
            {...rest}
            render={ props => authenticated === false ?<Redirect to="/login"/>:<Component {...props}/>}
        />
    );
}
export default ProtectedRoute;
