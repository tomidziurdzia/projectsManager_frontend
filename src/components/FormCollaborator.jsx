import { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormCollaborator = () => {
  const [email, setEmail] = useState("");

  const { showAlert, alert, submitCollaborator } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      showAlert({ msg: "Email is required", error: true });
      return;
    }

    submitCollaborator(email);
  };

  const { msg } = alert;

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
    >
      {msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label htmlFor="email" className="text-gray-700 font-bold text-sm">
          Email Collaborator
        </label>
        <input
          id="email"
          type="email"
          className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
          placeholder="Collaborator email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Search Collaborator"
        className="bg-primary border-2 text-center border-primary w-full text-white py-3 font-bold rounded hover:cursor-pointer hover:bg-white hover:text-primary transition-colors"
      />
    </form>
  );
};

export default FormCollaborator;
