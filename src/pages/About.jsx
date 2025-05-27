import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#007bff', '#ff6b6b'];

const motivationalPhrases = [
  '¡Cada pequeño paso cuenta!',
  'Sigue adelante, lo estás haciendo genial.',
  'Organizar tu día es organizar tu éxito.',
  'La constancia vence al talento.',
  'Hazlo ahora, a veces “después” se convierte en “nunca”.'
];

function About() {
  const [tasks, setTasks] = useState([]);
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
    setPhrase(randomPhrase);
  }, []);

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const monthName = new Date(0, i).toLocaleString('es-ES', { month: 'long' });
    const count = tasks.filter(task => new Date(task.date).getMonth() === i).length;
    return { month: monthName, tareas: count };
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;

  const pieData = [
    { name: 'Completadas', value: completedCount },
    { name: 'Pendientes', value: pendingCount }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Estadísticas de Tareas</h2>
      <p style={{ fontStyle: 'italic', color: '#555' }}>{phrase}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Tareas por Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tareas" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Completadas vs Pendientes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default About;
