package com.estudantil.moeda.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateCupomDTO {
    
    @NotBlank(message = "O código do cupom é obrigatório")
    private String codigo;

    @NotNull(message = "O valor do cupom é obrigatório")
    private Double valor;

    @NotNull(message = "O ID do aluno é obrigatório")
    private UUID alunoId;

    @NotNull(message = "O ID da empresa é obrigatório")
    private UUID empresaId;
} 