package com.eshop.controller;

import com.eshop.dto.OrderDTO;
import com.eshop.dto.OrderItemDTO;
import com.eshop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /**
     * GET /api/orders - Get all orders
     */
    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<OrderDTO> orders = orderService.getAll();
        return ResponseEntity.ok(orders);
    }

    /**
     * GET /api/orders/{id} - Get order by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        return orderService.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * GET /api/orders/number/{orderNumber} - Get order by order number
     */
    @GetMapping("/number/{orderNumber}")
    public ResponseEntity<OrderDTO> getOrderByOrderNumber(@PathVariable String orderNumber) {
        return orderService.getByOrderNumber(orderNumber)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * GET /api/orders/user/{userId} - Get all orders for a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUserId(@PathVariable Long userId) {
        List<OrderDTO> orders = orderService.getOrdersByUserId(userId);
        if (orders.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orders);
    }

    /**
     * GET /api/orders/paginated?page=0&size=10 - Get all orders with pagination
     */
    @GetMapping("/paginated")
    public ResponseEntity<Page<OrderDTO>> getOrdersPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OrderDTO> orders = orderService.getAllPaginated(pageable);
        return ResponseEntity.ok(orders);
    }

    /**
     * GET /api/orders/user/{userId}/paginated?page=0&size=10 - Get orders for user with pagination
     */
    @GetMapping("/user/{userId}/paginated")
    public ResponseEntity<Page<OrderDTO>> getOrdersByUserIdPaginated(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OrderDTO> orders = orderService.getOrdersByUserIdPaginated(userId, pageable);
        return ResponseEntity.ok(orders);
    }

    /**
     * POST /api/orders - Create a new order
     * CRITICAL: Automatically calculates total price from OrderItems
     */
    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.create(orderDTO)
                .map(dto -> ResponseEntity.status(HttpStatus.CREATED).body(dto))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    /**
     * PUT /api/orders/{id} - Update an order
     */
    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        return orderService.update(id, orderDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * DELETE /api/orders/{id} - Delete an order
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (orderService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * POST /api/orders/{id}/items - Add an item to an order
     */
    @PostMapping("/{id}/items")
    public ResponseEntity<OrderDTO> addOrderItem(
            @PathVariable Long id,
            @RequestBody OrderItemDTO itemDTO) {
        return orderService.addOrderItem(id, itemDTO)
                .map(dto -> ResponseEntity.status(HttpStatus.CREATED).body(dto))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    /**
     * DELETE /api/orders/{id}/items/{itemId} - Remove an item from an order
     */
    @DeleteMapping("/{id}/items/{itemId}")
    public ResponseEntity<OrderDTO> removeOrderItem(
            @PathVariable Long id,
            @PathVariable Long itemId) {
        return orderService.removeOrderItem(id, itemId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}