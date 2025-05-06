import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, ButtonBase } from "@mui/material";
import { Visibility, VisibilityOff, MonetizationOn, Redeem, History } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentHomePage: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [saldo, setSaldo] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const alunoId = localStorage.getItem("alunoId");
    if (!alunoId) {
      console.error("ID do aluno não encontrado no localStorage");
      return;
    }

    axios.get(`http://localhost:8080/alunos/${alunoId}/saldo`)
      .then(response => setSaldo(response.data))
      .catch(error => {
        console.error("Erro ao buscar saldo do aluno:", error);
      });
  }, []);

  return (
    <Box sx={{ textAlign: "center", p: 4, fontFamily: "Poppins, sans-serif", color: "#0056b3", textShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Bem-vindo ao EduCoin!
      </Typography>

      <Box
        sx={{
          mx: "auto",
          p: 3,
          maxWidth: "400px",
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: "#f5f9ff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize="1.2rem">
          Saldo de moedas: {showBalance ? saldo : "••••"}
        </Typography>
        <IconButton onClick={() => setShowBalance(!showBalance)} sx={{ color: "#007bff" }}>
          {showBalance ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
          mt: 4,
        }}
      >
        <FeatureCard
          title="Trocar Moedas"
          icon={<MonetizationOn sx={{ fontSize: 40, color: "#007bff" }} />}
          onClick={() => navigate("/troca-de-moedas")} 
        />
        <FeatureCard
          title="Resgatar Vantagens"
          icon={<Redeem sx={{ fontSize: 40, color: "#007bff" }} />}
          onClick={() => alert("Ir para resgates")}
        />
        <FeatureCard
          title="Histórico de Transações"
          icon={<History sx={{ fontSize: 40, color: "#007bff" }} />}
          onClick={() => alert("Ir para histórico")}
        />
      </Box>
    </Box>
  );
};

type FeatureCardProps = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, onClick }) => (
  <ButtonBase
    onClick={onClick}
    sx={{
      p: 3,
      width: 220,
      borderRadius: 3,
      boxShadow: 3,
      bgcolor: "white",
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      gap: 1,
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.05)",
      },
    }}
  >
    {icon}
    <Typography fontWeight="bold" fontSize="1.1rem" fontFamily="Poppins, sans-serif">
      {title}
    </Typography>
  </ButtonBase>
);

export default StudentHomePage;
