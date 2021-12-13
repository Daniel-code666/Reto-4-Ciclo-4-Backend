import LoginForm from '../../forms/loginForm/LoginForm'
import { Modal } from 'react-bootstrap';
import './LoginModal.css';

function LoginModal(props){
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginForm onHide={props.onHide} />
            </Modal.Body>
            <Modal.Footer>
                {/* <Button onClick={props.onHide}>Close</Button> */}
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;
