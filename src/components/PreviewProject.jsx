import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProject = ({ project }) => {
  const { auth } = useAuth();
  const { name, _id, client, creator } = project;

  return (
    <div className="border-b p-5 flex justify-between flex-col md:flex-row">
      <div className="flex gap-2">
        <p className="flex-1">
          {name}
          <span className="text-sm text-gray-500"> {client}</span>
        </p>

        {auth._id !== creator && (
          <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold">
            Collaborator
          </p>
        )}
      </div>
      <Link
        to={`${_id}`}
        className="text-gray-500 hover:text-gray-600 hover:cursor-pointer text-sm font-bold"
      >
        View Project
      </Link>
    </div>
  );
};

export default PreviewProject;
