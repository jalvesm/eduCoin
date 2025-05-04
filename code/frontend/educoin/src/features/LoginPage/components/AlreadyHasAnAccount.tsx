import { Button, Typography } from "@mui/material";
import colors from "../../../shared/theme/colors";
import { useNavigate } from "react-router-dom";
import React from "react";
import { PUBLIC_PAGES_URL } from "../../../services/AppPageUrl";

const AlreadyHasAnAccount = () => {
  // Hook de navegação do React Router
  const navigate = useNavigate();

  return (
    <>
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: colors.background,
          fontWeight: "bold",
        }}
      >
        Já possui uma conta?
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 1,
          backgroundColor: colors.primary,
          color: colors.textSecondary,
          borderRadius: "10px",
          height: "48px",
          width: "200px",
          fontWeight: "bold",
          textTransform: "none",
        }}
        onClick={() => {
          navigate(PUBLIC_PAGES_URL.INDEX);
        }}
      >
        Entrar
      </Button>
    </>
  );
};

export default AlreadyHasAnAccount;
