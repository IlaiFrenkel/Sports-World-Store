import React, {useState,useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {Button} from "react-bootstrap";


const DeleteUser = (props) => {

    const [redirect, setRedirect] = useState(false);
    const [password, setPassword] = useState("");

    const onSubmitDelete = () =>{
        fetch('http://localhost:5000/deleteUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: window.localStorage.getItem('user'),
                pass : password
            })
        }).then(response => response.json())
            .then(data => {
                if (data && data.success) {
                    alert("your account was deleted!");
                    window.localStorage.clear();
                    setRedirect(true);
                }else{
                    alert("wrong password!");
                }
            })
            .catch(err => console.log(err))

    }

    if(redirect){
        return <Redirect to={'login'}/>
    }

    if (window.localStorage.getItem('user')){
        props.func(true);
    }

    return (
        <div>
            <h5>{window.localStorage.getItem('user')}, to delete your account please enter your password</h5>
            <input type={"password"} onChange={(e) => setPassword(e.target.value)}/><br/><br/>
            <Button variant={"danger"} onClick={onSubmitDelete}>Delete Account</Button>
        </div>
    );
};

export default DeleteUser;