import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import LoginIcon from "@mui/icons-material/Login";
import React from "react";
import colors from "../shared/theme/colors";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "black", marginBottom: 2 }}
      >
        Bem-vindo ao EduCoin!
      </Typography>

      <Typography variant="body1" sx={{ color: "gray", marginBottom: 3 }}>
        Escolha uma opção para começar:
      </Typography>

      <Button
        onClick={() => navigate("/cadastro-estudante")}
        variant="contained"
        sx={{
          backgroundColor: colors.lightBlue,
          color: "white",
          width: "100%",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <SchoolIcon /> Cadastrar como Aluno
      </Button>

      <Button
        onClick={() => navigate("/cadastro-empresa")}
        variant="contained"
        sx={{
          backgroundColor: colors.primary,
          color: "white",
          width: "100%",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <BusinessIcon /> Cadastrar como Empresa
      </Button>

      <Button
        onClick={() => navigate("/login")}
        variant="contained"
        sx={{
          backgroundColor: colors.secondary,
          color: "white",
          width: "100%",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <LoginIcon /> Já tenho uma conta
      </Button>
    </Box>
  );
}
