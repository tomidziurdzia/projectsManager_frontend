import FormProject from "../components/FormProject";

const NewProject = () => {
  return (
    <>
      <h1 className="text-3xl font-black">Create Project</h1>
      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>
    </>
  );
};

export default NewProject;
