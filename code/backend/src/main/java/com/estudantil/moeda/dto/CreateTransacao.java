package com.estudantil.moeda.dto;

import com.estudantil.moeda.model.Usuario;
import java.time.LocalDateTime;

public record CreateTransacao(
    Usuario remetente,
    Usuario destinatario,
    double valor,
    String descricao,
    LocalDateTime dataTransacao
) {}
