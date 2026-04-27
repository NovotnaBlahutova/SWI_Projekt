package com.eshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {

    private Long id;
    private Integer quantity;
    private Double unitPrice;
    private Double totalPrice;
    private String notes;
    private Long orderId;
    private Long productId;
    private String productNazev;

}