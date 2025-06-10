package com.estudantil.moeda.repository;

import com.estudantil.moeda.model.Empresa;
import com.estudantil.moeda.model.Vantagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Repository
public interface VantagemRepository extends JpaRepository<Vantagem, UUID> {
    boolean existsByTituloIgnoreCaseAndEmpresaId(String titulo, UUID empresaId);

    List<Vantagem> findByEmpresaId(UUID empresaId);

    Optional<Vantagem> findByEmpresaAndCustoMoedas(Empresa empresa, Integer custoMoedas);
}