import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const ExchangePage: React.FC = () => {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("usuarioId");
  const [saldo, setSaldo] = useState<number>(0);
  const [erro, setErro] = useState<string>("");

  const [categorias, setCategorias] = useState<string[]>([]);
  const [parceiras, setParceiras] = useState<string[]>([]);
  const [vantagens, setVantagens] = useState<any[]>([]);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
  const [parceiraSelecionada, setParceiraSelecionada] = useState<string>("");
  const [vantagemSelecionada, setVantagemSelecionada] = useState<any | null>(null);

  // Buscar saldo do usuário
  useEffect(() => {
    if (!usuarioId) return;
    fetch(`/api/usuarios/${usuarioId}`)
      .then((res) => res.json())
      .then((data) => setSaldo(data.saldoMoedas))
      .catch(() => setErro("Erro ao buscar saldo."));
  }, [usuarioId]);

  // Buscar categorias
  useEffect(() => {
    fetch("/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch(() => setErro("Erro ao buscar categorias."));
  }, []);

  const handleCategoriaChange = (categoria: string) => {
    setCategoriaSelecionada(categoria);
    setParceiraSelecionada("");
    setVantagens([]);
    setVantagemSelecionada(null);

    fetch(`/api/parceiras?categoria=${encodeURIComponent(categoria)}`)
      .then((res) => res.json())
      .then((data) => setParceiras(data))
      .catch(() => setErro("Erro ao buscar parceiras."));
  };

  const handleParceiraChange = (parceira: string) => {
    setParceiraSelecionada(parceira);
    setVantagemSelecionada(null);

    fetch(`/api/vantagens?parceira=${encodeURIComponent(parceira)}`)
      .then((res) => res.json())
      .then((data) => setVantagens(data))
      .catch(() => setErro("Erro ao buscar vantagens."));
  };

  const handleTroca = async () => {
    if (!vantagemSelecionada || !usuarioId) return;

    if (vantagemSelecionada.valor > saldo) {
      setErro("Você não tem moedas suficientes.");
      return;
    }

    try {
      const response = await fetch("/api/transacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId: Number(usuarioId),
          vantagemId: vantagemSelecionada.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErro(errorData.message || "Erro ao realizar a troca.");
        return;
      }

      setSaldo((prev) => prev - vantagemSelecionada.valor);
      setErro("");
      alert("Troca realizada com sucesso!");
      setVantagemSelecionada(null);
    } catch (error) {
      setErro("Erro na conexão com o servidor.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        maxWidth: "700px",
        margin: "0 auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0056b3" }}>
        Trocar Moedas
      </Typography>

      <Typography variant="h6">Saldo atual: {saldo} moedas</Typography>
      {erro && <Typography color="error">{erro}</Typography>}

      {/* Categoria */}
      <FormControl fullWidth>
        <InputLabel>Categoria</InputLabel>
        <Select
          value={categoriaSelecionada}
          onChange={(e) => handleCategoriaChange(e.target.value)}
          label="Categoria"
        >
          {categorias.map((categoria) => (
            <MenuItem key={categoria} value={categoria}>
              {categoria}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Empresa Parceira */}
      {categoriaSelecionada && (
        <FormControl fullWidth>
          <InputLabel>Empresa Parceira</InputLabel>
          <Select
            value={parceiraSelecionada}
            onChange={(e) => handleParceiraChange(e.target.value)}
            label="Empresa Parceira"
          >
            {parceiras.map((parceira) => (
              <MenuItem key={parceira} value={parceira}>
                {parceira}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Vantagens */}
      {vantagens.length > 0 ? (
        <Grid container spacing={2}>
          {vantagens.map((v) => (
            <Grid item xs={12} sm={6} key={v.id}>
              <Card
                onClick={() => setVantagemSelecionada(v)}
                sx={{
                  cursor: "pointer",
                  border: v.id === vantagemSelecionada?.id ? "2px solid #0056b3" : "1px solid #ccc",
                }}
              >
                <CardMedia component="img" height="140" image={v.imagem} alt={v.nome} />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {v.nome}
                  </Typography>
                  <Typography variant="body2">{v.descricao}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Custa: {v.valor} moedas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Não há vantagens disponíveis para essa empresa.
        </Typography>
      )}

      {/* Botão de troca */}
      {vantagemSelecionada && (
        <Button
          onClick={handleTroca}
          variant="contained"
          sx={{
            backgroundColor: "#0056b3",
            color: "white",
            height: "48px",
            fontWeight: "bold",
            borderRadius: "10px",
          }}
        >
          Trocar Moedas
        </Button>
      )}

      {/* Voltar */}
      <Button
        onClick={() => navigate("/estudante")}
        variant="outlined"
        sx={{
          borderColor: "#0056b3",
          color: "#0056b3",
          height: "48px",
          fontWeight: "bold",
          borderRadius: "10px",
        }}
      >
        Voltar
      </Button>
    </Box>
  );
};

export default ExchangePage;
