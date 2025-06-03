import { Box, Typography, Link, Container } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #e0e0e0",
        mt: "auto",
        py: 3,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} EduCoin. Todos os direitos reservados.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Desenvolvido por{" "}
          <Link
            href="https://seuportifolio.com"
            color="inherit"
            underline="hover"
            target="_blank"
            rel="noopener"
          >
            Seu Nome
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
