package com.estudantil.moeda.dto;

import com.estudantil.moeda.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.Data;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "tipoUsuario", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = CreateAlunoDTO.class, name = "ALUNO"),
        @JsonSubTypes.Type(value = CreateProfessorDTO.class, name = "PROFESSOR"),
        @JsonSubTypes.Type(value = CreateEmpresaDTO.class, name = "EMPRESA")
})
@Data
public class CreateUsuarioDTO {
    private String nome;
    private String email;
    private String senha;
    private TipoUsuario tipoUsuario;
}