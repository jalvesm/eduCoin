package com.estudantil.moeda.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record ResgateVantagemRequestDTO(
        @NotNull
        UUID alunoId,

        @NotNull
        UUID vantagemId
) {
}
