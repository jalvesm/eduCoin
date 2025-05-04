package com.estudantil.moeda.dto;

import lombok.Data;

@Data
public class CreateEmpresaDTO extends CreateUsuarioDTO {
    private String cnpj;
} 