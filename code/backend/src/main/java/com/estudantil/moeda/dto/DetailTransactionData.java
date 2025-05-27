package com.estudantil.moeda.dto;

import java.time.LocalDateTime;

public record DetailTransactionData(
    LocalDateTime dataTransacao,
    String descricao,
    String nomeRemetente,
    String nomeDestinatario,
    Double valor
) {}