import '../App.css';
import ClientPage from '../components/elements/client/ClientPage';

function Home(){
    return (
        <div>
            <div className='centrar'>
                <h1>Bienvenido a la tienda virtual La Divina Comedia</h1>
                <h5 className='justificar'>
                    <p>
                        En la lista de la parte inferior prodrá observar los productos disponibles 
                        y hacer un filtro por medio de algún término clave en la descripción del producto
                        o por el precio del producto.
                    </p>
                </h5>
            </div>

            <ClientPage />
        </div>
    );
}

export default Home;