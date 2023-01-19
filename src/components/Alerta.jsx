const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? "bg-red-400" : "bg-green-400"
      } text-center p-3 rounded-xl text-white font-bold text-sm my-10`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
