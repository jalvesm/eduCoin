import { Box, Button, Typography } from "@mui/material";
import StyledModal from "../../../shared/components/Modal/StyledModal";
import colors from "../../../shared/theme/colors";
import { useNavigate } from "react-router-dom";
import React from "react";
import { PUBLIC_PAGES_URL } from "../../../services/AppPageUrl";

interface SucessModalProps {
  open: boolean;
}

const SucessModal = ({ open }: SucessModalProps) => {
  // Hook de navegação do React Router
  const navigate = useNavigate();
  return (
    <StyledModal
      open={open}
      hideBackdrop={false}
      sx={{
        backgroundColor: colors.background,
        height: "150px",
        width: "300px",
      }}
    >
      <Box
        textAlign="center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Centraliza a Box em relação à tela
          display: "flex",
          flexDirection: "column", // Define os itens em uma coluna
          justifyContent: "center", // Centraliza verticalmente
          alignItems: "center", // Centraliza horizontalmente
          borderRadius: "15px",
          width: "100%",
          height: "100%",
          backgroundColor: colors.background,
          p: 4,
          boxShadow: 24,
        }}
      >
        <Typography color={colors.textSecondary} fontWeight="bold">
          Cliente cadastrado com sucesso!
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: colors.secondary,
            color: colors.white,
            borderRadius: "10px",
            height: "48px",
            width: "200px",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "1px", // Sombra padrão
            transition: "box-shadow 0.3s ease", // Suaviza a transição de sombra
            "&:hover": {
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.6)", // Sombra mais intensa ao passar o mouse
            },
          }}
          onClick={() => navigate(PUBLIC_PAGES_URL.INDEX)}
        >
          Entrar
        </Button>
      </Box>
    </StyledModal>
  );
};

export default SucessModal;
