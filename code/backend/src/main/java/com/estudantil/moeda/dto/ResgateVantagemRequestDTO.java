package com.estudantil.moeda.dto;

import java.util.UUID;

import org.antlr.v4.runtime.misc.NotNull;

public record ResgateVantagemRequestDTO(
        @NotNull
        UUID alunoId,

        @NotNull
        UUID vantagemId
) {
}
