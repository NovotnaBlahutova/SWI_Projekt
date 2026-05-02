package com.eshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "produkty")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String nazev;

    @Column(nullable = false, length = 255, unique = true)
    private String slug;

    @Column(nullable = false)
    private Double cena;

    @Column(columnDefinition = "LONGTEXT")
    private String popis;

    @Column(length = 100)
    private String tag;

    @Column(nullable = false, length = 50)
    private String gender;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    // Many-to-One relationship with Category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // Many-to-One relationship with Supplier
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    // Many-to-Many relationship with ProductAttribute
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "product_attributes_mapping",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "attribute_id")
    )
    private Set<ProductAttribute> attributes = new HashSet<>();

    // One-to-Many relationship with OrderItem
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = false)
    private Set<OrderItem> orderItems = new HashSet<>();

}
