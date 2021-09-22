import React, {useState,useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {Card, Row} from "react-bootstrap";

const AdminScreen = () => {
    const [redirect, setRedirect] = useState(false);
    const [users, setDb] = useState([]);
    const [activity, setActivity] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch('http://localhost:5000/AdminScreen', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                { "token" : window.localStorage.getItem('token')}
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.success){
                    setDb(data.db.users)
                    setActivity(data.db.LoginActivity)
                }
                else{
                    setRedirect(true);
                }
            })
            .catch(err=>console.log(err))
    }, []);

    if (redirect){
        return <Redirect to={'/store'}/>
    }

    return (
        <div>
            <input onChange={(e) => setSearch(e.target.value)}/>
            <h3>Activities of users</h3>
            {
                <Row  xs={1} md={3}>
                    {users.filter((val) =>{
                        if (search === ""){
                            return val;
                        }else if (val.user.toLowerCase().includes((search).toLowerCase())){
                            return val;
                        }
                    }).map((val, key)=>{
                        return <Card key={val.user} >
                            <Card.Body>
                                <Card.Title>{val.user}</Card.Title>
                                {
                                    activity.filter(value =>{
                                        if (value.user === val.user){
                                            return value
                                        }}).map(t =>{
                                        return <p key={t.date}>{`${t.type} : ${t.date}`}</p>
                                    })
                                }
                            </Card.Body>
                        </Card>
                    })}
                </Row>
            }

        </div>
    );
};

export default AdminScreen;