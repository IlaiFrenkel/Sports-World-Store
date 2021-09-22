import React from 'react';
import {Redirect} from 'react-router-dom';

class Register extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            user: '',
            pass: '',
            redirect : false
        }
    }
    onUserChane = (event) =>{
        this.setState({user : event.target.value})
    }
    onPassChane = (event) =>{
        this.setState({pass : event.target.value})
    }

    onSubmitRegister = () =>{
        if (this.state.user === '' || this.state.pass === ''){
            alert("Please fill in both fields")
        }else{
            fetch('http://localhost:5000/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    pass: this.state.pass,
                    user: this.state.user
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data && data.success){
                        window.localStorage.setItem('user', this.state.user);
                        window.localStorage.setItem('token', data.token);
                        this.props.func(true);
                        this.setState({ redirect: true });
                    }else{
                        alert("This username already exists")
                    }
                })
        }
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to='/store'/>;
        }
        return (
            <div>
                <span>Username< input id="user" onChange={this.onUserChane}/></span>
                <br/>
                <span>Password  <input id="pass" type={"password"} onChange={this.onPassChane}/></span>
                <br/>
                <button onClick={this.onSubmitRegister}>Register</button>
            </div>
        );
    }
}

export default Register;