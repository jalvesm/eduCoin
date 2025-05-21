package com.estudantil.moeda.dto;

import com.estudantil.moeda.validation.Cpf;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateAlunoDTO extends CreateUsuarioDTO {

    @Cpf
    private String cpf;

    private String rg;
    private String endereco;
    private String curso;
    private Double saldoMoedas;
    private UUID instituicaoId;
}
