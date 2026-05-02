package com.eshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product_attributes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttribute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String attributeType; // e.g., "SIZE", "VOLUME"

    @Column(nullable = false, length = 100)
    private String value; // e.g., "42", "100ml"

    @ManyToMany(mappedBy = "attributes")
    private Set<Product> products = new HashSet<>();

}
