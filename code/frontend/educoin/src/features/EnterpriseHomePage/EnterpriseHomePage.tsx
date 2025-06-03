import React from "react";
import { Box, Typography } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../../shared/components/HeaderMenu/HeaderMenu";

export default function EnterpriseHomePage() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const nomeEmpresa = usuario?.nome || "Usuário";
  const navigate = useNavigate();

  const opcoes = [
    {
      titulo: "Visualizar Resgates",
      icone: <HistoryIcon fontSize="large" />,
      rota: "/resgates-realizados",
    },
    {
      titulo: "Gerenciar Vantagens",
      icone: <CardGiftcardIcon fontSize="large" />,
      rota: "/vantagens",
    },
  ];

  return (
    <>
      <HeaderMenu />
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="#90caf9" mb={4}>
          Bem-vindo(a), {nomeEmpresa}!
        </Typography>

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
