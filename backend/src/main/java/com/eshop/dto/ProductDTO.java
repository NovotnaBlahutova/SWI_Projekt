package com.eshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long id;
    private String nazev;
    private String slug;
    private Double cena;
    private String popis;
    private String tag;
    private String gender;
    private String imageUrl;
    private Long categoryId;
    private String categoryNazev;
    private Long supplierId;
    private String supplierName;
    private Set<Long> attributeIds;

}