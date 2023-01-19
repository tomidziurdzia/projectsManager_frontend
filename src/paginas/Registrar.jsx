import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Los password no coinciden", error: true });
      return;
    }

    setAlerta({});

    // Crear el usuario en la API
    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        password,
        email,
      });
      setAlerta({ msg: data.msg, error: false });

      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-500 font-black text-3xl text-center">
        Crea tu cuenta y administra tus proyectos
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label className="text-gray-600 block font-bold" htmlFor="nombre">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre del usuario"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="text-gray-600 block font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="text-gray-600 block font-bold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder="Password de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="text-gray-600 block font-bold" htmlFor="password2">
            Repetir Password
          </label>
          <input
            type="password"
            placeholder="Password de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password2"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-500 w-full text-white py-3 font-bold rounded hover:cursor-pointer hover:bg-sky-600 transition-colors"
        />
      </form>

      <nav>
        <Link className="block text-center my-5 text-slate-500 text-sm" to="/">
          Ya tienes una cuenta? Inicia sesion
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
