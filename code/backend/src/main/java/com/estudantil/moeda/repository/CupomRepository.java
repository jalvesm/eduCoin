package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.model.Cupom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CupomRepository extends JpaRepository<Cupom, UUID> {

    List<Cupom> findAllByAluno(Aluno aluno);
} 