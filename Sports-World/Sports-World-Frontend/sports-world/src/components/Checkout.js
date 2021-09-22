import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";



const Checkout = () => {
    const [address, setAddress] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [cart, setCart] = useState({});
    const [redirect, setRedirect] = useState(false);

    const onCheckout = ()=> {
        if (address.length === 0) {
            alert("please fill your address");
        }else if (creditCard.length !== 8 || !parseInt(creditCard)) {
            alert("please enter a 8 digits valid credit card number");
        }else{
            fetch('http://localhost:5000/checkout', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    { "cart" : cart, "address": address, "creditCard": creditCard}
                )
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success){
                        alert("Order received!");
                        setRedirect(true);
                    }
                })
                .catch(err=>console.log(err))
        }
    }

useEffect(() =>{fetch('http://localhost:5000/GetCart', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
        { "user" : window.localStorage.getItem('user')}
    )
})
    .then(response => response.json())
    .then(data => {
        if (data.success){
            setCart(data.cart[0]);
        }
    })
    .catch(err=>console.log(err))},[])

    if (redirect) {
        return <Redirect to={{
            pathname: '/store'
        }}/>
    }

    return (
        <div>
            <span>Total Amount {cart.totalPrice}$</span><br/>
            <span>Your Address<input onChange={(e) => setAddress(e.target.value)}/></span>
            <br/>
            <span>Credit card <input onChange={(e) => setCreditCard(e.target.value)}/></span>
            <br/>
            <Button onClick={onCheckout}>Purchase cart</Button>
        </div>
    );
};

export default Checkout;