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
@Table(name = "aluno")
public class Aluno extends Usuario {

    @Column(name = "cpf", unique = true)
    private String cpf;

    @Column(name = "rg", unique = true)
    private String rg;

    @Column(name = "endereco")
    private String endereco;

    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;

    @Column(name = "curso")
    private String curso;

    @Column(name = "saldo_moedas", nullable = false)
    private Double saldoMoedas = 0.0;
}