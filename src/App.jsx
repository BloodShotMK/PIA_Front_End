import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tasks from './pages/Tasks';
import About from './pages/About';
import Tips from './pages/Tips';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <header>
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#eee' }}>
          <Link to="/">Tareas</Link>
          <Link to="/about">Estadísticas</Link>
          <Link to="/tips">Consejos</Link>
          <Link to="/settings">Configuración</Link>
        </nav>
      </header>

      {/* Aquí va la región principal accesible */}
      <main>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/about" element={<About />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
