import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Store from "./Store";
import Cart from "./Cart"
import Checkout from "./Checkout";
import AllMyPurchases from"./AllUserPurchases";
import ProductsInformation from "./ProductsInformation";
import ContactUs from "./ContactUs";
import DeleteUser from "./DeleteUser";
import AdminScreen from "./AdminScreen";
import Readme from "./readme";

const Main = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        if (window.localStorage.getItem('user')){
            setLoggedIn(true);
        }
    },[])

    return (
        <div className="App">
            <header className="App-header">
                <h1>Sports World</h1>
            </header>
            <Router>
            <div>
                <Link to="/readme">readme </Link>
                {loggedIn || <Link to="/Register">Register</Link>}
                {loggedIn || <Link to="/Login">Login</Link>}
                {!loggedIn ||<Link to="/Logout">Logout </Link>}
                {!loggedIn ||<Link to="/Store">Store </Link>}
                {!loggedIn ||<Link to="/Cart">Last Cart</Link>}
                {!loggedIn ||<Link to="/AllMyPurchases">MyPurchases </Link>}
                {!loggedIn ||<Link to="/ProductsInfo">ProductsInfo </Link>}
                {!loggedIn ||<Link to="/ContactUs">ContactUs </Link>}
                {!loggedIn ||<Link to="/DeleteUser">DeleteUser </Link>}
                {window.localStorage.getItem('user') === 'admin' && <Link to="/AdminScreen">Admin Screen</Link>}
            </div>
                <Switch>
                    <Route exact path="/readme">
                        <Readme />
                    </Route>
                    <Route exact path="/Register">
                        <Register func={setLoggedIn}/>
                    </Route>
                    <Route path="/Login">
                        <Login func={setLoggedIn}/>
                    </Route>
                    <PrivateRoute path="/Logout">
                        <Login func={setLoggedIn} logout={true} />
                    </PrivateRoute>
                    <PrivateRoute path="/AllMyPurchases" component={AllMyPurchases}/>
                    <PrivateRoute path="/ProductsInfo" component={ProductsInformation}/>
                    <PrivateRoute path="/ContactUs" component={ContactUs}/>
                    <PrivateRoute path="/DeleteUser" component={DeleteUser} func={setLoggedIn}/>
                    <PrivateRoute path="/Store" component={Store}/>
                    <PrivateRoute path="/Cart" component={Cart}/>
                    <PrivateRoute path="/Checkout" component={Checkout}/>
                    <PrivateRoute path="/AdminScreen" component={AdminScreen} />
                </Switch>
            </Router>
        </div>
    );
};

export default Main;
