package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Aluno;
import com.estudantil.moeda.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, UUID> {

    Optional<Aluno> findById(Empresa empresa);
} 