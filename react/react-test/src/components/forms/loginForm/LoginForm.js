import React from 'react';
import { Col, Row, Form, Stack, Button, Image } from 'react-bootstrap';
import LoginIMG from '../../../assets/login.png'
import './LoginForm.css';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();
    }

    render() {
        return(
            <div className="form">
                <br />
                <Row className="justify-content-center">
                    <Form>
                        <Stack gap={3}>
                            <Row className="justify-content-center">
                                <Col sm={4} md={4} className="text-center">
                                    <Image className="avatar" src={LoginIMG} roundedCircle />
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col sm={4}>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Email"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col sm={4}>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col sm={4} className="d-grid gap-2">
                                    <Button variant="success" size="sm">Login</Button>
                                </Col>
                            </Row>
                        </Stack>
                    </Form>
                </Row>
            </div>
        );
    }
}

export default LoginForm;