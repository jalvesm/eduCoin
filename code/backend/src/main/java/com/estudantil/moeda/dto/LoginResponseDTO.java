package com.estudantil.moeda.dto;

import com.estudantil.moeda.enums.TipoUsuario;
import lombok.Data;

import java.util.UUID;

@Data
public class LoginResponseDTO {
    private UUID id;
    private String nome;
    private String email;
    private TipoUsuario tipoUsuario;
}
