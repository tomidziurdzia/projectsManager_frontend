const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error ? "bg-red-400" : "bg-primary"
      } text-center p-3 rounded-xl text-white font-bold text-sm my-10`}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
