import React from 'react';
import { Col, Row, Form, Stack, Button, Image } from 'react-bootstrap';
import LoginIMG from '../../../assets/login.png'
import './LoginForm.css';

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.email === '' || this.state.password === '') {
            alert('Por favor, rellene todos los campos');
        }else{
            fetch('http://localhost:8080/api/user/'+this.state.email+'/'+this.state.password)
            .then(res => res.json())
            .then(data => {
                if(data.id !== null) {
                    localStorage.setItem('idUser', data.id);
                    this.props.onHide();
                    this.props.onSession();
                }else{
                    alert('Usuario o contraseña incorrectos');
                }
            });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    render() {
        return (
            <div className="form">
                <br />
                <Row className="justify-content-md-center">
                    <Form onSubmit={this.handleSubmit}>
                        <Stack gap={3}>
                            <Row className="justify-content-md-center">
                                <Col lg={6} md={4} className='text-center'>
                                    <Image src={LoginIMG} className="avatar" roundedCircle />
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col lg={6}>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col lg={6}>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col lg={6} className="d-grid gap-2">
                                    <Button type="submit" variant="success" size="lg">Login</Button>
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