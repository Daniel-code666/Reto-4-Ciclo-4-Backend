// import React, {useState, useEffect} from 'react'
import React from 'react';
import '../usersTable/UsersTable.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

class UsersTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users:[], 
            user:[],
            products:[],
            form: {
                id: null,
                identification: '',
                name: '',
                birthtDay: null,
                monthBirthtDay: null,
                address: '',
                cellPhone: '',
                email: '',
                password: '',
                zone: '',
                type: ''
            },
            formProd: {
                reference: '',
                brand: '',
                category: '',
                name: '',
                description: '',
                availability: true,
                price: null,
                quantity: null,
                photography: ''
            },
            modalInsert: false,
            modalInsertCoord: false,
            modalInsertProd: false,
            modalEditarUser: false,
            modalEditarProd: false
        };
    }

    // peticiones para recuperar el prefil a través del id logeado, la lista de los usuarios registrados y
    // la lista de productos en la BD, se llama cuando se abre el componente o se recarga la página
    componentDidMount(){
        fetch("http://129.151.116.250:8080/api/user/all")
        .then(resp => resp.json())
        .then(resp => this.setState({users:resp}));
        
        fetch("http://129.151.116.250:8080/api/user/" + localStorage.getItem('idUser'))
        .then(response => response.json())
        .then(response => this.setState({user:response}));

        fetch("http://129.151.116.250:8080/api/hairproducts/all")
        .then(resp => resp.json())
        .then(resp => this.setState({products: resp}));
    }

    // petición para recuperar solo la lista de usuarios registrados
    getUsers(){
        fetch("http://129.151.116.250:8080/api/user/all")
        .then(resp => resp.json())
        .then(resp => this.setState({users:resp}));
    }

    // petición que recupera solo la lista de productos en la BD
    getProducts(){
        fetch("http://129.151.116.250:8080/api/hairproducts/all")
        .then(resp => resp.json())
        .then(resp => this.setState({products: resp}));
    }

    // recupera los datos insertados en los inputs de las ventanas modales de asesor y coordinador
    handleChange = e =>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value,
            }
        });
    }

    // recupera los datos del formulario de agregar producto (modal producto)
    handleChangeProd = e =>{
        this.setState({
            formProd:{
                ...this.state.formProd,
                [e.target.name]:e.target.value,
            }
        })
    }

    // muestra el modal para insertar el asesor
    showModalInsert=()=>{
        this.setState({modalInsert: true});
    }

    // cierra el modal de insertar asesor
    closeModalInsert=()=>{
        this.setState({modalInsert: false});
    }

    // abre le modal para insertar el coordinador
    showModalInsertCoord=()=>{
        this.setState({modalInsertCoord: true});
    }

    // cierra el modal para insertar el coord
    closeModalInsertCoord=()=>{
        this.setState({modalInsertCoord: false});
    }

    // abre modal para actualizar usuario
    showModalEditarUser=(registro)=>{
        this.setState({modalEditarUser: true, form: registro});
    }

    // cierra modal para actualizar usuario
    closeModalEditarUser=()=>{
        this.setState({modalEditarUser: false});
    }

    // abre modal producto
    showModalInsertProd=()=>{
        this.setState({modalInsertProd: true});
    }

    // cierra modal producto
    closeModalInsertProd=()=>{
        this.setState({modalInsertProd: false});
    }

    // abre modal para actualizar producto
    showModalEditarProd=(registro)=>{
        this.setState({modalEditarProd: true, formProd: registro});
    }

    // cierra modal para actualizar producto
    closeModalEditarProd=()=>{
        this.setState({modalEditarProd: false});
    }

    // función para insertar el nuevo asesor a la BD
    insertNewAse=()=>{
        var user = {...this.state.form};
        user.id = Number(user.id);
        user.type = 'ASE';

        if(this.state.form.identification === '' || this.state.form.email === '' || this.state.form.password === ''
            || this.state.form.id === ''){
                alert('Debe ingresar todos los campos')
            }else{
                fetch('http://129.151.116.250:8080/api/user/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: user.id,
                        identification: user.identification,
                        name: user.name,
                        birthtDay: user.birthtDay,
                        monthBirthtDay: user.monthBirthtDay,
                        address: user.address,
                        cellPhone: user.cellPhone,
                        email: user.email,
                        password: user.password,
                        zone: user.zone,
                        type: user.type
                    })
                })
                .then(response => {
                    if(response.status !== 201){
                        alert('Ocurrió un problema');
                    }else{
                        this.setState({modalInsert: false})
                        this.getUsers();
                        alert('Asesor creado');
                    }
                });
            }
    }

    // función para insertar el nuevo coordinador a la BD
    insertNewCoord=()=>{
        var user = {...this.state.form};
        user.id = Number(user.id);
        user.type = 'COORD';

        if(this.state.form.identification === '' || this.state.form.email === '' || this.state.form.password === ''
            || this.state.form.id === ''){
                alert('Debe ingresar todos los campos')
            }else{
                fetch('http://129.151.116.250:8080/api/user/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: user.id,
                        identification: user.identification,
                        name: user.name,
                        birthtDay: user.birthtDay,
                        monthBirthtDay: user.monthBirthtDay,
                        address: user.address,
                        cellPhone: user.cellPhone,
                        email: user.email,
                        password: user.password,
                        zone: user.zone,
                        type: user.type
                    })
                })
                .then(response => {
                    if(response.status !== 201){
                        alert('Ocurrió un problema');
                    }else{
                        this.setState({modalInsertCoord: false})
                        this.getUsers();
                        alert('Coordinador creado');
                    }
                });
            }
    }

    // función para editar usuario
    editarUser=()=>{
        var user = {...this.state.form};
        user.id = Number(user.id);

        if(this.state.form.identification === '' || this.state.form.email === '' || this.state.form.password === ''
            || this.state.form.id === ''){
                alert('Debe ingresar todos los campos')
            }else{
                console.log(user);
                fetch('http://129.151.116.250:8080/api/user/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: user.id,
                        identification: user.identification,
                        name: user.name,
                        birthtDay: user.birthtDay,
                        monthBirthtDay: user.monthBirthtDay,
                        address: user.address,
                        cellPhone: user.cellPhone,
                        email: user.email,
                        password: user.password,
                        zone: user.zone,
                        type: user.type
                    })
                })
                .then(response => {
                    if(response.status !== 201){
                        alert('Ocurrió un problema');
                    }else{
                        this.setState({modalEditarUser: false})
                        this.componentDidMount();
                        alert('Usuario actualizado');
                    }
                });
            }
    }

    // función para eliminar un usuario
    deleteUser=(id)=>{
        fetch('http://129.151.116.250:8080/api/user/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status !== 204){
                alert('Ocurrió un problema')
            }else{
                this.componentDidMount();
                alert('Usuario eliminado');
            }
        });
    }

    // función para insertar nuevo producto
    insertNewProd=()=>{
        var prod = {...this.state.formProd};
        prod.price = Number(prod.price);
        prod.quantity = Number(prod.quantity);

        if(this.state.formProd.reference === ''){
                alert('Debe ingresar todos los campos')
            }else{
                fetch('http://129.151.116.250:8080/api/hairproducts/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        reference: prod.reference,
                        brand: prod.brand,
                        category: prod.category,
                        name: prod.name,
                        description: prod.description,
                        availability: prod.availability,
                        price: prod.price,
                        quantity: prod.quantity,
                        photography: prod.photography
                    })
                })
                .then(response => {
                    if(response.status !== 201){
                        alert('Ocurrió un problema');
                    }else{
                        this.setState({modalInsertProd: false})
                        this.getProducts();
                        alert('Producto creado');
                    }
                });
            }
    }

    // función para actualizar producto
    editarProd=()=>{
        var prod = {...this.state.formProd};
        prod.price = Number(prod.price);
        prod.quantity = Number(prod.quantity);

        if(this.state.formProd.reference === ''){
                alert('Debe ingresar todos los campos')
            }else{
                fetch('http://129.151.116.250:8080/api/hairproducts/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        reference: prod.reference,
                        brand: prod.brand,
                        category: prod.category,
                        name: prod.name,
                        description: prod.description,
                        availability: prod.availability,
                        price: prod.price,
                        quantity: prod.quantity,
                        photography: prod.photography
                    })
                })
                .then(response => {
                    if(response.status !== 201){
                        alert('Ocurrió un problema');
                    }else{
                        this.setState({modalEditarProd: false})
                        this.getProducts();
                        alert('Producto actualizado');
                    }
                });
            }
    }

    // función para eliminar un producto
    deleteProd=(reference)=>{
        fetch("http://129.151.116.250:8080/api/hairproducts/" + reference, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status !== 204){
                alert('Ocurrió un problema')
            }else{
                this.getProducts();
                alert('Producto eliminado');
            }
        });
    }

    render() {
        return (
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

            {/* sección tabla de usuarios registrados */}
            <Container>
                <div className="alinear">
                    <h1>Lista de usuarios</h1>
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
                            {this.state.users.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.identification}</td>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.type}</td>
                                    <td>{element.zone}</td>
                                    <td>
                                        <Button 
                                            color="warning" size="sm" className='espacio' 
                                            onClick={()=>this.showModalEditarUser(element)}>
                                                Editar
                                        </Button>
                                        <Button color="danger" size="sm" 
                                        onClick={()=>this.deleteUser(element.id)}>
                                            Borrar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <div className='row'>
                    <div className='column alinear'>
                        <Button color='primary' size='sm' onClick={()=>this.showModalInsert()}>Agregar asesor</Button>
                    </div>
                    <div className='column alinear'>
                        <Button color='primary' size='sm' onClick={()=>this.showModalInsertCoord()}>Agregar coordinador</Button>
                    </div>
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
                                            Editar
                                        </Button>
                                        <Button color="danger" size="sm"
                                        onClick={()=>this.deleteProd(element.reference)}>
                                            Borrar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <div className='row'>
                    <div className='column alinear'>
                        <Button color='primary' size='sm' onClick={()=>this.showModalInsertProd()}>Agregar producto</Button>
                    </div>
                </div>
                <br></br>
            </Container>

            {/* sección ventana modal para registrar nuevos asesores */}
            <Modal isOpen={this.state.modalInsert}>
                <ModalHeader>
                    <div>
                        <h3>Agregar asesor</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Id usuario</label>
                        <input name="id" className='form-control' type='number' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Identificación</label>
                        <input name="identification" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre</label>
                        <input name="name" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Fecha de cumpleaños</label>
                        <input name="birthtDay" className='form-control' type='date' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Mes de cumpleaños</label>
                        <input name="monthBirthtDay" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Dirección</label>
                        <input name="address" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Celular</label>
                        <input name="cellPhone" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Email</label>
                        <input name="email" className='form-control' type='email' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Contraseña</label>
                        <input name="password" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Zona</label>
                        <input name="zone" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='success' size='sm' onClick={()=>this.insertNewAse()}>Guardar</Button>
                    <Button color='danger' size='sm' onClick={()=>this.closeModalInsert()}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            {/* sección ventana modal para registrar nuevos coordinadores */}
            <Modal isOpen={this.state.modalInsertCoord}>
                <ModalHeader>
                    <div>
                        <h3>Agregar coordinador</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Id usuario</label>
                        <input name="id" className='form-control' type='number' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Identificación</label>
                        <input name="identification" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre</label>
                        <input name="name" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Fecha de cumpleaños</label>
                        <input name="birthtDay" className='form-control' type='date' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Mes de cumpleaños</label>
                        <input name="monthBirthtDay" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Dirección</label>
                        <input name="address" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Celular</label>
                        <input name="cellPhone" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Email</label>
                        <input name="email" className='form-control' type='email' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Contraseña</label>
                        <input name="password" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Zona</label>
                        <input name="zone" className='form-control' type='text' onChange={this.handleChange}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='success' size='sm' onClick={()=>this.insertNewCoord()}>Guardar</Button>
                    <Button color='danger' size='sm' onClick={()=>this.closeModalInsertCoord()}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            { /* Modal para editar usuario */}
            <Modal isOpen={this.state.modalEditarUser}>
                <ModalHeader>
                    <div>
                        <h3>Editar usuario</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Id usuario</label>
                        <input 
                            name="id" className='form-control' 
                            type='number' value={this.state.form.id} 
                            onChange={this.handleChange} readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Identificación</label>
                        <input 
                            name="identification" className='form-control' 
                            type='text' onChange={this.handleChange}
                            value={this.state.form.identification}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre</label>
                        <input 
                            name="name" className='form-control' 
                            type='text' onChange={this.handleChange}
                            value={this.state.form.name}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Fecha de cumpleaños</label>
                        <input 
                            name="birthtDay" className='form-control' 
                            type='date' onChange={this.handleChange}
                            value={this.state.form.birthtDay}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Mes de cumpleaños</label>
                        <input 
                            name="monthBirthtDay" className='form-control' 
                            type='text' onChange={this.handleChange}
                            value={this.state.form.monthBirthtDay}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Dirección</label>
                        <input 
                            name="address" className='form-control' 
                            type='text' onChange={this.handleChange}
                            value={this.state.form.address}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Celular</label>
                        <input 
                            name="cellPhone" className='form-control' 
                            type='text' onChange={this.handleChange}
                            value={this.state.form.cellPhone}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Email</label>
                        <input 
                            name="email" className='form-control' 
                            type='email' onChange={this.handleChange}
                            value={this.state.form.email}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Contraseña</label>
                        <input 
                            name="password" className='form-control' 
                            type='text' onChange={this.handleChange}
                            value={this.state.form.password} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Zona</label>
                        <input 
                            name="zone" className='form-control' 
                            type='text' onChange={this.handleChange}
                            value={this.state.form.zone}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Rol</label>
                        {this.state.form.type === 'ASE' ? <div>
                                <input name="type" className='form-control' value={this.state.form.type} readOnly />
                            </div> : null
                        }
                        {this.state.form.type === 'COORD' ? <div>
                                <input name="type" className='form-control' value={this.state.form.type} readOnly />
                            </div> : null
                        }
                        {this.state.form.type === 'ADM' ? <div>
                                <input name="type" className='form-control' value={this.state.form.type} readOnly />
                            </div> : null
                        }
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='success' size='sm' onClick={()=>this.editarUser()}>Guardar</Button>
                    <Button color='danger' size='sm' onClick={()=>this.closeModalEditarUser()}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            {/* sección ventana modal para registrar nuevos productos */}
            <Modal isOpen={this.state.modalInsertProd}>
                <ModalHeader>
                    <div>
                        <h3>Agregar producto</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Referencia</label>
                        <input name="reference" className='form-control' type='text' onChange={this.handleChangeProd}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Marca</label>
                        <input name="brand" className='form-control' type='text' onChange={this.handleChangeProd}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Categoría</label>
                        <input name="category" className='form-control' type='text' onChange={this.handleChangeProd}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre</label>
                        <input name="name" className='form-control' type='text' onChange={this.handleChangeProd}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Descripción</label>
                        <input name="description" className='form-control' type='text' onChange={this.handleChangeProd}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Disponibilidad</label>
                        <select name="availability" onChange={this.handleChangeProd}>
                            <option value="true" defaultValue={"true"}>Disponible</option>
                            <option value="false">No disponible</option>
                        </select>
                        {/*<input name="" className='form-control' type='text' onChange={this.handleChange}/>*/}
                    </FormGroup>
                    <FormGroup>
                        <label>Precio</label>
                        <input name="price" className='form-control' type='number' onChange={this.handleChangeProd}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Cantidad</label>
                        <input name="quantity" className='form-control' type='number' onChange={this.handleChangeProd}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Fotografía</label>
                        <input name="photography" className='form-control' type='text' onChange={this.handleChangeProd}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='success' size='sm' onClick={()=>this.insertNewProd()}>Guardar</Button>
                    <Button color='danger' size='sm' onClick={()=>this.closeModalInsertProd()}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            { /* Modal para editar producto */}
            <Modal isOpen={this.state.modalEditarProd}>
                <ModalHeader>
                    <div>
                        <h3>Editar producto</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Referencia</label>
                        <input 
                            name="reference" className='form-control' 
                            type='text' value={this.state.formProd.reference} 
                            onChange={this.handleChangeProd} readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Marca</label>
                        <input 
                            name="brand" className='form-control' 
                            type='text' value={this.state.formProd.brand} 
                            onChange={this.handleChangeProd}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Categoría</label>
                        <input 
                            name="category" className='form-control' 
                            type='text' value={this.state.formProd.category} 
                            onChange={this.handleChangeProd}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre</label>
                        <input 
                            name="name" className='form-control' 
                            type='text' value={this.state.formProd.name} 
                            onChange={this.handleChangeProd}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Descripción</label>
                        <input 
                            name="description" className='form-control' 
                            type='text' value={this.state.formProd.description} 
                            onChange={this.handleChangeProd}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Disponibilidad</label>
                        <select name="availability" onChange={this.handleChangeProd}>
                            <option value="true" defaultValue={this.state.formProd.availability}>Disponible</option>
                            <option value="false">No disponible</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label>Precio</label>
                        <input 
                            name="price" className='form-control' 
                            type='number' value={this.state.formProd.price} 
                            onChange={this.handleChangeProd}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Cantidad</label>
                        <input 
                            name="quantity" className='form-control' 
                            type='number' value={this.state.formProd.quantity} 
                            onChange={this.handleChangeProd}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Fotografía</label>
                        <input 
                            name="photografy" className='form-control' 
                            type='text' value={this.state.formProd.photography} 
                            onChange={this.handleChangeProd}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='success' size='sm' onClick={()=>this.editarProd()}>Guardar</Button>
                    <Button color='danger' size='sm' onClick={()=>this.closeModalEditarProd()}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }
}

/* const UsersTable = () => {
    const [data, setData] = useState([]);
    const [dataP, setDataP] = useState([]);

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
} */

export default UsersTable;