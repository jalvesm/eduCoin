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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HeaderMenu from "../../shared/components/HeaderMenu/HeaderMenu";
import { useEnterprise } from "./hooks/useEnterprise";
import { Vantagem } from "./types/enterprise";

export default function EnterpriseHomePage() {
  const { vantagens, loading, erro, criarVantagem } = useEnterprise();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    const empresaId = localStorage.getItem("id");

    if (!empresaId) {
      alert("Empresa não encontrada.");
      return;
    }

    const novaVantagem: Omit<Vantagem, "id"> = {
      ...form,
      empresa: { id: empresaId } as any,
    };

    setSubmitting(true);
    try {
      await criarVantagem(novaVantagem);
      setOpen(false);
      setForm({
        titulo: "",
        descricao: "",
        imagem: "",
        custoMoedas: 0,
      });
    } catch (err) {
      alert("Erro ao criar vantagem");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HeaderMenu />
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Vantagens Disponíveis
        </Typography>

        {loading && <CircularProgress />}
        {erro && <Alert severity="error">{erro}</Alert>}

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {vantagens.map((vantagem) => (
            <Box key={vantagem.id} sx={{ width: "300px" }}>
              <Card>
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
            label="URL da Imagem"
            name="imagem"
            value={form.imagem}
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
