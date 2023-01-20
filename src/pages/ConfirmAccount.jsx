import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const [accountConfirmed, setAccountConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const { data } = await clientAxios(url);

        setAccountConfirmed(true);
        setAlert({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };
    setLoading(false);
    confirmAccount();
  }, []);

  return (
    <>
      <h1 className="text-primary font-black text-3xl text-center">
        Confirm your account and manage your projects
      </h1>
      <div className="md:w-3/5 m-5 grid md:mx-auto shadow-lg py-5 md:py-10 px-5 rounded-xl bg-white">
        {!loading && <Alert alert={alert} />}

        {accountConfirmed && (
          <div className="flex justify-center">
            <Link
              className="bg-primary border-2 text-center border-primary w-full text-white py-3 font-bold rounded hover:cursor-pointer hover:bg-white hover:text-primary transition-colors"
              to="/"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
