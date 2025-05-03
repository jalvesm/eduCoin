import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPageStudent from "./features/SignUpPage/SignUpPageStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro-estudante" element={<SignUpPageStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
