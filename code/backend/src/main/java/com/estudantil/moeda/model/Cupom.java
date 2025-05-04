package com.estudantil.moeda.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cupom")
public class Cupom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "codigo", nullable = false, length = 10)
    private String codigo;

    @Column(name = "data_geracao", nullable = false)
    private LocalDateTime dataGeracao;

    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "vantagem_id", nullable = false)
    private Vantagem vantagem;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Cupom cupom = (Cupom) o;
        return Objects.equals(id, cupom.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}