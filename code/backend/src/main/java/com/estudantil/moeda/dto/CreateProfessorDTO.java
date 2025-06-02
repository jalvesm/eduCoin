package com.estudantil.moeda.dto;

import lombok.Data;
import java.util.UUID;

import org.antlr.v4.runtime.misc.NotNull;

@Data
public class CreateProfessorDTO extends CreateUsuarioDTO {
    private String cpf;
    private String departamento;
    private Double quantidadeMoedas;
    
    @NotNull
    private UUID instituicaoId;
} 