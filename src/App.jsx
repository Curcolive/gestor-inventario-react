import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'; // ¡Lo volvemos a importar aquí!
import NavigationBar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import CreatePage from './pages/CreatePage/CreatePage.jsx';
import DetailPage from './pages/DetailPage/DetailPage.jsx';
import EditPage from './pages/EditPage/EditPage.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 app-body">
        <NavigationBar />
        
        {/* Este es el cambio más importante */}
        {/* Ponemos un Container aquí para centrar y dar márgenes a TODAS las páginas */}
        <Container as="main" className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/crear" element={<CreatePage />} />
            <Route path="/producto/:id" element={<DetailPage />} />
            <Route path="/editar/:id" element={<EditPage />} />
            <Route path="*" element={<h2>404 - Página No Encontrada</h2>} />
          </Routes>
        </Container>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;