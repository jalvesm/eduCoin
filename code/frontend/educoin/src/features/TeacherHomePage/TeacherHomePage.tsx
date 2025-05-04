import React from "react";
import { Box, Typography } from "@mui/material";
import HeaderMenu from "../../shared/components/HeaderMenu/HeaderMenu";

export default function TeacherHomePage() {
  return (
    <>
      <HeaderMenu />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "gray" }}>
          Em breve implementação
        </Typography>
      </Box>
    </>
  );
}
