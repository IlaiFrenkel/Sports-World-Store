import React from "react";
import {Card, CardGroup} from "react-bootstrap";

class ProductsInformation extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Running Shoes</Card.Title>
                            <Card.Text>
                                Special running shoes that are suitable for running in
                                all sorts of ground. They are light, comfortable and strong.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Soccer Shoes</Card.Title>
                            <Card.Text>
                                Adidas soccer shoes, they are strong, light, comfortable and they
                                help you to avoid loss of equilibrium when playing soccer on grass.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Basketball Shoes</Card.Title>
                            <Card.Text>
                                Great basketball shoes that help you play with the most comfortable feeling.
                                They have special shape that help you with direction changing while playing.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Dry Fit Shirt</Card.Title>
                            <Card.Text>
                                Very light shirt that help you to evaporate your sweat while doing sport
                                in worm weather conditions.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Dry Fit Undershirt</Card.Title>
                            <Card.Text>
                                Light Undershirt that help you to fill light and evaporate your sweat
                                while doing sport in worm weather conditions.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Dry Fit Hoodie</Card.Title>
                            <Card.Text>
                                Special dry fit hoodie that helps you to both stay warm and evaporate your sweat
                                when doing sport in cold weather conditions.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </div>
        );
    }
}

export default ProductsInformation;