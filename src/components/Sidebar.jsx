import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 ">
      <p className="text-xl font-bold">Hi {auth.name}</p>
      <Link
        className="bg-primary w-full p-3 text-white font-bold block mt-5 text-center rounded-lg"
        to="new-project"
      >
        New Project
      </Link>
    </aside>
  );
};

export default Sidebar;
