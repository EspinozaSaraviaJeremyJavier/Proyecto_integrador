# Sweet Cream Pink & Sweet

Sistema integral para la gestión y venta de productos de repostería. Este proyecto permite a los usuarios explorar catálogos de productos, registrarse, iniciar sesión y dejar comentarios, mientras que el backend gestiona la persistencia de datos y la seguridad.

---

##  Tecnologías Utilizadas

### Backend
* **Java 17** con **Spring Boot 3.4.1**.
* **Spring Data JPA**: Para la persistencia en base de datos.
* **Spring Security**: Implementación de `BCrypt` para encriptación de contraseñas.
* **MySQL**: Base de datos relacional.[cite: 1]
* **Thymeleaf**: Para vistas de administración integradas.[cite: 1]

### Frontend
* **React**: Biblioteca principal para la interfaz de usuario.[cite: 1]
* **React Router**: Para la navegación entre Inicio, Login y Registro.[cite: 1]
* **Swiper.js**: Para carruseles dinámicos de promociones.[cite: 1]
* **Fetch API**: Para el consumo de los endpoints del backend.[cite: 1]

---

## Estructura del Proyecto

### Backend (`demoSpringBoot`)
* **`controllers/`**: Maneja las peticiones API REST y las rutas de navegación.[cite: 1]
* **`entities/`**: Modelos de base de datos (`Usuario`, `Producto`, `Comentario`).[cite: 1]
* **`repositories/`**: Interfaces JPA para CRUD automático.[cite: 1]
* **`config/`**: Configuración de seguridad y Beans de encriptación.[cite: 1]

### Frontend (`React App`)
* **`App.js`**: Página principal con catálogo y sección de comentarios.[cite: 1]
* **`Login.js` / `Registro.js`**: Gestión de autenticación con validaciones en tiempo real.[cite: 1]
* **`index.js`**: Configuración del enrutador principal (`BrowserRouter`).[cite: 1]

---

## Endpoints de la API

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Autentica usuarios y devuelve su rol (ADMIN/CLIENTE).[cite: 1] |
| `POST` | `/api/auth/registrar` | Registra nuevos usuarios con contraseñas encriptadas.[cite: 1] |
| `GET` | `/api/productos` | Obtiene la lista de productos e imágenes en Base64.[cite: 1] |
| `POST` | `/api/enviar-comentario` | Envía comentarios para revisión del administrador.[cite: 1] |

---

## Configuración

### 1. Base de Datos (MySQL)
Base de datos en MySQL "Reposteria"

### 2. Ejecutar Backend
Correr el proyecto de netbenas

### 3. Ejecutar Frontend
Desde el cmd:
cd frontend-pink-sweet
npm start