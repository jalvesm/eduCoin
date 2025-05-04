import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import colors from "../../../shared/theme/colors";
import { useState } from "react";
import SucessModal from "./SucessModal";
import React from "react";

export default function SignUpBox() {
  const [nameInput, setName] = useState("");
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [, setPasswordError] = useState(false);
  const [error, setError] = useState("");
  const [openSucessModal, setOpenSucessModal] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lettersRegex = /^[A-Za-z\s]*$/;

    if (lettersRegex.test(value)) {
      setName(value);
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmail(value);
    setEmailError(!emailRegex.test(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#+-])[A-Za-z\d@$!%*?&#+-]{8,}$/;

    setPassword(value);
    setPasswordError(!passwordRegex.test(value));
  };

  const handleOpenModal = () => {
    setOpenSucessModal(true);
  };

  const handleCleanData = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        width: "100%",
        maxWidth: "400px",
      }}
    >
      {error && (
        <Typography
          variant="body2"
          color={colors.error}
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          {error}
        </Typography>
      )}

      <TextField
        label="Nome completo"
        value={nameInput}
        onChange={handleNameChange}
        fullWidth
        error={nameError}
        helperText={nameError ? "Apenas letras permitidas." : ""}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderWidth: 2,
              borderColor: colors.primary,
            },
            "&:hover fieldset": {
              borderColor: colors.secondary,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.white,
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.white,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: colors.white,
          },
        }}
      />
      <TextField
        label="E-mail"
        value={emailInput}
        onChange={handleEmailChange}
        fullWidth
        error={emailError}
        helperText={emailError ? "Formato: seunome@email.com" : ""}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderWidth: 2,
              borderColor: colors.primary,
            },
            "&:hover fieldset": {
              borderColor: colors.secondary,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.white,
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.white,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: colors.white,
          },
        }}
      />
      <TextField
        label="Senha"
        type="password"
        value={passwordInput}
        onChange={handlePasswordChange}
        fullWidth
        required
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderWidth: 2,
              borderColor: colors.primary,
            },
            "&:hover fieldset": {
              borderColor: colors.secondary,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.white,
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.white,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: colors.white,
          },
        }}
      />

      <Button
        //  onClick={onSubmit}
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: colors.lightBlue,
          color: colors.secondary,
          borderRadius: "10px",
          height: "48px",
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Cadastrar
      </Button>

      {openSucessModal && <SucessModal open={openSucessModal} />}
    </Box>
  );
}
