import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./features/HomePage";
import SignUpPageStudent from "./features/SignUpPage/SignUpPageStudent";
import SingUpPageEnterprise from "./features/SignUpPage/SingUpPageEnterprise";
import LoginPage from "./features/LoginPage/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastro-estudante" element={<SignUpPageStudent />} />
        <Route path="/cadastro-empresa" element={<SingUpPageEnterprise />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
