import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HistoryIcon from "@mui/icons-material/History";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../../shared/components/HeaderMenu/HeaderMenu";

export default function TeacherHomePage() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const nomeProfessor = usuario?.nome || "Professor";
  const [mostrarSaldo, setMostrarSaldo] = useState(true);
  const saldo = 230;
  const navigate = useNavigate();

  const opcoes = [
    {
      titulo: "Transações",
      icone: <HistoryIcon fontSize="large" />,
      rota: "/professor/historico-moedas",
    },
    {
      titulo: "Distribuir Moedas",
      icone: <SendIcon fontSize="large" />,
      rota: "/professor/enviar-moedas",
    },
  ];

  return (
    <>
      <HeaderMenu />
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="#90caf9" mb={2}>
          Bem-vindo(a), {nomeProfessor}!
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
                {mostrarSaldo ? `${saldo} moedas` : "••••••"}
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
                width: { xs: "100%", sm: "45%", md: "30%" },
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
