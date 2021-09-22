import React from 'react';
import {Card, Button, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from "react-router-dom";

const arr = [
    {id : 1 ,name : "Running Shoes", price : 200, imgUrl : '/Images/shoe1.jpg'},
    {id : 2 ,name : "Soccer Shoes",price : 150, imgUrl : '/Images/shoe2.jpg'},
    {id : 3 ,name : "Basketball Shoes", price : 100, imgUrl : '/Images/shoe3.jpg'},
    {id : 4 ,name : "Dry Fit Shirt", price : 150, imgUrl : '/Images/shirt1.jpg'},
    {id : 5 ,name : "Dry Fit Undershirt", price : 100, imgUrl : '/Images/shirt2.jpg'},
    {id : 6 ,name : "Dry Fit Hoodie", price : 200, imgUrl : '/Images/shirt3.jpg'}
]

class Products extends React.Component{
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
            totalPrice : 0,
            search : ""
        };
    }

    onSubmitCart = () => {
        let tempState = this.state;
        delete tempState.search;

        fetch('http://localhost:5000/addToCart', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                tempState
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.success){

                    this.setState({redirect : true})
                }
            })
            .catch(err=>console.log(err))
    }

    onAddToCart = (props) =>{
        switch(props) {
            case 1:
                this.setState({runningShoes : this.state.runningShoes + 1,
                    totalAmount : this.state.totalAmount + 1,
                    totalPrice : this.state.totalPrice + arr[0].price})
                break;
            case 2:
                this.setState({soccerShoes : this.state.soccerShoes + 1,
                    totalAmount : this.state.totalAmount + 1,
                    totalPrice : this.state.totalPrice + arr[1].price})
                break;
            case 3:
                this.setState({tennisShoes : this.state.tennisShoes + 1,
                    totalAmount : this.state.totalAmount + 1,
                    totalPrice : this.state.totalPrice + arr[2].price})
                break;
            case 4:
                this.setState({shirt1 : this.state.shirt1 + 1,
                    totalAmount : this.state.totalAmount + 1,
                    totalPrice : this.state.totalPrice + arr[3].price})
                break;
            case 5:
                this.setState({shirt2 : this.state.shirt2 + 1,
                    totalAmount : this.state.totalAmount + 1,
                    totalPrice : this.state.totalPrice + arr[4].price})
                break;
            case 6:
                this.setState({shirt3 : this.state.shirt3 + 1,
                    totalAmount : this.state.totalAmount + 1,
                    totalPrice : this.state.totalPrice + arr[5].price})
                break;
            default:
                break;
        }
    }

    onTypeSearch = (event) =>{
        this.setState({search : event.target.value})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/Cart'
            }}/>
        }
        return (
            <div>
                <Button variant="success" as="input" type="submit" value="Go to new Cart" onClick={this.onSubmitCart}/>
                <br/>
                <input placeholder={'search product'} onChange={this.onTypeSearch}/>
                <div className={'container'}>
                    <Row  xs={1} md={3}>
                        {arr.filter((val) =>{
                            if (this.state.search === ""){
                                return val;
                            }else if (val.name.toLowerCase().includes((this.state.search).toLowerCase())){
                                return val;
                            }
                        }).map((val, key)=>{
                            return <Card key={val.id} >
                                <Card.Img variant="top" src={process.env.PUBLIC_URL + val.imgUrl}/>
                                <Card.Body>
                                    <Card.Title>{val.name}</Card.Title>
                                    <Card.Text>{val.price}$</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="primary" onClick={() => this.onAddToCart(val.id)}>Add to cart</Button>
                                </Card.Footer>
                            </Card>
                        })}
                    </Row>
                </div>
            </div>
        );
    }
};

export default Products;