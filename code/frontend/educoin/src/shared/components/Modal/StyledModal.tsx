import { styled } from "@mui/material/styles";
import { Modal } from "@mui/material";
import typography from "../../theme/typography";

const StyledModal = styled(Modal)(() => ({
  borderRadius: "15px", // Adiciona bordas arredondadas
  padding: "20px", // Adiciona algum espaçamento interno
  fontFamily: typography.fontFamily, // Define uma fonte padrão
  width: "80%", // Define uma largura de 80% para o modal
  maxWidth: "500px", // Define uma largura máxima de 500px
  height: "60%",
  maxHeight: "400px",
  display: "flex",
  alignItems: "center", // Alinha verticalmente
  justifyContent: "center", // Alinha horizontalmente
  position: "fixed", // Usa `fixed` para que o modal fique fixo na tela
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: "auto", // Certifica-se de que o modal está centralizado
  overflow: "hidden", // Esconde qualquer conteúdo que ultrapasse a altura máxima
}));

export default StyledModal;
