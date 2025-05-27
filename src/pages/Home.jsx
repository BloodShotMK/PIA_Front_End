import { Link } from 'react-router-dom';

function Home() {
  const user = {
    name: 'Roberto',
    phrase: '¡Vamos por una tarea más!'
  };

  return (
    <div className="home">
      <h1>Hola, {user.name} </h1>
      <p>{user.phrase}</p>
      <Link to="/tasks">
        <button>Ir a mis tareas</button>
      </Link>
    </div>
  );
}

export default Home;
