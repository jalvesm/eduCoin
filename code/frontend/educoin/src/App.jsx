import { AuthProvider } from "./data/context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./features/HomePage";
import SignUpPageStudent from "./features/SignUpPage/SignUpPageStudent";
import SignUpPageEnterprise from "./features/SignUpPage/SingUpPageEnterprise";
import LoginPage from "./features/LoginPage/LoginPage";
import StudentHomePage from "./features/StudentHomePage/StudentHomePage";
import EnterpriseHomePage from "./features/EnterpriseHomePage/EnterpriseHomePage";
import TeacherHomePage from "./features/TeacherHomePage/TeacherHomePage";
import Transactions from "./features/EnterpriseHomePage/components/Transactions";
import ProtectedRoute from "./shared/components/Protected/ProtectedRoute";
import AccessDenied from "./shared/components/Access/AccessDenied";
import Coupons from "./features/StudentHomePage/components/Coupons";
import ResetPage from "./features/ResetPage/ResetPage";
import HistoricCoins from "./features/StudentHomePage/components/HistoricCoins";
import ListAdvantages from "./features/StudentHomePage/components/ListAdvantages";
import SendCoins from "./features/TeacherHomePage/components/SendCoins";
import TransactionsCoins from "./features/TeacherHomePage/components/TransactionsCoins";
import CreateAdvantages from "./features/EnterpriseHomePage/components/CreateAdvantages";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro-estudante" element={<SignUpPageStudent />} />
          <Route path="/cadastro-empresa" element={<SignUpPageEnterprise />} />
          <Route path="/reset" element={<ResetPage />} />

          <Route
            path="/estudante"
            element={
              <ProtectedRoute allowedRoles={["ALUNO"]}>
                <StudentHomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vantagens-disponiveis"
            element={
              <ProtectedRoute allowedRoles={["ALUNO"]}>
                <ListAdvantages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cupons"
            element={
              <ProtectedRoute allowedRoles={["ALUNO"]}>
                <Coupons />
              </ProtectedRoute>
            }
          />

          <Route
            path="/historico-moedas"
            element={
              <ProtectedRoute allowedRoles={["ALUNO"]}>
                <HistoricCoins />
              </ProtectedRoute>
            }
          />

          <Route
            path="/empresa"
            element={
              <ProtectedRoute allowedRoles={["EMPRESA"]}>
                <EnterpriseHomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vantagens"
            element={
              <ProtectedRoute allowedRoles={["EMPRESA"]}>
                <CreateAdvantages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/professor"
            element={
              <ProtectedRoute allowedRoles={["PROFESSOR"]}>
                <TeacherHomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/professor/enviar-moedas"
            element={
              <ProtectedRoute allowedRoles={["PROFESSOR"]}>
                <SendCoins />
              </ProtectedRoute>
            }
          />

          <Route
            path="/professor/historico-moedas"
            element={
              <ProtectedRoute allowedRoles={["PROFESSOR"]}>
                <TransactionsCoins />
              </ProtectedRoute>
            }
          />

          <Route
            path="/resgates-realizados"
            element={
              <ProtectedRoute allowedRoles={["EMPRESA"]}>
                <Transactions />
              </ProtectedRoute>
            }
          />

          <Route path="/acesso-negado" element={<AccessDenied />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
