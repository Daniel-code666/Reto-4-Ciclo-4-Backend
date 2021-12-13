import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import LoginModal from '../../modals/loginModal/LoginModal';
import { useState } from 'react';


function Menu(){
    const [modalShow, setModalShow] = useState(false);
    const [idUser, setIdUser] = useState(0);


    const setSession = () => {
        if(localStorage.getItem('idUser')!=null){
            setIdUser(localStorage.getItem('idUser'));
            console.log(idUser);
        }
    }

    return(
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Link className='navbar-brand' to="/">Divina Comedia</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className='nav-link' to="/">Home</Link>
                            {idUser===0 ? <Nav.Link id="login" onClick={() => setModalShow(true)}>Login</Nav.Link> : null }
                            {idUser!==0 ? <Link className='nav-link' to="/orders">Orders</Link> : null }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <LoginModal show={modalShow} onHide={() => setModalShow(false)} onSession={() => setSession()} />
        </>
    );
}

export default Menu;