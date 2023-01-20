import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";

let socket;

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);
  const [task, setTask] = useState({});
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [collaborator, setCollaborator] = useState({});
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
  const [searcher, setSearcher] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios("/projects", config);

        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
    return;
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(
        `/projects/${project.id}`,
        project,
        config
      );

      // Sincronizar el state
      const projectsUpdated = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );

      setProjects(projectsUpdated);

      // Redireccionar
      // Mostrar la aleta
      setAlert({
        msg: "Project updated successfully",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const newProject = async (project) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/projects", project, config);

      setProjects([...projects, data]);

      setAlert({
        msg: "Project created successfully",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.get(`/projects/${id}`, config);
      setProject(data);
      setAlert({});
    } catch (error) {
      navigate("/projects");
      setAlert({ msg: error.response.data.msg, error: true });
      setTimeout(() => {
        setAlert({});
      }, 2000);
    }
    setLoading(false);
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/projects/${id}`, config);

      // SIncronizar el state
      const projectsUpdated = projects.filter(
        (projectState) => projectState._id !== id
      );
      setProjects(projectsUpdated);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTask = () => {
    setModalFormTask(!modalFormTask);
    setTask({});
  };

  const submitTask = async (task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  const createTask = async (task) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(`/tasks`, task, config);

      setAlert({});
      setModalFormTask(false);

      // Socket IO
      socket.emit("new task", data);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (task) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);

      setAlert({});
      setModalFormTask(false);

      // Socket
      socket.emit("update task", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditTask = (task) => {
    setTask(task);
    setModalFormTask(true);
  };

  const handleModalDeleteTask = (task) => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);

      setAlert({ msg: data.msg, error: false });

      setModalDeleteTask(false);

      // Socket
      socket.emit("delete task", task);

      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitCollaborator = async (email) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/projects/collaborators`,
        { email },
        config
      );

      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
    setLoading(false);
  };

  const addCollaborator = async (email) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/projects/collaborators/${project._id}`,
        email,
        config
      );

      setAlert({ msg: data.msg, error: false });
      setCollaborator({});

      setTimeout(() => {
        setAlert({});
      }, 2000);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const handleModalDeleteCollaborator = (collaborator) => {
    setModalDeleteCollaborator(!modalDeleteCollaborator);

    setCollaborator(collaborator);
  };

  const deleteCollaborator = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/projects/delete-collaborator/${project._id}`,
        { id: collaborator._id },
        config
      );

      const projectUpdated = { ...project };
      projectUpdated.collaborators = projectUpdated.collaborators.filter(
        (collaboratorState) => collaboratorState._id !== collaborator._id
      );

      setProject(projectUpdated);
      setAlert({ msg: data.msg, error: false });
      setCollaborator({});
      setModalDeleteCollaborator(false);
      setTimeout(() => {
        setAlert({});
      }, 2000);
    } catch (error) {
      console.log(error.response);
    }
  };

  const completedTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(`/tasks/state/${id}`, {}, config);

      setTask({});

      // Socket
      socket.emit("change state", data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSearcher = () => {
    setSearcher(!searcher);
  };

  // Socket io
  const submitTaskProject = (task) => {
    // Agrega la tarea al state
    const projectUpdated = { ...project };
    projectUpdated.tasks = [...projectUpdated.tasks, task];

    setProject(projectUpdated);
  };

  const deleteTaskProject = (task) => {
    // Actualizar el State con la tarea eliminada
    const projectUpdated = { ...project };
    projectUpdated.tasks = projectUpdated.tasks.filter(
      (taskState) => taskState._id !== task._id
    );

    setProject(projectUpdated);
  };

  const updateTaskProject = (task) => {
    // Actualizar el State con la tarea
    const projectUpdated = { ...project };
    projectUpdated.tasks = projectUpdated.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    );
    setProject(projectUpdated);
  };

  const changeStateTask = (task) => {
    const projectUpdated = { ...project };
    projectUpdated.tasks = projectUpdated.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    );
    setProject(projectUpdated);
  };

  const logoutSesionProjects = () => {
    setProjects([]);
    setProject({});
    setAlert({});
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        setProject,
        loading,
        setLoading,
        deleteProject,
        handleModalTask,
        modalFormTask,
        submitTask,
        handleModalEditTask,
        task,
        handleModalDeleteTask,
        modalDeleteTask,
        deleteTask,
        submitCollaborator,
        collaborator,
        addCollaborator,
        handleModalDeleteCollaborator,
        modalDeleteCollaborator,
        deleteCollaborator,
        completedTask,
        handleSearcher,
        searcher,
        submitTaskProject,
        deleteTaskProject,
        updateTaskProject,
        changeStateTask,
        logoutSesionProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };
export default ProjectsContext;
