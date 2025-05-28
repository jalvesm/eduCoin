package com.estudantil.moeda.dto;

import com.estudantil.moeda.validation.Cpf;
import lombok.Data;
import java.util.UUID;

@Data
public class CreateProfessorDTO extends CreateUsuarioDTO {

    @Cpf
    private String cpf;

    private String departamento;

    private Double quantidadeMoedas;

    private UUID instituicaoId;
} 