package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Instituicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InstituicaoRepository extends JpaRepository<Instituicao, UUID> {
} 