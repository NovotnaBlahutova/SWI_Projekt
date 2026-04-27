package com.eshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long id;
    private String orderNumber;
    private LocalDateTime orderDate;
    private LocalDateTime dueDate;
    private LocalDateTime deliveryDate;
    private Double totalPrice;
    private String orderState;
    private String paymentState;
    private String deliveryAddress;
    private String notes;
    private Long userId;
    private String userEmail;
    private List<OrderItemDTO> items;

}