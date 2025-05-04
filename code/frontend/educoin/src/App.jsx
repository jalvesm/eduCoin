import { AuthProvider } from "./data/context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./features/HomePage";
import SignUpPageStudent from "./features/SignUpPage/SignUpPageStudent";
import SignUpPageEnterprise from "./features/SignUpPage/SingUpPageEnterprise";
import LoginPage from "./features/LoginPage/LoginPage";
import StudentHomePage from "./features/StudentHomePage/StudentHomePage";
import EnterpriseHomePage from "./features/EnterpriseHomePage/EnterpriseHomePage";
import TeacherHomePage from "./features/TeacherHomePage/TeacherHomePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cadastro-estudante" element={<SignUpPageStudent />} />
          <Route path="/cadastro-empresa" element={<SignUpPageEnterprise />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/estudante" element={<StudentHomePage />} />
          <Route path="/empresa" element={<EnterpriseHomePage />} />
          <Route path="/professor" element={<TeacherHomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
