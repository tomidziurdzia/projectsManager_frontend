import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setAlert({ msg: "Email is required", error: true });
      return;
    }

    try {
      const { data } = await clientAxios.post(`/users/forget-password`, {
        email,
      });

      setAlert({ msg: data.msg, error: false });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-primary font-black text-3xl text-center">
        Recover access and manage your projects
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
            placeholder="Register email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Send Instructions"
          className="bg-primary border-2 text-center border-primary w-full text-white py-3 font-bold rounded hover:cursor-pointer hover:bg-white hover:text-primary transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 text-sm" to="/">
          Do you already have an account? Login
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/register"
        >
          You do not have an account? Sign up
        </Link>
      </nav>
    </>
  );
};

export default ForgetPassword;
