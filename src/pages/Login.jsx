import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({ msg: "All field are required", error: true });
    }

    try {
      const { data } = await clientAxios.post("/users/login", {
        email,
        password,
      });

      setAlert({});

      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/projects");
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-primary font-black text-3xl text-center">
        Login and manage your projects
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
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
          <label className="text-gray-600 block font-bold" htmlFor="email">
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
        <input
          type="submit"
          value="Login"
          className="bg-primary border-2 border-primary w-full text-white py-3 font-bold rounded hover:cursor-pointer hover:bg-white hover:text-primary transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="register"
        >
          Don't have an account? Sign up
        </Link>

        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="forget-password"
        >
          Forget password
        </Link>
      </nav>
    </>
  );
};

export default Login;
