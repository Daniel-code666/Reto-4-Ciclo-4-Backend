import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Routes, Route, Link} from "react-router-dom";

class Menu extends React.Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Link className="navbar-brand" to="/">Divina Comedia</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/orders">Ordenes</Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Menu;