package com.eshop.repository;

import com.eshop.entity.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Long> {

    List<ProductAttribute> findByAttributeType(String attributeType);

    Optional<ProductAttribute> findByAttributeTypeAndValue(String attributeType, String value);

    boolean existsByAttributeTypeAndValue(String attributeType, String value);

}