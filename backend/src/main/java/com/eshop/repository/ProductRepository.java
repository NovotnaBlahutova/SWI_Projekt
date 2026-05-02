package com.eshop.repository;

import com.eshop.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort; // <--- Důležité pro řazení
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
    Optional<Product> findBySlug(String slug);
    List<Product> findByGender(String gender);
    Page<Product> findByGender(String gender, Pageable pageable);
    List<Product> findByCategoryId(Long categoryId);
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
    List<Product> findBySupplierId(Long supplierId);
    List<Product> findByCenaBetween(Double min, Double max);

    @Query("SELECT p FROM Product p WHERE LOWER(p.nazev) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchByNazev(@Param("query") String query);

    @Query("SELECT p FROM Product p WHERE LOWER(p.nazev) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Product> searchByNazevPaginated(@Param("query") String query, Pageable pageable);
}
