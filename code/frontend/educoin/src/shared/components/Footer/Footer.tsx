import { Box, Typography, Container } from "@mui/material";
import React from "react";
import colors from "../../theme/colors";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.primary,
        borderTop: "1px solid #e0e0e0",
        mt: "auto",
        py: 3,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} EduCoin. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
