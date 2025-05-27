import { useEffect, useState } from 'react';

function About() {
  const [tasks, setTasks] = useState([]);
  const [monthStats, setMonthStats] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    const stats = Array(12).fill(0);

    tasks.forEach(task => {
      const month = new Date(task.date).getMonth();
      stats[month]++;
    });

    setMonthStats(stats);
  }, [tasks]);

  return (
    <div>
      <h2>Estadísticas de Tareas</h2>
      <ul>
        {monthStats.map((count, index) => (
          <li key={index}>
            {new Date(0, index).toLocaleString('es-ES', { month: 'long' })}: {count} tareas
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About;
