import { formatDate } from "../helpers/formatDate";
import useAdmin from "../hooks/useAdmin";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {
  const { name, description, priority, dueDate, _id, state } = task;
  const { handleModalEditTask, handleModalDeleteTask, completedTask } =
    useProjects();

  const admin = useAdmin();

  return (
    <div className="border-b flex justify-between items-center px-2 my-5">
      <div className="flex flex-col items-start">
        <p className="mb-2 text-xl">{name}</p>
        <p className="mb-2 text-sm text-gray-500">{description}</p>
        <p className="mb-2 text-sm">{formatDate(dueDate)}</p>
        <p className="mb-2 text-sm text-gray-600">Priority: {priority}</p>
        {state && (
          <p className="py-1 px-2 mb-2 text-sm bg-green-600 rounded-lg text-white">
            Completed by: {task.completed.name}
          </p>
        )}
      </div>
      <div className="flex gap-2 flex-col lg:flex-row">
        {admin && (
          <button
            className="bg-indigo-500 px-4 py-3 text-white font-bold text-sm text-center rounded-lg"
            onClick={() => handleModalEditTask(task)}
          >
            Edit
          </button>
        )}
        <button
          className={`${
            state ? "bg-sky-500" : "bg-gray-600"
          } px-4 py-3 text-white font-bold text-sm text-center rounded-lg`}
          onClick={() => completedTask(_id)}
        >
          {state ? "Completed" : "Incompleted"}
        </button>

        {admin && (
          <button
            className="bg-red-500 px-4 py-3 text-white font-bold text-sm text-center rounded-lg"
            onClick={() => handleModalDeleteTask(task)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
