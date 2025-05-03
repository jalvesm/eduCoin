package com.estudantil.moeda.model.enums;

public enum TipoUsuario {
    ALUNO,
    EMPRESA,
    PROFESSOR;

    private final String name;

    TipoUsuario() {
        this.name = name();
    }

    public String getName() {
        return this.name;
    }
}
