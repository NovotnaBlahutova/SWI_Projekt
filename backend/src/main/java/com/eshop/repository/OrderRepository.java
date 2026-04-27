package com.eshop.repository;

import com.eshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Zde můžeš později přidat hledání podle čísla objednávky
}
