package com.estudantil.moeda.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ResetSenhaRequestDTO {

    @NotNull(message = "Email é obrigatório")
    @Email(message = "Email no formato inválido")
    private String email;

    @NotNull(message = "A nova senha é obrigatória")
    @NotBlank(message = "A nova senha é obrigatória")
    private String novaSenha;
}