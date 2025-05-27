package com.estudantil.moeda.controller;

import java.util.UUID;

public record AtribuirMoedasDTO(
    UUID alunoId,
    Double valor,
    String descricao
) {
}
