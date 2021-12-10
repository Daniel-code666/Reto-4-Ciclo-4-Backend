import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Menu from './components/elements/menu/Menu';

import { Container } from 'react-bootstrap';
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <Container className="contenedor" fluid>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Container>
  );
}

export default App;
