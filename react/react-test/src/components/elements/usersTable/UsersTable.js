import React, {useState, useEffect, useRef} from 'react'
import '../usersTable/UsersTable.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const UsersTable = () => {
    const [data, setData] = useState([]);
    const [dataP, setDataP] = useState([]);
    const mountedRef = useRef(true);

    useEffect(()=>{
        let isSubscribed = true;
        
        fetch("http://localhost:8080/api/user/all")
        .then((response) => response.json())
        .then((json) => {
            if (isSubscribed){
                setData(json);
            }
        })
        return () => isSubscribed = false;
    }, []);

    useEffect(()=>{
        let isSubscribed = true;

        fetch("http://localhost:8080/api/user/" + localStorage.getItem('idUser'))
        .then((response) => response.json())
        .then((json) => {
            if (isSubscribed){
                setDataP(json);
            }
        })
        return () => isSubscribed = false;
    });

    return( 
        <>
            <Container>
                <div className='alinear'>
                    <h1>Mi perfil</h1>
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Identificación</th>
                                <th>Nombres</th>
                                <th>Email</th>
                                <th>Perfil</th>
                                <th>Zona</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{dataP.identification}</td>
                                <td>{dataP.name}</td>
                                <td>{dataP.email}</td>
                                <td>{dataP.type}</td>
                                <td>{dataP.zone}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Container>

            <Container>
                <div className="alinear">
                    <h1>Lista de usuarios</h1>
                </div>
                <div>
                    <Button color='primary' size='sm'>Agregar asesor</Button>
                </div>
                <br></br>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Identificación</th>
                                <th>Nombres</th>
                                <th>Email</th>
                                <th>Perfil</th>
                                <th>Zona</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((element) => (
                                <tr>
                                    <td>{element.identification}</td>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.type}</td>
                                    <td>{element.zone}</td>
                                    <td>
                                        <Button color="warning" size="sm" className='espacio'>Editar</Button>
                                        <Button color="danger" size="sm">Borrar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    );
}

export default UsersTable;