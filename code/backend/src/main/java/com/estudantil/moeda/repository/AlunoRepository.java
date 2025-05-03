package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, UUID> {

    public boolean existsByEmail(String email);

    boolean existsByCpf(String cpf);

} 