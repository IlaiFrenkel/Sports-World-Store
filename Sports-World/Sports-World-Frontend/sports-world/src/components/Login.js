import React from 'react';
import {Redirect} from "react-router-dom";


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            pass: '',
            remember : false,
            redirect : false
        }

        if (window.localStorage.getItem('user')){
            this.props.func(true);
        }

        if(this.props.logout && window.localStorage.getItem('user') !== null){
            let tempUser = window.localStorage.getItem('user');

            fetch('http://localhost:5000/logout', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    user: tempUser
                })
            })

            window.localStorage.clear();
            this.props.func(false);
        }
    }

    componentDidMount() {
        if (window.localStorage.getItem('token')){
            fetch('http://localhost:5000/autoLogin', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    token: window.localStorage.getItem('token')
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data && data.success) {
                        window.localStorage.setItem('user', data.user);
                        this.setState({ redirect: true });
                    }
                })
                .catch(err => console.log(err))
        }

    }

    onUserChange = (event) =>{
        this.setState({user : event.target.value})
    }
    onPassChange = (event) =>{
        this.setState({pass : event.target.value})
    }
    onRememberChange = (event) =>{
        this.setState({remember : event.target.checked})
    }

    onSubmitLogin = () => {
        fetch('http://localhost:5000/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user,
                pass: this.state.pass,
                remember : this.state.remember

            })
        })
            .then(response => response.json())
            .then(data => {

                if (data && data.success) {
                    window.localStorage.setItem('user', this.state.user);
                    window.localStorage.setItem('token', data.token);
                    this.props.func(true);
                    this.setState({ redirect: true });
                }else {
                    alert("Username or passwords doesn't exist")
                }
            })
            .catch(err => console.log(err))

    }

    render(){
        if (this.state.redirect) {
            // window.history.pushState('Store', 'Title', '/Store');
            return <Redirect to={{
                pathname: '/store'
            }}/>
            // return <Store/>

        }
        return (
            <div>
                <span>Username<input onChange={this.onUserChange}/></span>
                <br/>
                <span>Password  <input type={"password"} onChange={this.onPassChange}/></span>
                <br/>
                <span>Remember Me</span>
                <input type="checkbox" onChange={this.onRememberChange}/><br/>
                <button onClick={this.onSubmitLogin}>Login</button>
            </div>
        );
    }
}

export default Login;