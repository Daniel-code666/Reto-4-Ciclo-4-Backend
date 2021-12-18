import React from 'react';
import {Table, Button, Container, FormGroup} from 'reactstrap';

class ClientPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
            formProdPrice:{
                price: null
            },
            formProdDesc:{
                description: ''
            }
        };
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/hairproducts/all")
        .then(resp => resp.json())
        .then(resp => this.setState({products: resp}));
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

    getProdByDesc=()=>{
        fetch("http://localhost:8080/api/hairproducts/description/" + this.state.formProdDesc.description)
        .then(data => data.json())
        .then(data => this.setState({products: data}));
    }

    getProdByPrice=()=>{
        console.log(this.state.formProdPrice);
        fetch("http://localhost:8080/api/hairproducts/price/" + Number(this.state.formProdPrice.price))
        .then(data => data.json())
        .then(data => this.setState({products: data}));
    }

    render(){
        return(
            <>
             {/* Tabla de productos registrados */}
            <Container>
                <div className="alinear">
                    <h3>Lista de productos</h3>
                </div>
                <br></br>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='text-center'>
                            <h5>Filtrar por descripción</h5>
                            <FormGroup>
                                <label className='espLabel'>Palabra clave</label>
                                <input name='description' className='inputSizeDesc esp' type="text" 
                                onChange={this.handleChangeGetProdByDesc}/>
                                <Button color='primary' size='sm' onClick={()=>this.getProdByDesc()}>
                                    Filtrar
                                </Button>
                            </FormGroup>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='text-center desplazarDiv'>
                            <h5>Filtrar por precio</h5>
                            <FormGroup>
                                <label className='espLabel'>Precio</label>
                                <input name='price' className='inputSizePrice esp' type='number' 
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
                                </tr>
                            ))}
                            </tbody>
                        </Table> : <h5 className='text-center'>No hay ningún registro</h5>
                    }
                </div>
            </Container>
            </>
        )
    }
}

export default ClientPage;