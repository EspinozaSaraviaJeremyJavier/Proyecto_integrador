// Importa React y hooks para estado y efectos.
import React, { useState, useEffect } from 'react';

// Importa Swiper para carruseles.
import { Swiper, SwiperSlide } from 'swiper/react';

// Importa módulos de Swiper para navegación y autoplay.
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importa useNavigate para navegación.
import { useNavigate } from 'react-router-dom';

// Importa estilos de Swiper.
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importa CSS local.
import './App.css';

// Componente principal de la app.
function App() {
  // Estado para productos.
  const [productos, setProductos] = useState([]);

  // Estado para nombre en comentario.
  const [nombre, setNombre] = useState('');

  // Estado para texto del comentario.
  const [comentario, setComentario] = useState('');

  // Estado para mensajes de feedback.
  const [mensaje, setMensaje] = useState('');

  // Hook para navegación.
  const navigate = useNavigate();

  // Carga productos al montar el componente.
  useEffect(() => {
    // Fetch productos de la API.
    fetch("http://localhost:8081/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.log("Conecta el backend para ver productos reales"));
  }, []);

  // Define la función handleComentario, manejadora del envío de comentario.
  // Previene el comportamiento por defecto del formulario.
  // Verifica que nombre y comentario no estén vacíos.
  // Por qué: Para enviar datos al backend.
  // Si no: El comentario no se enviaría.
  const handleComentario = (e) => {
    e.preventDefault();
    if (!nombre || !comentario) return;

    // Envía petición POST a la API con headers JSON y body con datos.
    // Si respuesta es ok, muestra mensaje de éxito y limpia campos.
    // Si no, lanza error y muestra mensaje de error.
    // Por qué: Para guardar comentario en la base de datos.
    // Si no: El comentario no se guardaría.
    fetch("http://localhost:8081/api/enviar-comentario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombre,
        contenido: comentario
      })
    })
      .then(res => {
        if (res.ok) {
          setMensaje("¡Comentario enviado! Será revisado pronto.");
          setNombre('');
          setComentario('');
        } else {
          throw new Error();
        }
      })
      .catch(() => setMensaje("Error al enviar. Intenta más tarde."));
  };

  // Renderiza la interfaz.
  return (
    // Contenedor principal.
    <div className="home-container">

      {/* Navbar */}
      <nav className="navbar-custom">
        {/* Logo y marca */}
        <div className="brand-logo">
          <img src="/imagenes/logo.png" alt="Logo" className="logo-img" />
          <div className="brand-text">
            <span className="brand-main">PINK CREAM</span>
            <span className="brand-sub">& SWEET ♥</span>
            <span className="brand-tag">— PASTELES QUE ENAMORAN —</span>
          </div>
        </div>
        {/* Menú */}
        <div className="nav-menu">
          <span>INICIO</span>
          <span>PRODUCTOS</span>
          <span>OFERTAS</span>
          <span>NOSOTROS</span>
        </div>
        {/* Elementos derecha */}
        <div className="nav-right">
          {/* Búsqueda */}
          <div className="search-box">
            <input type="text" placeholder="" />
            <i className="fas fa-search"></i>
          </div>
          {/* Usuario */}
          <i className="fas fa-user-circle icon-nav" onClick={() => navigate('/login')}></i>
          {/* Carrito */}
          <i className="fas fa-shopping-cart icon-nav"></i>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="breadcrumb-dot">●</span>
        <span className="breadcrumb-text">INICIO</span>
      </div>

      {/* ── LOGO CENTRAL ── */}
      {/* Logo central */}
      <div className="center-logo">
        <img src="/imagenes/logo.png" alt="Pink Cream & Sweet" />
        <div className="center-logo-text">
          <div className="cl-rosa">PINK</div>
          <div className="cl-crema">CREAM</div>
          <div className="cl-dulce">& Sweet <span>♥</span></div>
          <div className="cl-tag">— PASTELES QUE ENAMORAN —</div>
        </div>
      </div>

      {/* Carrusel de especiales */}
      <section className="special-slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="slide-content slide-pink">
              <div className="slide-img">
                <img src="/imagenes/inicio.jpg" alt="Especial 1" />
              </div>
              <div className="slide-text">
                <h1>Nuestros<br />Especiales</h1>
                <p>Especiales para cualquier ocasión y disfrutar con las personas que mas quieres</p>
                <button className="btn-white">Ver más</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content slide-alt">
              <div className="slide-img">
                <img src="/imagenes/glaceado_espejo.jpg" alt="Especial 2" />
              </div>
              <div className="slide-text">
                <h1>Nuevos<br />Sabores</h1>
                <p>Prueba nuestra nueva línea de temporada con ingredientes naturales.</p>
                <button className="btn-white">Ver más</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content slide-alt2">
              <div className="slide-img">
                <img src="/imagenes/search_app.jpg" alt="Especial 3" />
              </div>
              <div className="slide-text">
                <h1>Momentos<br />Dulces</h1>
                <p>Haz que cada celebración sea inolvidable con nosotros.</p>
                <button className="btn-white">Ver más</button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Lo más comprado */}
      <section className="section-bought">
        <h2 className="section-title">LO MÁS COMPRADO</h2>
        <div className="products-grid">
          {productos.length > 0 ? productos.slice(0, 6).map(p => (
            <div key={p.id} className="product-card">
              <img src={`data:image/jpeg;base64,${p.imagen}`} alt={p.nombre} />
              <div className="product-label">{p.nombre}</div>
            </div>
          )) : (
            <p>Cargando productos...</p>
          )}
        </div>
        <div className="center-btn">
          <button className="btn-simple">Ver más</button>
        </div>
      </section>

      {/* Promociones festivas */}
      <section className="festivity-section">
        <h2 className="section-title">Promociones de Festividad</h2>
        <div className="fest-banner christmas">
          <div className="fest-text">
            <h2>POSTRES para acompañar esta NAVIDAD</h2>
            <p>Mira los mejores postres para esta navidad y pasar tiempo en familia inolvidable.</p>
            <button className="btn-white-small">Ver más</button>
          </div>
          <div className="fest-img">
            <img src="/imagenes/navidad.jpeg" alt="Navidad" />
          </div>
        </div>
        <div className="fest-banner halloween">
          <div className="fest-text">
            <h2>POSTRES para disfrutar en HALLOWEEN</h2>
            <p>Descubre nuestros deliciosos postres para Halloween y organiza una fiesta espeluznante</p>
            <button className="btn-white-small">Ver más</button>
          </div>
          <div className="fest-img">
            <img src="/imagenes/halloween.jpeg" alt="Halloween" />
          </div>
        </div>
        <div className="center-btn">
          <button className="btn-simple">Ver más</button>
        </div>
      </section>

      {/* ── 4. DEJA TU COMENTARIO ── */}
      {/* Sección de comentarios. */}
      {/* Por qué: Permite feedback de usuarios. */}
      {/* Si no: No habría formulario de comentarios. */}
      <section className="comment-section">
        <h2 className="section-title">Deja tu comentario</h2>
        {/* Formulario de comentario. */}
        {/* Muestra mensaje si existe. */}
        {/* Por qué: Captura y envía comentarios. */}
        {/* Si no: No se podrían dejar comentarios. */}
        <div className="comment-form">
          {mensaje && <p className="form-mensaje">{mensaje}</p>}
          <div className="input-group">
            <label>NOMBRE</label>
            <input
              type="text"
              placeholder="Escribe tu nombre completo"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Deja un comentario"
            value={comentario}
            onChange={e => setComentario(e.target.value)}
          ></textarea>
          <div className="right-align">
            <button className="btn-submit" onClick={handleComentario}>COMENTAR</button>
          </div>
        </div>
        <div className="comments-display">
          <div className="comment-card">
            <div className="user-header">Juliana López</div>
            <div className="user-text">Sus paquetes son ideales para regalar sorpresas.</div>
          </div>
          <div className="comment-card">
            <div className="user-header">Emilio Orozco</div>
            <div className="user-text">Entregan a tiempo y con buena calidad cada postre.</div>
          </div>
          <div className="comment-card">
            <div className="user-header">Valentina Gómez</div>
            <div className="user-text">Tienen ricos sabores y los productos llegan a tiempo.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-custom">
        <h3>CONTACTO</h3>
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-whatsapp"></i>
        </div>
      </footer>

    </div>
  );
}

// Exporta componente App.
export default App;