import { useState, useEffect } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('');

  // Cargar tareas desde localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.trim() || !newDate) return;

    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      date: newDate,
      completed: false
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
    setNewDate('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleUpdate = (id) => {
    if (!editValue.trim()) return;

    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: editValue } : task
    ));
    setEditingTaskId(null);
    setEditValue('');
  };

  const toggleComplete = (id, currentStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !currentStatus } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const taskMonth = new Date(task.date).getMonth() + 1;

    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && task.completed) ||
      (filterStatus === 'pending' && !task.completed);

    const matchMonth =
      !filterMonth || parseInt(filterMonth) === taskMonth;

    return matchStatus && matchMonth;
  });

  return (
    <div>
      <h1>Mis tareas</h1>

      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button
          style={{
            margin: '0.25rem',
            backgroundColor: filterStatus === 'all' ? '#007bff' : '#ccc',
            color: filterStatus === 'all' ? '#fff' : '#000'
          }}
          onClick={() => setFilterStatus('all')}
        >
          Todas
        </button>
        <button
          style={{
            margin: '0.25rem',
            backgroundColor: filterStatus === 'pending' ? '#007bff' : '#ccc',
            color: filterStatus === 'pending' ? '#fff' : '#000'
          }}
          onClick={() => setFilterStatus('pending')}
        >
          Pendientes
        </button>
        <button
          style={{
            margin: '0.25rem',
            backgroundColor: filterStatus === 'completed' ? '#007bff' : '#ccc',
            color: filterStatus === 'completed' ? '#fff' : '#000'
          }}
          onClick={() => setFilterStatus('completed')}
        >
          Completadas
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <label>Filtrar por mes: </label>
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="">Todos</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('es-ES', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong>{task.title}</strong> <br />
              <small>{task.date}</small>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => toggleComplete(task.id, task.completed)}>
                {task.completed ? '✅' : '⬜'}
              </button>
              <button onClick={() => {
                setEditingTaskId(task.id);
                setEditValue(task.title);
              }}>Editar</button>
              <button onClick={() => handleDelete(task.id)}>Eliminar</button>
            </div>

            {editingTaskId === task.id && (
              <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleUpdate(task.id)}>Guardar</button>
                <button onClick={() => setEditingTaskId(null)}>Cancelar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
