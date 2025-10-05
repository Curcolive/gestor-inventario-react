import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Importación de componentes de layout reutilizables
import NavigationBar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';

// Importación de todas las vistas (páginas) de la aplicación
import HomePage from './pages/HomePage/HomePage.jsx';
import ProductosPage from './pages/ProductosPage/ProductosPage.jsx'; 
import CreatePage from './pages/CreatePage/CreatePage.jsx';
import DetailPage from './pages/DetailPage/DetailPage.jsx';
import EditPage from './pages/EditPage/EditPage.jsx';

// Estilos globales de la aplicación
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Contenedor principal que asegura que el footer se mantenga al final */}
      <div className="d-flex flex-column min-vh-100 app-body">
        <NavigationBar />
        
        {/* El contenido principal de la página se renderiza aquí */}
        <Container as="main" className="flex-grow-1 py-4">
          <Routes>
            {/* Definición de todas las rutas de la aplicación */}
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductosPage />} /> 
            <Route path="/crear" element={<CreatePage />} />
            <Route path="/producto/:id" element={<DetailPage />} />
            <Route path="/editar/:id" element={<EditPage />} />
            
            {/* Ruta comodín para manejar páginas no encontradas (404) */}
            <Route path="*" element={<h2 className="text-center">404 - Página No Encontrada</h2>} />
          </Routes>
        </Container>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;