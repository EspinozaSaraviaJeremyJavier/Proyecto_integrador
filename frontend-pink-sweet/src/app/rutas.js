import { Routes, Route } from 'react-router-dom';
import Inicio from '../funcionalidades/inicio/Inicio';
import Login from '../funcionalidades/autenticacion/Login';
import Registro from '../funcionalidades/autenticacion/Registro';
import Perfil from '../funcionalidades/perfil/Perfil';
import Productos from '../funcionalidades/productos/Productos';
import Carrito from '../funcionalidades/carrito/Carrito';
import Ofertas from '../funcionalidades/ofertas/Ofertas';
import Nosotros from '../funcionalidades/nosotros/Nosotros';

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/ofertas" element={<Ofertas />} />
      <Route path="/nosotros" element={<Nosotros />} />
    </Routes>
  );
}

export default Rutas;
