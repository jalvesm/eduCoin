package com.estudantil.moeda.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "professor")
public class Professor extends Usuario {

    public static final double SALDO_SEMESTRAL_DE_MOEDAS = 1000;

    @Column(name = "cpf", unique = true)
    private String cpf;

    @Column(name = "departamento")
    private String departamento;

    @Column(name = "quantidade_moedas", nullable = false)
    private Double quantidadeMoedas;

    @ManyToOne
    @JoinColumn(name = "instituicao_id", nullable = false)
    private Instituicao instituicao;
} 