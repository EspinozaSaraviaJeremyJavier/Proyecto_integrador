// Importa React y hooks useState y useEffect de la librería React.
// useState permite manejar estado en componentes funcionales.
// useEffect ejecuta efectos secundarios, como llamadas a API.
// Por qué: Necesarios para crear componentes dinámicos y manejar datos.
// Si no: No se podría manejar estado ni efectos, el componente sería estático.
import React, { useState, useEffect } from 'react';

// Importa componentes Swiper y SwiperSlide de la librería swiper/react.
// Permiten crear carruseles interactivos.
// Por qué: Para mostrar productos o imágenes en un slider.
// Si no: No habría carrusel, solo imágenes estáticas.
import { Swiper, SwiperSlide } from 'swiper/react';

// Importa módulos Navigation, Pagination y Autoplay de swiper/modules.
// Agregan navegación, paginación y reproducción automática al carrusel.
// Por qué: Mejora la experiencia del usuario en el slider.
// Si no: El carrusel sería básico sin controles ni auto-play.
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importa useNavigate de react-router-dom.
// Permite navegar programáticamente entre rutas.
// Por qué: Para redirigir al usuario, como al login.
// Si no: No se podría cambiar de página desde el código.
import { useNavigate } from 'react-router-dom';

// Importa estilos CSS de Swiper para navegación y paginación.
// Por qué: Aplica estilos predeterminados al carrusel.
// Si no: El carrusel no tendría estilos visuales.
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importa el archivo CSS local App.css.
// Contiene estilos personalizados para el componente.
// Por qué: Define la apariencia visual de la app.
// Si no: La app no tendría estilos, se vería sin formato.
import './App.css';

