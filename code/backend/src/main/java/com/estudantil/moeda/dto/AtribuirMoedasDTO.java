package com.estudantil.moeda.dto;

import java.util.UUID;
import org.antlr.v4.runtime.misc.NotNull;
import jakarta.validation.constraints.Positive;

public record AtribuirMoedasDTO(
    @NotNull 
    UUID alunoId,
    
    @NotNull 
    @Positive(message = "O valor deve ser maior que zero") 
    Double valor,

    String descricao
) {}