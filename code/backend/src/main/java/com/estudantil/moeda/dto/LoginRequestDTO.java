package com.estudantil.moeda.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {

    @Email(message = "Email inválido")
    private String email;

    @NotNull(message = "A senha é obrigatória")
    private String senha;
}
