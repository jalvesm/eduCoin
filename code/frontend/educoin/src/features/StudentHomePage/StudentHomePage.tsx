import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HistoryIcon from "@mui/icons-material/History";
import RedeemIcon from "@mui/icons-material/Redeem";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../../shared/components/HeaderMenu/HeaderMenu";
import { useStudentVantagens } from "./hooks/student";

export default function StudentHomePage() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const nomeAluno = usuario?.nome || "Professor";
  const idAluno = usuario?.id || "";
  const [mostrarSaldo, setMostrarSaldo] = useState(true);
  const navigate = useNavigate();

  const { saldo, loading, erro, getSaldoAluno } = useStudentVantagens();

  useEffect(() => {
    if (idAluno) {
      getSaldoAluno(idAluno);
    }
  }, [idAluno, getSaldoAluno]);

  const opcoes = [
    {
      titulo: "Cupons Disponíveis",
      icone: <ConfirmationNumberIcon fontSize="large" />,
      rota: "/cupons",
    },
    {
      titulo: "Histórico de Moedas",
      icone: <HistoryIcon fontSize="large" />,
      rota: "/historico-moedas",
    },
    {
      titulo: "Histórico de Resgates",
      icone: <AccountBalanceWalletIcon fontSize="large" />,
      rota: "/historico-resgates",
    },
    {
      titulo: "Vantagens Disponíveis",
      icone: <RedeemIcon fontSize="large" />,
      rota: "/vantagens-disponiveis",
    },
  ];

  return (
    <>
      <HeaderMenu />
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="#90caf9" mb={2}>
          Bem-vindo(a) ao EduCoin, {nomeAluno}!
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
            p: 2,
            mb: 4,
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MonetizationOnIcon
              sx={{ fontSize: 40, mr: 2, color: "#1976d2" }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Saldo de Moedas
              </Typography>
              <Typography variant="h6">
                {loading
                  ? "Carregando..."
                  : erro
                  ? erro
                  : mostrarSaldo
                  ? `${saldo} moedas`
                  : "••••••"}
              </Typography>
            </Box>
          </Box>

          <Tooltip title={mostrarSaldo ? "Ocultar saldo" : "Exibir saldo"}>
            <IconButton onClick={() => setMostrarSaldo(!mostrarSaldo)}>
              {mostrarSaldo ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {opcoes.map((opcao, index) => (
            <Box
              key={index}
              onClick={() => navigate(opcao.rota)}
              sx={{
                width: { xs: "100%", sm: "45%", md: "22%" },
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                boxShadow: 3,
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              <Box sx={{ mb: 1 }}>{opcao.icone}</Box>
              <Typography fontWeight="bold">{opcao.titulo}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
