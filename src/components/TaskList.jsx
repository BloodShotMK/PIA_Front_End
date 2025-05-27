import { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleTask = (id, completed) => {
    axios.patch(`http://localhost:3000/tasks/${id}`, { completed: !completed })
      .then(() => {
        setTasks(tasks.map(task =>
          task.id === id ? { ...task, completed: !completed } : task
        ));
      });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('pending')}>Pendientes</button>
        <button onClick={() => setFilter('completed')}>Completadas</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id, task.completed)}
              />
              <span style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'gray' : 'black'
              }}>
                {task.title}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '1rem' }}>
        <strong>Total:</strong> {stats.total} | <strong>Pendientes:</strong> {stats.pending} | <strong>Completadas:</strong> {stats.completed}
      </div>
    </div>
  );
}

export default TaskList;
