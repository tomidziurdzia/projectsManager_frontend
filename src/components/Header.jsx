import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import useAuth from "../hooks/useAuth";
import Search from "./Search";

const Header = () => {
  const { handleSearcher, logoutProjects } = useProjects();
  const { logoutAuth } = useAuth();

  const handleLogoutSesion = () => {
    logoutAuth();
    logoutProjects();

    localStorage.removeItem("token");
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <Link to="/projects">
          <h2 className="text-2xl font-black mb-5 md:mb-0 text-primary">
            Project Manager
          </h2>
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button type="button" className="font-bold" onClick={handleSearcher}>
            Search Project
          </button>
          <Link to="/projects" className="font-bold">
            Projects
          </Link>

          <button
            className="text-white text-sm bg-primary p-2 rounded-md font-bold"
            type="button"
            onClick={handleLogoutSesion}
          >
            Logout
          </button>
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
