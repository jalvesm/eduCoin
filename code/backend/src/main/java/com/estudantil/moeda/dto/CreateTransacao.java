package com.estudantil.moeda.dto;

import com.estudantil.moeda.model.Usuario;

import java.time.LocalDateTime;

import org.antlr.v4.runtime.misc.NotNull;

public record CreateTransacao(
    @NotNull
    Usuario remetente,

    @NotNull
    Usuario destinatario,

    @NotNull
    double valor,
    
    String descricao,
    
    LocalDateTime dataTransacao
) {}
