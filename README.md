# 📦 Inventario PRO

Sistema de gestión de inventario desarrollado con **React** y **Firebase**. Permite administrar productos con operaciones CRUD completas, filtros avanzados y una interfaz moderna y responsiva.

> 🎓 **Proyecto Final** — Desarrollo Web · Carlos Abalos

---

## ✨ Funcionalidades

- **Catálogo de productos** con búsqueda, filtrado por categoría y ordenamiento
- **CRUD completo**: Crear, ver detalle, editar y eliminar productos
- **Carrusel interactivo** de productos destacados en la página de inicio (Swiper)
- **Previsualización de imagen** en tiempo real al crear/editar productos
- **Modales de confirmación** para acciones destructivas y feedback de éxito/error
- **Diseño responsivo** optimizado para escritorio y móviles

---

## 🛠️ Tecnologías

| Categoría | Tecnología |
|-----------|------------|
| Frontend | React 19, React Router 7 |
| UI | React Bootstrap, React Icons |
| Base de datos | Firebase Firestore |
| Formularios | React Hook Form |
| Carrusel | Swiper.js |
| Deploy | Vercel |

---

## 📂 Estructura del Proyecto

```
src/
├── api/
│   └── products.js          # Funciones de acceso a Firestore
├── assets/
│   └── logo.svg             # Logo de la aplicación
├── components/
│   ├── Navbar/Navbar.jsx     # Barra de navegación
│   └── Footer/Footer.jsx    # Pie de página
├── pages/
│   ├── HomePage/             # Bienvenida + carrusel
│   ├── ProductosPage/        # Catálogo con filtros
│   ├── CreatePage/           # Formulario de creación
│   ├── EditPage/             # Formulario de edición
│   └── DetailPage/           # Detalle + eliminar
├── constants.js              # Categorías, formateador de moneda
├── firebaseConfig.js         # Configuración de Firebase
├── App.jsx                   # Rutas principales
├── App.css                   # Estilos globales
├── index.jsx                 # Punto de entrada
└── index.css                 # Bootstrap + tipografías
```

---

## 🚀 Instalación y Uso

### Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- Cuenta de [Firebase](https://console.firebase.google.com/) con Firestore habilitado

### Pasos

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/gestor-inventario.git
   cd gestor-inventario
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crear un archivo `.env` en la raíz del proyecto con tus credenciales de Firebase:

   ```env
   REACT_APP_API_KEY=tu_api_key
   REACT_APP_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   REACT_APP_PROJECT_ID=tu_proyecto
   REACT_APP_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
   REACT_APP_MESSAGING_SENDER_ID=tu_sender_id
   REACT_APP_APP_ID=tu_app_id
   ```

4. **Iniciar en modo desarrollo**

   ```bash
   npm start
   ```

   La aplicación se abrirá en [http://localhost:3000](http://localhost:3000).

5. **Generar build de producción** *(opcional)*

   ```bash
   npm run build
   ```

---

## 🌐 Deploy

La aplicación está desplegada en **Vercel**. Cada push a la rama principal dispara un deploy automático.

Las variables de entorno de Firebase deben configurarse en **Vercel → Settings → Environment Variables**.

---

## 📄 Licencia

Proyecto académico — Todos los derechos reservados © {año} Carlos Abalos.
