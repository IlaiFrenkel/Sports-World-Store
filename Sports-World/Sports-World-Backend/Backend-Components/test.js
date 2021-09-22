const fetch = require('node-fetch');

let test = async ()=>{
    await fetch('http://localhost:5000/register', {
        method: 'post',
        body:    JSON.stringify({"user" : "testUser", "pass": "testPassword"}),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => console.log("Register Test", json));

    await fetch('http://localhost:5000/login', {
        method: 'post',
        body:    JSON.stringify({"user" : "testUser", "pass": "testPassword"}),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => console.log("Login Test", json));

    await fetch('http://localhost:5000/AddToCart', {
        method: 'post',
        body:    JSON.stringify({
            "user" : "testUser",
            "runningShoes": 1,
            "soccerShoes": 2,
            "tennisShoes": 0,
            "shirt1": 0,
            "shirt2": 0,
            "shirt3": 0,
            "totalAmount" : 2,
            "totalPrice" : 500
        }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => console.log("Add To Cart", json));


    await fetch('http://localhost:5000/GetCart', {
        method: 'post',
        body:    JSON.stringify({"user" : "testUser"}),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => console.log("Get Cart Test", json));

    await fetch('http://localhost:5000/Checkout', {
        method: 'post',
        body:    JSON.stringify({
            "address" : "testAddress",
            "creditCard" : "12341234",
            "cart" : {
                "user" : "testUser",
                "runningShoes": 1,
                "soccerShoes": 2,
                "tennisShoes": 0,
                "shirt1": 0,
                "shirt2": 0,
                "shirt3": 0,
                "totalAmount" : 2,
                "totalPrice" : 500
            }
        }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => console.log("Checkout Test", json));

    await fetch('http://localhost:5000/GetAllPurchases', {
        method: 'post',
        body:    JSON.stringify({"user" : "testUser"}),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => console.log("Get All Purchases", json));

    await fetch('http://localhost:5000/SaveContact', {
        method: 'post',
        body:    JSON.stringify({"email" : "testEmail@gmail.com", "phone" : "1234252"}),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => console.log("Save Contact", json));

    await fetch('http://localhost:5000/DeleteUser', {
        method: 'post',
        body:    JSON.stringify({"user" : "testUser", "pass": "testPassword"}),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => console.log("Delete User Test", json));

    await fetch('http://localhost:5000/AdminScreen', {
        method: 'post',
        body:    JSON.stringify({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2MzA0MjYxNDl9.K9JAezVhvoqv-Q0Qd2SaacHvfwoPCwMXZOvm1DLRMTQ"}),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => console.log("Admin Screen Test", json));
}
test()