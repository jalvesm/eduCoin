package com.estudantil.moeda.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Getter
@Setter
@Table(name = "professor")
public class Professor extends Usuario {

    public static final double SALDO_SEMESTRAL_DE_MOEDAS = 1000;

    @Column(unique = true)
    private String cpf;

    private String departamento;

    @Column(name = "quantidade_moedas", nullable = false)
    private Double quantidadeMoedas;

    @ManyToOne
    @JoinColumn(name = "instituicao_id", nullable = false)
    private Instituicao instituicao;
} 