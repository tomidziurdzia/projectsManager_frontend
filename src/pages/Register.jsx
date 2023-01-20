import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [form, setForm] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({ msg: "All field are required", error: true });
      return;
    }

    if (password !== repeatPassword) {
      setAlert({ msg: "The passwords do not match", error: true });
      return;
    }

    setAlert({});

    // Crear el usuario en la API
    try {
      const { data } = await clientAxios.post(`/users`, {
        name,
        password,
        email,
      });
      setForm(false);

      setAlert({ msg: data.msg, error: false });
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-primary font-black text-3xl text-center">
        Create your account and manage your projects
      </h1>

      {msg && <Alert alert={alert} />}
      {form && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label className="text-gray-600 block font-bold" htmlFor="nombre">
              Name
            </label>
            <input
              type="text"
              placeholder="User name"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="text-gray-600 block font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
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
              placeholder="Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="text-gray-600 block font-bold"
              htmlFor="password2"
            >
              Repeat Password
            </label>
            <input
              type="password"
              placeholder="Repeat password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password2"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Create Account"
            className="bg-primary border-2 border-primary w-full text-white py-3 font-bold rounded hover:cursor-pointer hover:bg-white hover:text-primary transition-colors"
          />
        </form>
      )}

      <nav>
        <Link className="block text-center my-5 text-slate-500 text-sm" to="/">
          Do you already have an account? Login
        </Link>
      </nav>
    </>
  );
};

export default Register;
