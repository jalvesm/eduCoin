package com.estudantil.moeda.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class VantagemRequest {
    private String titulo;
    private String descricao;
    private String imagem;
    private Integer custoMoedas;
    private UUID empresaId;
}
