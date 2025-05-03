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
@Table(name = "empresa")
public class Empresa extends Usuario {
    @Column(unique = true)
    private String cnpj;
} 