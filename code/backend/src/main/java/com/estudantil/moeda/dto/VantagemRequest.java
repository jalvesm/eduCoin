package com.estudantil.moeda.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Getter
@Setter
public class VantagemRequest {
    @NotBlank(message = "O título é obrigatório")
    @Size(max = 100, message = "O título deve ter no máximo 100 caracteres")
    private String titulo;
    private String descricao;
    @Pattern(regexp = "^(http|https)://.*$", message = "A imagem deve ser uma URL válida")
    private String imagem;
    @NotNull(message = "O custo em moedas é obrigatório")
    @Positive(message = "O custo deve ser positivo")
    @Max(value = 10000, message = "O custo não pode ser maior que 10.000 moedas") 
    private Integer custoMoedas;
    private UUID empresaId;
}
