import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  const [email, setEmail] = useState("");

  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();

  const habdleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      mostrarAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }

    submitColaborador(email);
  };

  const { msg } = alerta;

  return (
    <form
      onSubmit={habdleSubmit}
      action=""
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label htmlFor="email" className="text-gray-700 font-bold text-sm">
          Email Colaborador
        </label>
        <input
          id="email"
          type="email"
          className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
          placeholder="Email del colaborador"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Buscar Colaborador"
        className="bg-sky-500 hover:bg-sky-600 w-full py-2 text-white font-bold text-center hover:cursor-pointer transition-colors rounded"
      />
    </form>
  );
};

export default FormularioColaborador;
