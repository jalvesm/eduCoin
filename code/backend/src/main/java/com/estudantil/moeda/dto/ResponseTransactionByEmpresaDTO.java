package com.estudantil.moeda.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public record ResponseTransactionByEmpresaDTO(
        UUID id,
        String descricao,
        double valor,
        String data,
        String nomeCliente
) {
    public ResponseTransactionByEmpresaDTO(UUID id, String descricao, double valor, LocalDateTime dataTransacao, String nomeCliente) {
        this(id, descricao, valor, dataTransacao.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")), nomeCliente);
    }

}
