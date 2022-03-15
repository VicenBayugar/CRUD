import React, { useState } from "react";
import shortid from "shortid";

export default function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Escriba algo...");
      return;
    }

    setTareas([...tareas, { id: shortid.generate(), nombreTarea: tarea }]);
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };

  const editar = (item) => {
    setModoEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };

  const editarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Escriba algo...");
      return;
    }
    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id: id, nombreTarea: tarea } : item
    );
    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              tareas.map((item) => (
                <li className="list-group-item d-flex" key={item.id}>
                  <span className="lead me-auto">{item.nombreTarea}</span>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar tarea" : "Agregar tarea"}
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            <input
              type="text"
              placeholder="Ingrese tarea"
              className="form-control mb-2"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            ></input>
            {modoEdicion ? (
              <button className="btn btn-warning w-100">Editar</button>
            ) : (
              <button className="btn btn-dark w-100">Agregar</button>
            )}
            {error ? <span className="text-danger">{error}</span> : null}
          </form>
        </div>
      </div>
    </div>
  );
}
