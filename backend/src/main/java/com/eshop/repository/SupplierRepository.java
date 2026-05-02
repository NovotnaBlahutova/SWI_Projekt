package com.eshop.repository;

import com.eshop.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    Optional<Supplier> findByEmail(String email);

    Optional<Supplier> findByIco(String ico);

    boolean existsByEmail(String email);

    boolean existsByIco(String ico);

}