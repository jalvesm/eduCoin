package com.estudantil.moeda.dto;

import com.estudantil.moeda.enums.TipoTransacao;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateTransacaoDTO {
    
    @NotNull(message = "O tipo de transação é obrigatório")
    private TipoTransacao tipoTransacao;

    @NotNull(message = "O valor é obrigatório")
    @Positive(message = "O valor deve ser positivo")
    private Double valor;

    @NotNull(message = "O ID do aluno é obrigatório")
    private UUID alunoId;

    @NotNull(message = "O ID do professor é obrigatório")
    private UUID professorId;

    private String descricao;
} 