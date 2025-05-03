package com.estudantil.moeda.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateAlunoDTO {
    private String nome;
    private String email;
    private String senha;
    private String cpf;
    private String rg;
    private String endereco;
    private UUID instituicaoId;
    private String curso;
}
