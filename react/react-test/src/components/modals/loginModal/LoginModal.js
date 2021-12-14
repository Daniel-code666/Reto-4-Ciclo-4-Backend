import LoginForm from '../../forms/loginForm/LoginForm'
import { Modal } from 'react-bootstrap';
import './LoginModal.css';
import { useState } from 'react';

function LoginModal({onSession, ...props}){
    const [idUser, setIdUser] = useState(0);
    
    const id = localStorage.getItem('idUser');
    const type = localStorage.getItem('type');

    const setSession = () => {
        if(localStorage.getItem('idUser') != null){
            setIdUser(localStorage.getItem('idUser'));
            console.log(id);
            console.log(type);
        }
    }
    
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginForm onHide={props.onHide} onSession={() => setSession()}/>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button onClick={props.onHide}>Close</Button> */}
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;
