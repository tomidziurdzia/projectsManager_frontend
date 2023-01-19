import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validando campos vacios
    if ([password].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }

    setAlerta({});

    // Guardando nueva contrasena
    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, {
        password,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-500 font-black text-3xl text-center">
        Reestablece tu password y administra tus proyectos
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label className="text-gray-600 block font-bold" htmlFor="password">
              Nuevo Password
            </label>
            <input
              type="password"
              placeholder="Ingrese tu nuevo password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Recuperar Cuenta"
            className="bg-sky-500 w-full text-white py-3 font-bold rounded hover:cursor-pointer hover:bg-sky-600 transition-colors"
          />
        </form>
      )}

      {passwordModificado && (
        <div className="flex justify-center">
          <Link
            className="block text-center p-3 border border-sky-400 text-sky-400 w-full rounded-lg hover:border-white hover:text-white hover:bg-sky-400 transition-colors"
            to="/"
          >
            Iniciar Sesion
          </Link>
        </div>
      )}
    </>
  );
};

export default NuevoPassword;
