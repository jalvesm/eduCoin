package com.estudantil.moeda.dto;

import com.estudantil.moeda.enums.TipoUsuario;
import lombok.Data;

@Data
public class CreateUsuarioDTO {
    private String nome;
    private String email;
    private String senha;
    private TipoUsuario tipoUsuario;
} 