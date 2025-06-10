package com.estudantil.moeda.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateInstituicaoDTO {
    
    @NotBlank(message = "O nome da instituição é obrigatório")
    private String nome;

    @NotBlank(message = "O endereço é obrigatório")
    private String endereco;

} 