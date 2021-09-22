import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, func, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem("user") ? (
                    <Component {...props} func={func}/>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;