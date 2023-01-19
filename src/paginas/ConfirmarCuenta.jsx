import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    };
    setCargando(false);
    confirmarCuenta();
  }, []);

  return (
    <>
      <h1 className="text-sky-500 font-black text-3xl text-center">
        Confirma tu cuenta y administra tus proyectos
      </h1>
      <div className="md:w-3/5 mx-5 grid md:mx-auto shadow-lg py-5 md:py-10 px-5 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <div className="flex justify-center">
            <Link
              className="block text-center p-3 border border-sky-400 text-sky-400 w-full rounded-lg hover:border-white hover:text-white hover:bg-sky-400 transition-colors"
              to="/"
            >
              Iniciar Sesion
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
