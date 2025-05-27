import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Link } from "react-router-dom";

const COLORS = ["#8884d8", "#82ca9d", "#ff6666"];
const phrases = [
  "¡Sigue así! Un paso a la vez.",
  "La productividad es un hábito, no una meta.",
  "Hoy es un buen día para avanzar.",
  "Haz algo que tu futuro yo te agradezca.",
  "Las grandes metas se logran con pequeñas acciones."
];

function About() {
  const [tasks, setTasks] = useState([]);
  const [randomPhrase, setRandomPhrase] = useState("");

  const API_URL = "http://localhost:3000/tasks";

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
    
    // Frase motivacional aleatoria
    const random = Math.floor(Math.random() * phrases.length);
    setRandomPhrase(phrases[random]);
  }, []);

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const total = tasks.length;

  const pieData = [
    { name: "Completadas", value: completed },
    { name: "Pendientes", value: pending },
    { name: "Total", value: total }
  ];

  // Generar conteo por mes
  const monthCount = {};
  tasks.forEach(task => {
    const month = new Date(task.date || task.createdAt || Date.now()).toLocaleString('default', { month: 'short' });
    if (!monthCount[month]) monthCount[month] = 0;
    if (task.completed) monthCount[month]++;
  });

  const barData = Object.keys(monthCount).map(month => ({
    month,
    completadas: monthCount[month]
  }));

  return (
    <div className="home">
      <h1>Estadísticas</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%" cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width={350} height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completadas" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p style={{ fontStyle: 'italic', marginTop: '2rem' }}>💡 {randomPhrase}</p>

      <Link to="/">
        <button style={{
          marginTop: '2rem',
          backgroundColor: '#444',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Volver a inicio
        </button>
      </Link>
    </div>
  );
}

export default About;
