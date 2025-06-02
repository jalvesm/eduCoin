package com.estudantil.moeda.dto;

import org.antlr.v4.runtime.misc.NotNull;

import lombok.Data;

@Data
public class LoginRequestDTO {
    @NotNull
    private String email;
    
    @NotNull
    private String senha;
}
