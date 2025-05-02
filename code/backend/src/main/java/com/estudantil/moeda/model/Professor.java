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
@Table(name = "professor")
public class Professor extends Usuario {
    @Column(name = "cpf", unique = true)
    private String cpf;

    @Column(name = "departamento")
    private String departamento;

    @Column(name = "quantidade_moedas", nullable = false)
    private Double quantidadeMoedas = 1000.0;

    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;
} 