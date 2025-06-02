package com.estudantil.moeda.dto;

import org.antlr.v4.runtime.misc.NotNull;

import lombok.Data;

@Data
public class CreateEmpresaDTO extends CreateUsuarioDTO {
    @NotNull
    private String cnpj;
}