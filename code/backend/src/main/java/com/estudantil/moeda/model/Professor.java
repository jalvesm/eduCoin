package com.estudantil.moeda.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "professor")
public class Professor extends Usuario {
    @Column(unique = true)
    private String cpf;

    private String departamento;

    @Column(name = "quantidade_moedas", nullable = false)
    private Double quantidadeMoedas = 1000.0;

    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;
} 