import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Fab,
  CircularProgress,
  Alert,
  Modal,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HeaderMenu from "../../../shared/components/HeaderMenu/HeaderMenu";
import { useEnterprise } from "../hooks/useEnterprise";
import ImageUpload from "../../../shared/upload/ImageUpload";

export default function CreateAdvantages() {
  const { vantagens, loading, erro, criarVantagem } = useEnterprise();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    mensagem: string;
    tipo: "success" | "error";
    aberto: boolean;
  }>({
    mensagem: "",
    tipo: "success",
    aberto: false,
  });

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    imagem: "",
    custoMoedas: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "custoMoedas" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const empresaId = usuario.id;

    const novaVantagem = {
      titulo: form.titulo,
      descricao: form.descricao,
      imagem: form.imagem,
      custoMoedas: form.custoMoedas,
      empresaId,
    };

    setSubmitting(true);
    try {
      await criarVantagem(novaVantagem);
      setFeedback({
        mensagem: "Vantagem criada com sucesso!",
        tipo: "success",
        aberto: true,
      });

      setOpen(false);
      setForm({
        titulo: "",
        descricao: "",
        imagem: "",
        custoMoedas: 0,
      });
    } catch (err) {
      setFeedback({
        mensagem: "Erro ao criar vantagem",
        tipo: "error",
        aberto: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HeaderMenu />
      <Snackbar
        open={feedback.aberto}
        autoHideDuration={4000}
        onClose={() => setFeedback({ ...feedback, aberto: false })}
      >
        <Alert
          severity={feedback.tipo}
          onClose={() => setFeedback({ ...feedback, aberto: false })}
        >
          {feedback.mensagem}
        </Alert>
      </Snackbar>

      <Box sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, color: "#A7C7E7" }}
        >
          Vantagens Disponíveis
        </Typography>

        {loading && <CircularProgress />}
        {erro && <Alert severity="error">{erro}</Alert>}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 3,
          }}
        >
          {vantagens.map((vantagem) => (
            <Box key={vantagem.id} sx={{ width: "300px" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: 320,
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={vantagem.imagem}
                  alt={vantagem.titulo}
                />
                <CardContent>
                  <Typography variant="h6">{vantagem.titulo}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {vantagem.descricao}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    Custo: {vantagem.custoMoedas} moedas
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 24, right: 24 }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Criar Vantagem
          </Typography>
          <TextField
            label="Título"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descrição"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Custo de Moedas"
            name="custoMoedas"
            type="number"
            value={form.custoMoedas}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box
            sx={{
              height: "56px",
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "0 16px",
              backgroundColor: "white",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            <ImageUpload
              onImageUploaded={(url) =>
                setForm((prev) => ({ ...prev, imagem: url }))
              }
            />
            {form.imagem && (
              <Typography
                variant="body2"
                sx={{
                  ml: 2,
                  flexGrow: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  color: "gray",
                }}
              >
                {form.imagem}
              </Typography>
            )}
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setOpen(false)} sx={{ mr: 1 }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
