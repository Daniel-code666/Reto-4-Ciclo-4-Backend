import React from 'react';
import '../orders/OrdersAdm.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

class OrdersAdm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:[],
            products:[]
        };
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/user/" + localStorage.getItem('idUser'))
        .then(response => response.json())
        .then(response => this.setState({user:response}));

        fetch("http://localhost:8080/api/hairproducts/all")
        .then(resp => resp.json())
        .then(resp => this.setState({products: resp}));
    }

    render(){
        return(
            <>
            {/* sección ver perfil */}
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
                                <td>{this.state.user.identification}</td>
                                <td>{this.state.user.name}</td>
                                <td>{this.state.user.email}</td>
                                <td>{this.state.user.type}</td>
                                <td>{this.state.user.zone}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Container>

            {/* Tabla de productos registrados */}
            <Container>
                <div className="alinear">
                    <h1>Lista de productos</h1>
                </div>
                <br></br>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Disponibilidad</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Foto</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map((element) => (
                                <tr key={element.reference}>
                                    <td>{element.name}</td>
                                    <td>{element.category}</td>
                                    <td>{element.description}</td>
                                    {!element.availability ? <td>No disponible</td> : <td>Disponible</td>}
                                    <td>{element.price}</td>
                                    <td>{element.quantity}</td>
                                    <td>
                                        <img src={element.photography} alt='prodIMG' width='50%' height='50px' />
                                    </td>
                                    <td>
                                        <Button color="warning" size="sm" className='espacio' 
                                        onClick={()=>this.showModalEditarProd(element)}>
                                            Agregar orden
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
            </>
        )
    }
}

export default OrdersAdm;
