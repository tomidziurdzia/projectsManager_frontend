import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios("/users/perfil", config);
        setAuth(data);
        // Opcional que al recargar me rediriga siempre a proyectos
        // navigate("/proyectos");
      } catch (error) {
        setAuth({});
      }

      setLoading(false);
    };
    authenticateUser();
  }, []);

  const logoutSesionAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logoutSesionAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
