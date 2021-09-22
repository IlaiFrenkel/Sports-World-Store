import React from 'react';
import {Button} from "react-bootstrap";
import Store from "./Store";
import {Link, Redirect} from "react-router-dom";



class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: window.localStorage.getItem('user'),
            runningShoes: 0,
            soccerShoes: 0,
            tennisShoes: 0,
            shirt1: 0,
            shirt2: 0,
            shirt3: 0,
            totalAmount : 0,
            totalPrice : 0
        };

    }

    componentDidMount() {
        this.GetCart();
    }

    GetCart = () =>{
         fetch('http://localhost:5000/GetCart', {
             method: 'post',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(
                 { "user" : window.localStorage.getItem('user')}
             )
         })
             .then(response => response.json())
             .then(data => {
                 if (data.success){
                     this.setState(data.cart[0]);
                 }
             })
             .catch(err=>console.log(err))
     }

    onGoToStore = () =>{
        return <Store/>
    }

    onCheckOut = () =>{
        this.setState({redirect : true})
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/Checkout'
            }}/>
        }
        return (
            <div>
                <Link to="/Store">Go Back To Store</Link>
                <div className="overflow-auto">
                <table className="f9 w-100 mw8 center" cellSpacing="0">
                <thead>
                <tr className="stripe-dark">
                <th className="fw6 pa3 bg-white center">Category</th>
                <th className="fw6 pa3 bg-white center">amount</th>
                <th className="fw6 pa3 bg-white center">price</th>
                <th className="fw6 pa3 bg-white center">picture</th>
                </tr>
                </thead>
                <tbody className="lh-copy">
                <tr className="stripe-dark">
                    <td className="pa3">Running Shoes</td>
                    <td className="pa3">{this.state.runningShoes}</td>
                    <td className="pa3">{this.state.runningShoes * 200}$</td>
                    <td>
                        <img width={50} src={process.env.PUBLIC_URL + '/Images/shoe1.jpeg'} alt=""/>
                    </td>
                </tr>
                <tr className="stripe-dark">
                    <td className="pa3">Soccer Shoes</td>
                    <td className="pa3">{this.state.soccerShoes}</td>
                    <td className="pa3">{this.state.soccerShoes * 150}$</td>
                    <td>
                        <img width={50} src={process.env.PUBLIC_URL + '/Images/shoe2.jpeg'} alt=""/>
                    </td>

                </tr>
                <tr className="stripe-dark">
                    <td className="pa3">Tennis Shoes</td>
                    <td className="pa3">{this.state.tennisShoes}</td>
                    <td className="pa3">{this.state.tennisShoes * 100}$</td>
                    <td>
                        <img width={50} src={process.env.PUBLIC_URL + '/Images/shoe3.jpeg'} alt=""/>
                    </td>
                </tr>
                <tr className="stripe-dark">
                    <td className="pa3">Dry Fit 1</td>
                    <td className="pa3">{this.state.shirt1}</td>
                    <td className="pa3">{this.state.shirt1 * 150}$</td>
                    <td>
                        <img width={50} src={process.env.PUBLIC_URL + '/Images/shirt1.jpg'} alt=""/>
                    </td>
                </tr>
                <tr className="stripe-dark">
                    <td className="pa3">Dry Fit 2</td>
                    <td className="pa3">{this.state.shirt2}</td>
                    <td className="pa3">{this.state.shirt2 * 100}$</td>
                    <td>
                        <img width={50} src={process.env.PUBLIC_URL + '/Images/shirt2.jpg'} alt=""/>
                    </td>
                </tr>
                <tr className="stripe-dark last">
                    <td className="pa3">Dry Fit 3</td>
                    <td className="pa3">{this.state.shirt3}</td>
                    <td className="pa3">{this.state.shirt3 * 200}$</td>
                    <td>
                        <img width={50} src={process.env.PUBLIC_URL + '/Images/shirt3.jpg'} alt=""/>
                    </td>
                </tr>

                <tr className="stripe-dark">
                    <td className="pa3">Total Price</td>
                    <td className="pa3">{this.state.totalAmount}</td>
                    <td className="pa3">{this.state.totalPrice}$</td>

                </tr>
                </tbody>
                </table>
                </div>
                <br/>
                <Button variant="success" as="input" type="submit" value="Checkout" onClick={this.onCheckOut}/>
            </div>
        );

}
}

export default Cart;