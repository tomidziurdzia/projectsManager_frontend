import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormProject = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [client, setClient] = useState("");

  const params = useParams();

  const { alert, showAlert, submitProject, project } = useProjects();

  useEffect(() => {
    if (params.id) {
      setId(project?._id);
      setName(project?.name);
      setDescription(project?.description);
      setDueDate(project?.dueDate?.split("T")[0]);
      setClient(project?.client);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, dueDate, client].includes("")) {
      showAlert({
        msg: "All fields are required",
        error: true,
      });
      return;
    }

    // Pasar los datos hacia el provider, paso los datos
    await submitProject({ id, name, description, dueDate, client });

    setId(null);
    setName("");
    setDescription("");
    setDueDate("");
    setClient("");
  };

  const { msg } = alert;

  return (
    <form
      action=""
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label htmlFor="name" className="text-gray-600 font-bold text-m">
          Project Name
        </label>
        <input
          id="name"
          type="text"
          className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="description" className="text-gray-600 font-bold text-m">
          Description Project
        </label>
        <textarea
          id="description"
          className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
          placeholder="Description project"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="due-date" className="text-gray-600 font-bold text-m">
          Due Date
        </label>
        <input
          id="due-date"
          type="date"
          className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="client" className="text-gray-600 font-bold text-m">
          Client Name
        </label>
        <input
          id="client"
          type="text"
          className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
          placeholder=" Client name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? "Update Project" : "Create Project"}
        className="bg-primary border-2 border-primary w-full text-white py-3 font-bold rounded hover:cursor-pointer hover:bg-white hover:text-primary transition-colors"
      />
    </form>
  );
};

export default FormProject;
