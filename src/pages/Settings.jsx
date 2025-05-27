import { useEffect, useState } from 'react';

function Settings() {
  const [darkMode, setDarkMode] = useState(() => {
    // Obtener preferencia guardada o por defecto falso
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className="settings-page">
      <h1> Configuración</h1>
      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        Activar modo oscuro
      </label>
    </div>
  );
}

export default Settings;
