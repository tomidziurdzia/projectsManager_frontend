import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ConfirmAccount from "./pages/ConfirmAccount";
import Login from "./pages/Login";
import NewPassword from "./pages/NewPassword";
import ForgetPassword from "./pages/ForgetPassword";
import Register from "./pages/Register";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";
import EditProject from "./pages/EditProject";

import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectsProvider";
import NewCollaborator from "./pages/NewCollaborator";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            {/* Area Publica */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="forget-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>

            {/* Area Privada */}
            <Route path="/projects" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="new-project" element={<NewProject />} />
              <Route
                path="new-collaborator/:id"
                element={<NewCollaborator />}
              />

              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
