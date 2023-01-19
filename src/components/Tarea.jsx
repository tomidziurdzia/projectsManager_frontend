import { formatearFecha } from "../helpers/formatearFecha";
import useAdmin from "../hooks/useAdmin";
import useProyectos from "../hooks/useProyectos";

const Tarea = ({ tarea }) => {
  const { nombre, descripcion, prioridad, fechaEntrega, _id, estado } = tarea;
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();

  const admin = useAdmin();

  return (
    <div className="border-b flex justify-between items-center px-2 my-5">
      <div className="flex flex-col items-start">
        <p className="mb-2 text-xl">{nombre}</p>
        <p className="mb-2 text-sm text-gray-500">{descripcion}</p>
        <p className="mb-2 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-2 text-sm text-gray-600">Prioridad: {prioridad}</p>
        {estado && (
          <p className="py-1 px-2 mb-2 text-sm bg-green-600 rounded-lg text-white">
            Completada por: {tarea.completado.nombre}
          </p>
        )}
      </div>
      <div className="flex gap-2 flex-col lg:flex-row">
        {admin && (
          <button
            className="bg-indigo-500 px-4 py-3 text-white font-bold text-sm text-center rounded-lg"
            onClick={() => handleModalEditarTarea(tarea)}
          >
            Editar
          </button>
        )}
        <button
          className={`${
            estado ? "bg-sky-500" : "bg-gray-600"
          } px-4 py-3 text-white font-bold text-sm text-center rounded-lg`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>

        {admin && (
          <button
            className="bg-red-500 px-4 py-3 text-white font-bold text-sm text-center rounded-lg"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
