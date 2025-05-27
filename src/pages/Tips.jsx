import { useState, useEffect } from 'react';

function Tips() {
  const tips = [
    "Divide tus tareas grandes en partes pequeñas y manejables.",
    "Establece metas claras y medibles para cada día.",
    "Toma descansos cortos entre sesiones de trabajo (método Pomodoro).",
    "Prioriza tus tareas con la regla del 80/20 (Ley de Pareto).",
    "Evita las distracciones silenciando notificaciones mientras trabajas.",
    "Planifica tu día la noche anterior.",
    "Haz primero lo más difícil o importante (Eat That Frog).",
    "Lleva un registro de tus logros para mantenerte motivado.",
    "Mantén tu espacio de trabajo limpio y organizado.",
    "Desconéctate del trabajo al final del día para recargar energía."
  ];

  const [currentTip, setCurrentTip] = useState('');

  // Mostrar un consejo aleatorio al cargar la página
  useEffect(() => {
    getRandomTip();
  }, []);

  const getRandomTip = () => {
    const index = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[index]);
  };

  return (
    <div className="home">
      <h1>🧠 Consejos de Productividad</h1>
      <p style={{ fontSize: '1.2rem', marginTop: '2rem' }}>{currentTip}</p>

      <button
        onClick={getRandomTip}
        style={{
          marginTop: '1.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Otro consejo 🔄
      </button>
    </div>
  );
}

export default Tips;
