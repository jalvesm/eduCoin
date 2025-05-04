package com.estudantil.moeda.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class CreateProfessorDTO extends CreateUsuarioDTO {
    private String cpf;
    private String departamento;
    private Double quantidadeMoedas;
    private UUID instituicaoId;
} 