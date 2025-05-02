package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Cupom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface CupomRepository extends JpaRepository<Cupom, Long> {
} 