import { useContext } from "react";
import ProjectContext from "../context/ProjectsProvider";

const useProjects = () => {
  return useContext(ProjectContext);
};

export default useProjects;
