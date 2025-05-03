import { Box } from "@mui/material";
import logo from "../../../assets/moedas.png";

const LogoComponent = () => {
  return (
    <Box
      component="img"
      src={logo}
      alt="Logo"
      sx={{
        width: "100%",
        maxWidth: 250,
        height: "auto",
        margin: 1,
      }}
    />
  );
};

export default LogoComponent;
