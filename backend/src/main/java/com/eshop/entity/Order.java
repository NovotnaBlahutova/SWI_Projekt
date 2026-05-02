package com.eshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "objednavky")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String orderNumber;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @Column(nullable = false)
    private LocalDateTime dueDate;

    @Column
    private LocalDateTime deliveryDate;

    @Column(nullable = false)
    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderState orderState = OrderState.NOVA;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentState paymentState = PaymentState.NEZAPLACENA;

    @Column(length = 500)
    private String deliveryAddress;

    @Column(length = 500)
    private String notes;

    // Many-to-One relationship with User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // One-to-Many relationship with OrderItem
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<OrderItem> items = new HashSet<>();

    public enum OrderState {
        NOVA,
        ZPRACOVAVANA,
        POSLANA,
        DORUCENA,
        ZRUSENA
    }

    public enum PaymentState {
        NEZAPLACENA,
        CASTERECNE_ZAPLACENA,
        ZAPLACENA,
        VRACEJNA
    }

}
