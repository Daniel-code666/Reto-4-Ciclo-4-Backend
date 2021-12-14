import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import LoginModal from '../../modals/loginModal/LoginModal';
import { useState } from 'react';


function Menu(){
    const [modalShow, setModalShow] = useState(false);

    const idUser = localStorage.getItem('idUser');
    const type = localStorage.getItem('type');

    return(
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Link className='navbar-brand' to="/">Divina Comedia</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className='nav-link' to="/">Home</Link>
                            {idUser === null ? <Nav.Link id="login" onClick={() => setModalShow(true)}>Login</Nav.Link> : null }
                            {idUser !== null & type === 'ASE'? <Link className='nav-link' to="/orders">Generar ordenes</Link> : null }
                            {idUser !== null & type === 'ADM'? <Link className='nav-link' to="/adminpage">Administrar Usuarios</Link> : null }
                            {idUser !== null & type === 'COORD'? <Link className='nav-link' to="/coordpage">Validar ordenes</Link> : null }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <LoginModal show={modalShow} onHide={() => setModalShow(false)}  />
        </>
    );
}

export default Menu;