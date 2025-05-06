import { Box, Typography } from "@mui/material";
import React from "react";

export default function AccessDenied() {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" color="error" gutterBottom>
        Acesso Negado
      </Typography>
      <Typography variant="body1">
        Você não tem permissão para acessar esta página.
      </Typography>
    </Box>
  );
}
