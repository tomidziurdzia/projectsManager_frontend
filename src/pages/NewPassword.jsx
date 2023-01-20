import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [tokenValid, setTokenValid] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [form, setForm] = useState(true);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/users/forget-password/${token}`);
        setTokenValid(true);
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validando campos vacios
    if ([password].includes("")) {
      setAlert({ msg: "There are empty fields", error: true });
      return;
    }

    setAlert({});

    // Guardando nueva contrasena
    try {
      const url = `/users/forget-password/${token}`;
      const { data } = await clientAxios.post(url, {
        password,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPasswordChanged(true);
      setForm(!form);
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
        Reset your password and manage your projects
      </h1>

      {msg && <Alert alert={alert} />}

      {tokenValid && form && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label className="text-gray-600 block font-bold" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter your new password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Recover Account"
            className="bg-primary border-2 text-center border-primary w-full text-white py-3 font-bold rounded hover:cursor-pointer hover:bg-white hover:text-primary transition-colors"
          />
        </form>
      )}

      {passwordChanged && (
        <div className="flex justify-center">
          <Link
            className="bg-primary border-2 text-center border-primary w-full text-white py-3 font-bold rounded hover:cursor-pointer hover:bg-white hover:text-primary transition-colors"
            to="/"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default NewPassword;
