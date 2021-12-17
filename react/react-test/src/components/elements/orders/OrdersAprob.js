import React from 'react';
import '../orders/OrdersAdm.css';
import {Table, Button, Container} from 'reactstrap';

class OrdersAprob extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            orders: [],
            user: [],
            order: []
        }
    }

    componentDidMount(){
        fetch("http://129.151.116.250:8080/api/user/" + localStorage.getItem('idUser'))
        .then(response => response.json())
        .then(response => this.setState({user:response}));

        fetch("http://129.151.116.250:8080/api/order/all")
        .then(data => data.json())
        .then(data => this.setState({orders: data}));
    }

    getOrders(){
        fetch("http://129.151.116.250:8080/api/order/all")
        .then(data => data.json())
        .then(data => this.setState({orders: data}));
    }

    setStateAprobar=(order)=>{
        let orderUpdt = {
            id: order.id,
            registerDay: order.registerDay,
            status: 'Aprobada',
            salesMan: order.salesMan,
            products: {[Object.keys(order.products)]: [Object.values(order.products)]},
            quantities: {[Object.keys(order.quantities)]: [Object.values(order.quantities)]}
        }

        fetch("http://129.151.116.250:8080/api/order/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: orderUpdt.id,
                registerDay: orderUpdt.registerDay,
                status: 'Aprobada',
                salesMan: orderUpdt.salesMan
                /* products: {[Object.keys(orderUpdt.products)]: Object.values(orderUpdt.products)},
                quantities: {[Object.keys(orderUpdt.quantities)]: Object.values(orderUpdt.quantities)} */
            })
        }).then(response => {
            if(response.status !== 201){
                alert('Ocurrió un problema');
            }else{
                this.getOrders();
                alert('Orden aprobada');
            }
        });
    }

    setStatePendiente=(order)=>{
        let orderUpdt = {
            id: order.id,
            registerDay: order.registerDay,
            status: 'Aprobada',
            salesMan: order.salesMan,
            products: {[Object.keys(order.products)]: [Object.values(order.products)]},
            quantities: {[Object.keys(order.quantities)]: [Object.values(order.quantities)]}
        }

        fetch("http://129.151.116.250:8080/api/order/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: orderUpdt.id,
                registerDay: orderUpdt.registerDay,
                status: 'Pendiente',
                salesMan: orderUpdt.salesMan
                /* products: {[Object.keys(orderUpdt.products)]: Object.values(orderUpdt.products)},
                quantities: {[Object.keys(orderUpdt.quantities)]: Object.values(orderUpdt.quantities)} */
            })
        }).then(response => {
            if(response.status !== 201){
                alert('Ocurrió un problema');
            }else{
                this.getOrders();
                alert('Orden en pendiente');
            }
        });
    }

    setStateRechazar=(order)=>{
        let orderUpdt = {
            id: order.id,
            registerDay: order.registerDay,
            status: 'Aprobada',
            salesMan: order.salesMan,
            products: {[Object.keys(order.products)]: [Object.values(order.products)]},
            quantities: {[Object.keys(order.quantities)]: [Object.values(order.quantities)]}
        }

        fetch("http://129.151.116.250:8080/api/order/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: orderUpdt.id,
                registerDay: orderUpdt.registerDay,
                status: 'Rechazada',
                salesMan: orderUpdt.salesMan
                /* products: {[Object.keys(orderUpdt.products)]: Object.values(orderUpdt.products)},
                quantities: {[Object.keys(orderUpdt.quantities)]: Object.values(orderUpdt.quantities)} */
            })
        }).then(response => {
            if(response.status !== 201){
                alert('Ocurrió un problema');
            }else{
                this.getOrders();
                alert('Orden rechazada');
            }
        });
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

            {/* Tabla de ordenes registradas */}
            <Container>
                <div className="alinear">
                    <h1>Lista de ordenes</h1>
                </div>
                <br></br>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Vendedor</th>
                                <th>Producto</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.registerDay}</td>
                                    <td>{element.status}</td>
                                    <td>{element.salesMan.name}</td>
                                    <td>
                                        {Object.keys(element.products)}
                                    </td>
                                    <td>
                                        <Button color="success" size="sm" className='esp' 
                                        onClick={()=>this.setStateAprobar(element)}>
                                            Aprobar
                                        </Button>
                                        <Button color="warning" size="sm" className="esp" 
                                        onClick={()=>this.setStatePendiente(element)}>
                                            Pendiente
                                        </Button>
                                        <Button color="danger" size="sm" className='esp' 
                                        onClick={()=>this.setStateRechazar(element)}>
                                            Rechazar
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

export default OrdersAprob;