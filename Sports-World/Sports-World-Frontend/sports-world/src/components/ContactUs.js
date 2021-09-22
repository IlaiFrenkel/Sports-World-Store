import React from "react";
import {Form, Button} from "react-bootstrap";

class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "email": "",
            "phone": ""
        }
    }

    onTypeEmail = (event) => {
        this.setState({email : event.target.value})
    }

    onTypePhone = (event) => {
        this.setState({phone : event.target.value})
    }

    onSubmit = () => {
        fetch('http://localhost:5000/SaveContact', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                { "email" : this.state.email, "phone": this.state.phone}
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.success){
                    alert("We will contact you soon!");
                }
            })
            .catch(err=>console.log(err))
    }

    render() {
        return (
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control onChange={this.onTypeEmail}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control onChange={this.onTypePhone}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </Form>
        );
    }
}

export default ContactUs;