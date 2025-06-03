// ResetUpBox.tsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//import { useUser } from "../hooks/useUser";
import colors from "../../../shared/theme/colors";

export default function ResetUpBox() {
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //const { resetPassword, loading } = useUser();
  const navigate = useNavigate();

  const handleReset = async () => {
    console.log("Necessario Implementar");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <LockResetIcon sx={{ color: "black", fontSize: 32 }} />
      <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
        Redefinir Senha
      </Typography>

      {error && (
        <Typography color={colors.error} sx={{ fontWeight: "bold" }}>
          {error}
        </Typography>
      )}

      {successMessage && (
        <Typography color="green" sx={{ fontWeight: "bold" }}>
          {successMessage}
        </Typography>
      )}

      <TextField
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Nova Senha"
        type="password"
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
        fullWidth
      />

      <Button
        onClick={handleReset}
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: colors.lightBlue,
          color: colors.secondary,
          height: "48px",
          fontWeight: "bold",
          borderRadius: "10px",
        }}
        //disabled={loading}
      >
        {"Redefinir Senha"}
      </Button>

      <Typography variant="body2" sx={{ textAlign: "center" }}>
        Possui cadastro?{" "}
        <Link
          to="/login"
          style={{
            color: colors.secondary,
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      </Typography>
    </Box>
  );
}
