package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
} 