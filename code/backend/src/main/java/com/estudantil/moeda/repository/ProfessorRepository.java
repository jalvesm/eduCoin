package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, UUID> {
} 