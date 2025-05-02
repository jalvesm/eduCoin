package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
} 