import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Busqueda";

const Header = () => {
  const { handleBuscador, cerrarSesionProyectos } = useProyectos();
  const { cerrarSesionAuth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionProyectos();

    localStorage.removeItem("token");
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <Link to="/proyectos">
          <h2 className="text-2xl font-black mb-5 md:mb-0 text-sky-500">
            Project Manager
          </h2>
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button type="button" className="font-bold" onClick={handleBuscador}>
            Buscar Proyecto
          </button>
          <Link to="/proyectos" className="font-bold">
            Proyectos
          </Link>

          <button
            className="text-white text-sm bg-sky-500 p-2 rounded-md font-bold"
            type="button"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesion
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
