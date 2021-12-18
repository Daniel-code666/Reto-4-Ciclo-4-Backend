import React from 'react';
import '../orders/OrdersAdm.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

class OrdersAdm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:[],
            products:[],
            orders:[],
            order: {
                id: null,
                registerDay: null,
                status: null,
                salesMan: null,
                products: {},
                quantities: {}
            },
            formOrd:{
                reference: '',
                brand: '',
                category: '',
                name: '',
                description: '',
                availability: true,
                price: null,
                quantity: null,
                photography: '',
                quantityOrd: null
            },
            formOrdDate:{
                id: null,
                date: ''
            },
            formOrdState:{
                id: null,
                estado: ''
            },
            formOrdDetail:{
                id: null,
                registerDay: null,
                status: null,
                salesMan: null,
                products: {},
                quantities: {}
            },
            formProdPrice:{
                price: null
            },
            formProdDesc:{
                description: ''
            },
            salesMan: [],
            modalOrder: false,
            modalDetailOrder: false
        };
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/user/" + localStorage.getItem('idUser'))
        .then(response => response.json())
        .then(response => this.setState({user:response}));

        fetch("http://localhost:8080/api/hairproducts/all")
        .then(resp => resp.json())
        .then(resp => this.setState({products: resp}));

        fetch("http://localhost:8080/api/order/all")
        .then(data => data.json())
        .then(data => this.setState({orders: data}));
    }

    getOrders(){
        fetch("http://localhost:8080/api/order/all")
        .then(data => data.json())
        .then(data => this.setState({orders: data}));
    }

    handleChangeOrd = e =>{
        this.setState({
            formOrd:{
                ...this.state.formOrd,
                [e.target.name]:e.target.value,
            }
        });
    }

    handleChangeOrdDet = e =>{
        this.setState({
            formOrdDetail:{
                ...this.state.formOrdDetail,
                [e.target.name]:e.target.value,
            }
        });
    }

    handleChangeGetOrdByDate = e =>{
        this.setState({
            formOrdDate:{
                ...this.state.formOrdDate,
                [e.target.name]:e.target.value,
            }
        });
    }

    handleChangeGetOrdByState = e =>{
        this.setState({
            formOrdState:{
                ...this.state.formOrdState,
                [e.target.name]:e.target.value,
            }
        });
    }

    handleChangeGetProdByPrice = e =>{
        this.setState({
            formProdPrice:{
                ...this.state.formProdPrice,
                [e.target.name]:e.target.value,
            }
        });
    }

    handleChangeGetProdByDesc = e =>{
        this.setState({
            formProdDesc:{
                ...this.state.formProdDesc,
                [e.target.name]:e.target.value,
            }
        });
    }

    // abre el modal de agregar order
    showModalOrder=(registro)=>{
        this.setState({modalOrder: true, formOrd: registro});
    }

    // cierra el modal de agregar order
    closeModalOrder=()=>{
        this.setState({modalOrder: false});
    }

    showModalDetailOrder=(orden)=>{
        console.log(orden.salesMan.id);
        this.setState({modalDetailOrder: true, formOrdDetail: orden, salesMan: orden.salesMan});
    }

    closeModalDetailOrder=()=>{
        this.setState({modalDetailOrder: false});
    }

    addOrder=()=>{
        if (this.state.formOrd.quantityOrd > this.state.formOrd.quantity){
            this.closeModalOrder();
            alert('La cantidad de la orden excede la cantidad disponible del producto');
        }else{
            const refer = this.state.formOrd.reference;
            const quantityOrd = Number(this.state.formOrd.quantityOrd);

            let product = {
                reference: this.state.formOrd.reference,
                brand: this.state.formOrd.brand,
                category: this.state.formOrd.category,
                name: this.state.formOrd.name,
                description: this.state.formOrd.description,
                availability: this.state.formOrd.availability,
                price: this.state.formOrd.price,
                quantity: this.state.formOrd.quantity - Number(this.state.formOrd.quantityOrd),
                photography: this.state.formOrd.photography
            }

            var order = {
                id: null,
                registerDay: new Date(),
                status: 'Pendiente',
                salesMan: this.state.user,
                products:{refer, product},
                quantities:{refer, quantityOrd}
            }

            console.log(order);

            fetch('http://129.151.116.250:8080/api/order/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: null,
                    registerDay: order.registerDay,
                    status: order.status,
                    salesMan: order.salesMan,
                    products: {[refer]: product},
                    quantities: {[refer]: quantityOrd}
                })
            }).then(response => {
                if(response.status !== 201){
                    this.setState({modalOrder: false});
                    alert('Ocurrió un problema');
                }else{
                    this.setState({modalOrder: false});
                    this.getOrders();
                    alert('Orden creada');
                }
            });
        }
    }

    deleteOrder=(id)=>{
        fetch('http://localhost:8080/api/order/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status !== 204){
                alert('Ocurrió un problema')
            }else{
                this.getOrders();
                alert('Orden eliminada');
            }
        });
    }

    getOrdersByDate=()=>{
        console.log(this.state.formOrdDate);
        fetch("http://localhost:8080/api/order/date/" + this.state.formOrdDate.date 
                + "/" + Number(this.state.formOrdDate.id))
        .then(data => data.json())
        .then(data => this.setState({orders: data}));
    }

    getOrdersByState=()=>{
        console.log(this.state.formOrdState);
        fetch("http://localhost:8080/api/order/state/" + this.state.formOrdState.estado 
                + "/" + Number(this.state.formOrdState.id))
        .then(data => data.json())
        .then(data => this.setState({orders: data}));
    }

    getProdByPrice=()=>{
        console.log(this.state.formProdPrice);
        fetch("http://localhost:8080/api/hairproducts/price/" + Number(this.state.formProdPrice.price))
        .then(data => data.json())
        .then(data => this.setState({products: data}));
    }

    getProdByDesc=()=>{
        console.log(this.state.formProdDesc);
        fetch("http://localhost:8080/api/hairproducts/description/" + this.state.formProdDesc.description)
        .then(data => data.json())
        .then(data => this.setState({products: data}));
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
                <div className='row'>
                    <div className='col-lg-5'>
                        <div className='text-center'>
                            <h5>Filtrar por descripción</h5>
                            <FormGroup>
                                <label className='espLabel'>Palabra clave</label>
                                <input name='description' className='inputSizeDate esp' type="text" 
                                onChange={this.handleChangeGetProdByDesc}/>
                                <Button color='primary' size='sm' onClick={()=>this.getProdByDesc()}>
                                    Filtrar
                                </Button>
                            </FormGroup>
                        </div>
                    </div>
                    <div className='col-lg-7'>
                        <div className='text-center desplazarDiv'>
                            <h5>Filtrar por precio</h5>
                            <FormGroup>
                                <label className='espLabel'>Precio</label>
                                <input name='price' className='inputSizeId esp' type='number' 
                                onChange={this.handleChangeGetProdByPrice}/>
                                <Button color='primary' size='sm' onClick={()=>this.getProdByPrice()}>
                                    Filtrar
                                </Button>
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        this.state.products.length > 0 ? 
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
                                        <Button color="success" size="sm" 
                                        onClick={()=>this.showModalOrder(element)}>
                                            Agregar orden
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table> : <h5 className='text-center'>No hay ningún registro</h5>
                    }
                </div>
            </Container>

            {/* Tabla de ordenes registradas */}
            <Container>
                <div className="alinear">
                    <h1>Lista de ordenes</h1>
                </div>
                <br></br>
                <div className='row'>
                    <div className='col-lg-5'>
                        <div className='text-center'>
                            <h5>Filtrar por fecha</h5>
                            <FormGroup>
                                <label className='espLabel'>Fecha</label>
                                <input name='date' className='inputSizeDate esp' type='date' 
                                onChange={this.handleChangeGetOrdByDate}/>
                                <label className='espLabel'>ID del vendedor</label>
                                <input name='id' className='inputSizeId esp' type='number' 
                                onChange={this.handleChangeGetOrdByDate}/>
                                <Button color='primary' size='sm' onClick={()=>this.getOrdersByDate()}>
                                    Filtrar
                                </Button>
                            </FormGroup>
                        </div>
                    </div>
                    <div className='col-lg-7'>
                        <div className='text-center desplazarDiv'>
                            <h5>Filtrar por estado</h5>
                            <FormGroup>
                                <label className='espLabel'>Estado</label>
                                <select name="estado" className='esp' onChange={this.handleChangeGetOrdByState}>
                                    <option value="Aprobada" defaultValue={"Aprobada"}>Aprobada</option>
                                    <option value="Rechazada">Rechazada</option>
                                    <option value="Pendiente">Pendiente</option>
                                </select>
                                <label className='espLabel'>ID del vendedor</label>
                                <input name='id' className='inputSizeId esp' type='number' 
                                onChange={this.handleChangeGetOrdByState}/>
                                <Button color='primary' size='sm' onClick={()=>this.getOrdersByState()}>
                                    Filtrar
                                </Button>
                            </FormGroup>
                        </div>
                    </div>
                </div>
                
                {/* Tabla de ordenes registradas */}
                <div>
                    {
                        this.state.orders.length > 0 ?
                        <Table>
                        <thead>
                            <tr>
                                <th>ID orden</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Vendedor</th>
                                <th>Producto</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        {
                            <tbody>
                                {this.state.orders.map((element) => (
                                    <tr key={element.id}>
                                        <td>{element.id}</td>
                                        <td>{element.registerDay}</td>
                                        <td>{element.status}</td>
                                        <td>{element.salesMan.name}</td>
                                        <td>
                                            {Object.keys(element.products)}
                                        </td>
                                        <td>
                                            <Button color="danger" size="sm" className='esp' 
                                            onClick={()=>this.deleteOrder(element.id)}>
                                                Quitar
                                            </Button>
                                            <Button color="primary" size="sm" 
                                            onClick={()=>this.showModalDetailOrder(element)}>
                                                Ver detalle
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                        </Table> : <h5 className='text-center'>No hay ningún registro</h5>
                    }
                </div>
            </Container>

            {/* Modal para agregar la cantidad de un producto a una orden */}
            <Modal isOpen={this.state.modalOrder}>
                <ModalHeader>
                    <div>
                        <h3>Agregar producto a una orden</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Id del producto</label>
                        <input 
                            name="reference" className='form-control' 
                            type='text' value={this.state.formOrd.reference} 
                            onChange={this.handleChangeOrd} readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Cantidad a agregar</label>
                        <input 
                            name="quantityOrd" className='form-control' 
                            type='number' onChange={this.handleChangeOrd}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='success' size='sm' onClick={()=>this.addOrder()}>Guardar</Button>
                    <Button color='danger' size='sm' onClick={()=>this.closeModalOrder()}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            {/* Modal para ver el detalle de la orden */}
            <Modal isOpen={this.state.modalDetailOrder}>
                <ModalHeader>
                    <div>
                        <h3>Ver orden</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Id de la orden</label>
                        <input 
                            name="id" className='form-control' 
                            type='text' value={this.state.formOrdDetail.id} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Id de la orden</label>
                        <input 
                            name="id" className='form-control' 
                            type='text' value={this.state.formOrdDetail.id} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Fecha de registro</label>
                        <input 
                            name="registerDay" className='form-control' 
                            type='text' value={this.state.formOrdDetail.registerDay} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Estado</label>
                        <input 
                            name="status" className='form-control' 
                            type='text' value={this.state.formOrdDetail.status} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <h5>Datos del vendedor</h5>
                        <label>Id vendedor</label>
                        <input 
                            name="id" className='form-control' 
                            type='text' value={this.state.salesMan.id} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                        <label>Identificación del vendedor</label>
                        <input 
                            name="identification" className='form-control' 
                            type='text' value={this.state.salesMan.identification} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                        <label>Nombre</label>
                        <input 
                            name="name" className='form-control' 
                            type='text' value={this.state.salesMan.name} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                        <label>Fecha de nacimiento</label>
                        <input 
                            name="birthDay" className='form-control' 
                            type='text' value={this.state.salesMan.birthtDay} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                        <label>Mes de nacimiento</label>
                        <input 
                            name="monthBirthDay" className='form-control' 
                            type='text' value={this.state.salesMan.monthBirthtDay} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                        <label>Dirección</label>
                        <input 
                            name="address" className='form-control' 
                            type='text' value={this.state.salesMan.address} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                        <label>Número de celular</label>
                        <input 
                            name="cellPhone" className='form-control' 
                            type='text' value={this.state.salesMan.cellPhone} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                        <label>Email</label>
                        <input 
                            name="email" className='form-control' 
                            type='text' value={this.state.salesMan.email} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                        <label>Zona</label>
                        <input 
                            name="zone" className='form-control' 
                            type='text' value={this.state.salesMan.zone} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                        <label>Identificación del vendedor</label>
                        <input 
                            name="type" className='form-control' 
                            type='text' value={this.state.salesMan.type} 
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <h5>Datos de los productos</h5>
                        <lable>Referencias</lable>
                        <input 
                            className='form-control' 
                            type='text' value={Object.keys(this.state.formOrdDetail.products)}
                            onChange={this.handleChangeOrdDet} readOnly
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' size='sm' onClick={()=>this.closeModalDetailOrder()}>Cerrar</Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }
}

export default OrdersAdm;