// Define el componente funcional App.
// Es el componente principal de la aplicación.
// Por qué: React funciona con componentes, este es el raíz.
// Si no: No habría interfaz de usuario.
function App() {
  // Declara estado productos con useState, inicializado como array vacío.
  // Almacena la lista de productos obtenidos de la API.
  // Por qué: Para mostrar productos dinámicamente.
  // Si no: No se podrían mostrar productos, solo contenido estático.
  const [productos, setProductos] = useState([]);

  // Declara estado nombre con useState, inicializado como string vacío.
  // Almacena el nombre del usuario en el formulario de comentario.
  // Por qué: Para capturar entrada del usuario.
  // Si no: El formulario no recordaría el nombre.
  const [nombre, setNombre] = useState('');

  // Declara estado comentario con useState, inicializado como string vacío.
  // Almacena el texto del comentario del usuario.
  // Por qué: Para capturar el comentario.
  // Si no: No se guardaría el texto del comentario.
  const [comentario, setComentario] = useState('');

  // Declara estado mensaje con useState, inicializado como string vacío.
  // Muestra mensajes de éxito o error al enviar comentario.
  // Por qué: Para feedback al usuario.
  // Si no: El usuario no sabría si el envío funcionó.
  const [mensaje, setMensaje] = useState('');

  // Obtiene la función navigate de useNavigate.
  // Permite navegación programática.
  // Por qué: Para ir a la página de login al hacer clic.
  // Si no: No se podría navegar desde el código.
  const navigate = useNavigate();

  // useEffect ejecuta el código dentro al montar el componente (array vacío como dependencia).
  // Hace una petición fetch a la API para obtener productos.
  // Por qué: Para cargar datos al inicio.
  // Si no: Los productos no se cargarían automáticamente.
  useEffect(() => {
    // Fetch obtiene datos de la URL de la API.
    // Convierte la respuesta a JSON y actualiza el estado productos.
    // En caso de error, muestra mensaje en consola.
    // Por qué: Para obtener productos del backend.
    // Si no: No habría productos, solo placeholder.
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

  // Retorna el JSX que renderiza la interfaz.
  // Es el contenido visual del componente.
  // Por qué: React renderiza JSX en el DOM.
  // Si no: No habría nada que mostrar.
  return (
    // Contenedor principal con clase CSS home-container.
    // Agrupa todo el contenido de la página.
    // Por qué: Para aplicar estilos globales.
    // Si no: El contenido no tendría contenedor.
    <div className="home-container">

      {/* ── NAVBAR ── */}
      {/* Barra de navegación con clase navbar-custom. */}
      {/* Contiene logo, menú y elementos de la derecha. */}
      {/* Por qué: Navegación del sitio. */}
      {/* Si no: No habría menú de navegación. */}
      <nav className="navbar-custom">
        {/* Contenedor del logo y texto de marca. */}
        {/* Muestra imagen y nombre de la empresa. */}
        {/* Por qué: Identidad visual. */}
        {/* Si no: No habría logo visible. */}
        <div className="brand-logo">
          {/* Imagen del logo con fuente /imagenes/logo.png. */}
          {/* Alt para accesibilidad. */}
          {/* Por qué: Representa la marca. */}
          {/* Si no: Falta imagen del logo. */}
          <img src="/imagenes/logo.png" alt="Logo" className="logo-img" />
          {/* Texto de la marca dividido en partes. */}
          {/* Por qué: Diseño estilizado. */}
          {/* Si no: Solo imagen sin texto. */}
          <div className="brand-text">
            <span className="brand-main">PINK CREAM</span>
            <span className="brand-sub">& SWEET ♥</span>
            <span className="brand-tag">— PASTELES QUE ENAMORAN —</span>
          </div>
        </div>
        {/* Menú de navegación con enlaces. */}
        {/* Por qué: Navegación a secciones. */}
        {/* Si no: No habría enlaces. */}
        <div className="nav-menu">
          <span>INICIO</span>
          <span>PRODUCTOS</span>
          <span>OFERTAS</span>
          <span>NOSOTROS</span>
        </div>
        {/* Elementos de la derecha: búsqueda, usuario, carrito. */}
        {/* Por qué: Funcionalidades rápidas. */}
        {/* Si no: Falta acceso a login y carrito. */}
        <div className="nav-right">
          {/* Caja de búsqueda con input e icono. */}
          {/* Por qué: Para buscar productos. */}
          {/* Si no: No habría búsqueda. */}
          <div className="search-box">
            <input type="text" placeholder="" />
            <i className="fas fa-search"></i>
          </div>
          {/* Icono de usuario que navega a /login al clic. */}
          {/* Por qué: Acceso a login. */}
          {/* Si no: No se podría ir a login. */}
          <i className="fas fa-user-circle icon-nav" onClick={() => navigate('/login')}></i>
          {/* Icono de carrito de compras. */}
          {/* Por qué: Representa el carrito. */}
          {/* Si no: No habría indicador de carrito. */}
          <i className="fas fa-shopping-cart icon-nav"></i>
        </div>
      </nav>

      {/* ── BREADCRUMB ── */}
      {/* Barra de migas de pan con punto y texto INICIO. */}
      {/* Por qué: Indica ubicación actual. */}
      {/* Si no: Usuario no sabe dónde está. */}
      <div className="breadcrumb-bar">
        <span className="breadcrumb-dot">●</span>
        <span className="breadcrumb-text">INICIO</span>
      </div>

      {/* ── LOGO CENTRAL ── */}
      {/* Logo central con imagen y texto. */}
      {/* Por qué: Elemento decorativo principal. */}
      {/* Si no: Falta logo en el centro. */}
      <div className="center-logo">
        <img src="/imagenes/logo.png" alt="Pink Cream & Sweet" />
        {/* Texto del logo dividido en líneas. */}
        {/* Por qué: Diseño visual atractivo. */}
        {/* Si no: Solo imagen. */}
        <div className="center-logo-text">
          <div className="cl-rosa">PINK</div>
          <div className="cl-crema">CREAM</div>
          <div className="cl-dulce">& Sweet <span>♥</span></div>
          <div className="cl-tag">— PASTELES QUE ENAMORAN —</div>
        </div>
      </div>

      {/* ── 1. CARRUSEL NUESTROS ESPECIALES ── */}
      {/* Sección del carrusel de especiales. */}
      {/* Por qué: Muestra productos destacados. */}
      {/* Si no: No habría slider de productos. */}
      <section className="special-slider">
        {/* Componente Swiper con módulos y configuraciones. */}
        {/* Espacio entre slides 0, 1 slide visible, navegación, paginación, autoplay cada 5s. */}
        {/* Por qué: Crea el carrusel interactivo. */}
        {/* Si no: No habría carrusel. */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="mySwiper"
        >
          {/* Primer slide con contenido de especial 1. */}
          {/* Imagen e texto promocional. */}
          {/* Por qué: Contenido del slider. */}
          {/* Si no: Falta slide. */}
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
          {/* Segundo slide similar. */}
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
          {/* Tercer slide. */}
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

      {/* ── 2. LO MÁS COMPRADO ── */}
      {/* Sección de productos más comprados. */}
      {/* Por qué: Muestra productos populares. */}
      {/* Si no: No habría sección de productos. */}
      <section className="section-bought">
        <h2 className="section-title">LO MÁS COMPRADO</h2>
        {/* Grid de productos, mapea los primeros 6 productos. */}
        {/* Si no hay productos, muestra "Cargando...". */}
        {/* Por qué: Renderiza productos dinámicos. */}
        {/* Si no: No se mostrarían productos. */}
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
        {/* Botón centrado para ver más. */}
        {/* Por qué: Enlace a más productos. */}
        {/* Si no: No habría opción de ver más. */}
        <div className="center-btn">
          <button className="btn-simple">Ver más</button>
        </div>
      </section>

      {/* ── 3. PROMOCIONES DE FESTIVIDAD ── */}
      {/* Sección de promociones festivas. */}
      {/* Por qué: Muestra ofertas especiales. */}
      {/* Si no: Falta contenido promocional. */}
      <section className="festivity-section">
        <h2 className="section-title">Promociones de Festividad</h2>

        {/* Banner de Navidad con texto e imagen. */}
        {/* Por qué: Promoción específica. */}
        {/* Si no: Falta banner. */}
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

        {/* Banner de Halloween similar. */}
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

        {/* Botón para ver más promociones. */}
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
          {/* Grupo de input para nombre. */}
          {/* Por qué: Campo obligatorio. */}
          {/* Si no: Falta nombre. */}
          <div className="input-group">
            <label>NOMBRE</label>
            <input
              type="text"
              placeholder="Escribe tu nombre completo"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          {/* Textarea para comentario. */}
          {/* Por qué: Campo de texto largo. */}
          {/* Si no: No se podría escribir comentario. */}
          <textarea
            placeholder="Deja un comentario"
            value={comentario}
            onChange={e => setComentario(e.target.value)}
          ></textarea>
          {/* Botón alineado a la derecha para enviar. */}
          {/* Por qué: Acción de envío. */}
          {/* Si no: No se enviaría. */}
          <div className="right-align">
            <button className="btn-submit" onClick={handleComentario}>COMENTAR</button>
          </div>
        </div>

        {/* Display de comentarios existentes (hardcodeados). */}
        {/* Por qué: Muestra comentarios previos. */}
        {/* Si no: No habría comentarios visibles. */}
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

      {/* ── FOOTER ── */}
      {/* Pie de página con contacto e iconos sociales. */}
      {/* Por qué: Información de contacto. */}
      {/* Si no: Falta footer. */}
      <footer className="footer-custom">
        <h3>CONTACTO</h3>
        {/* Iconos de redes sociales. */}
        {/* Por qué: Enlaces a perfiles. */}
        {/* Si no: No habría redes sociales. */}
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-whatsapp"></i>
        </div>
      </footer>

    </div>
  );
}

// Exporta el componente App como default.
// Por qué: Para importarlo en otros archivos.
// Si no: No se podría usar el componente.
export default App;