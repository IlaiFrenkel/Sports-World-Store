import React from "react";

class AllUserPurchases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "user": window.localStorage.getItem('user'),
            "purchases": []
        };
    }

    componentDidMount() {
        this.GetPurchases();

    }

    GetPurchases = () =>{
        fetch('http://localhost:5000/GetAllPurchases', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                { "user" : this.state.user}
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.success){
                    let arr = [];
                    for (let i = 0; i< data.purchases.length; i++) {
                       let carti = data.purchases[i].cart;
                       let purchase = [];
                       purchase.push(carti.user);
                       purchase.push(carti.runningShoes);
                       purchase.push(carti.soccerShoes);
                       purchase.push(carti.tennisShoes);
                       purchase.push(carti.shirt1);
                       purchase.push(carti.shirt2);
                       purchase.push(carti.shirt3);
                       purchase.push(carti.totalAmount);
                       purchase.push(carti.totalPrice);
                       arr.push(purchase);
                    }
                    this.setState({"purchases": arr})
                }
            })
            .catch(err=>console.log(err))
    }

    render(){
        return (
            <div>
                <h3>A List of all Your purchases:</h3>
                <br/>
                {this.state.purchases.map(purchase =>
                    <div key={purchase}>
                         User: {purchase[0]}, Running Shoes: {purchase[1]}, Soccer Shoes: {purchase[2]}, Basketball Shoes: {purchase[3]},
                        Dry Fit Shirt: {purchase[4]}, Dry Fit UnderShirt: {purchase[5]}, Dry Fit Hoodie: {purchase[6]},
                        Total Amount: {purchase[7]}, Total Price: {purchase[8]}
                        <br/>
                        <br/>
                    </div>)}
            </div>
    );
    }
}

export default AllUserPurchases;