package com.estudantil.moeda.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Getter
@Setter
@Table(name = "vantagem")
public class Vantagem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String titulo;
    
    @Column(columnDefinition = "TEXT")
    private String descricao;
    
    private String imagem;
    
    @Column(name = "custo_moedas")
    private Integer custoMoedas;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;
} 