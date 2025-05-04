import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPageStudent from "./features/SignUpPage/SignUpPageStudent";
import SingUpPageEnterprise from "./features/SignUpPage/SingUpPageEnterprise";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro-estudante" element={<SignUpPageStudent />} />
        <Route path="/cadastro-empresa" element={<SingUpPageEnterprise />} />
      </Routes>
    </Router>
  );
}

export default App;
