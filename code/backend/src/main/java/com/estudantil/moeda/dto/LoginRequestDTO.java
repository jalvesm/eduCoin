package com.estudantil.moeda.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequestDTO {

    @Email(message = "Email inválido")
    private String email;

    @NotNull(message = "A senha é obrigatória")
    private String senha;
}
