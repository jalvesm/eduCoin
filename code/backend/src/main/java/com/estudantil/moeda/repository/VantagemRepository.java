package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Vantagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface VantagemRepository extends JpaRepository<Vantagem, Long> {
} 