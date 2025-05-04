package com.estudantil.moeda.dto;

import java.util.UUID;

public record GetAllInstituicoes(
        UUID id,
        String nome,
        String endereco
) {

}
