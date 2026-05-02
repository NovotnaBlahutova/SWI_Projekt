package com.eshop.service;

import com.eshop.dto.OrderDTO;
import com.eshop.dto.OrderItemDTO;
import com.eshop.entity.Order;
import com.eshop.entity.OrderItem;
import com.eshop.entity.Product;
import com.eshop.entity.User;
import com.eshop.repository.OrderRepository;
import com.eshop.repository.ProductRepository;
import com.eshop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    /**
     * Get all orders
     */
    public List<OrderDTO> getAll() {
        return orderRepository.findAll()
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get order by ID
     */
    public Optional<OrderDTO> getById(Long id) {
        return orderRepository.findById(id)
                .map(this::entityToDTO);
    }

    /**
     * Get order by order number
     */
    public Optional<OrderDTO> getByOrderNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber)
                .map(this::entityToDTO);
    }

    /**
     * Get all orders for a user
     */
    public List<OrderDTO> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get all orders with pagination
     */
    public Page<OrderDTO> getAllPaginated(Pageable pageable) {
        return orderRepository.findAll(pageable)
                .map(this::entityToDTO);
    }

    /**
     * Get all orders for a user with pagination
     */
    public Page<OrderDTO> getOrdersByUserIdPaginated(Long userId, Pageable pageable) {
        return orderRepository.findByUserId(userId, pageable)
                .map(this::entityToDTO);
    }

    /**
     * Create a new order with items
     * CRITICAL: Calculates total price from OrderItems and persists items
     */
    public Optional<OrderDTO> create(OrderDTO orderDTO) {
        Optional<User> user = userRepository.findById(orderDTO.getUserId());
        if (user.isEmpty()) {
            return Optional.empty();
        }

        Order order = new Order();
        order.setOrderNumber(orderDTO.getOrderNumber());
        order.setOrderDate(LocalDateTime.now());
        order.setDueDate(orderDTO.getDueDate());
        order.setDeliveryAddress(orderDTO.getDeliveryAddress());
        order.setNotes(orderDTO.getNotes());
        order.setUser(user.get());
        order.setOrderState(Order.OrderState.NOVA);
        order.setPaymentState(Order.PaymentState.NEZAPLACENA);

        // Initialize items set
        order.setItems(new HashSet<>());

        // Build OrderItem entities from DTOs and compute total
        Double totalPrice = 0.0;
        if (orderDTO.getItems() != null && !orderDTO.getItems().isEmpty()) {
            for (OrderItemDTO itemDTO : orderDTO.getItems()) {
                Optional<Product> productOpt = productRepository.findById(itemDTO.getProductId());
                if (productOpt.isEmpty()) {
                    // Skip invalid product entries
                    continue;
                }
                Product product = productOpt.get();

                OrderItem item = new OrderItem();
                item.setProduct(product);
                item.setQuantity(itemDTO.getQuantity());
                item.setUnitPrice(itemDTO.getUnitPrice() != null ? itemDTO.getUnitPrice() : product.getCena());
                Double computedTotal = itemDTO.getTotalPrice() != null ? itemDTO.getTotalPrice() : item.getQuantity() * item.getUnitPrice();
                item.setTotalPrice(computedTotal);
                item.setNotes(itemDTO.getNotes());
                item.setOrder(order);

                order.getItems().add(item);
                totalPrice += computedTotal;
            }
        }
        order.setTotalPrice(totalPrice);

        Order saved = orderRepository.save(order);
        return Optional.of(entityToDTO(saved));
    }

    /**
     * Update an existing order
     */
    public Optional<OrderDTO> update(Long id, OrderDTO orderDTO) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setDeliveryAddress(orderDTO.getDeliveryAddress());
                    order.setNotes(orderDTO.getNotes());
                    order.setDueDate(orderDTO.getDueDate());
                    order.setDeliveryDate(orderDTO.getDeliveryDate());

                    if (orderDTO.getOrderState() != null) {
                        try {
                            order.setOrderState(Order.OrderState.valueOf(orderDTO.getOrderState()));
                        } catch (IllegalArgumentException e) {
                            // Keep existing state if invalid
                        }
                    }

                    if (orderDTO.getPaymentState() != null) {
                        try {
                            order.setPaymentState(Order.PaymentState.valueOf(orderDTO.getPaymentState()));
                        } catch (IllegalArgumentException e) {
                            // Keep existing state if invalid
                        }
                    }

                    Order updated = orderRepository.save(order);
                    return entityToDTO(updated);
                });
    }

    /**
     * Delete an order by ID
     */
    public boolean delete(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Add order item to order and recalculate total
     */
    public Optional<OrderDTO> addOrderItem(Long orderId, OrderItemDTO itemDTO) {
        return orderRepository.findById(orderId)
                .flatMap(order -> {
                    if (order.getItems() == null) {
                        order.setItems(new HashSet<>());
                    }
                    Optional<Product> product = productRepository.findById(itemDTO.getProductId());
                    if (product.isEmpty()) {
                        return Optional.empty();
                    }

                    OrderItem item = new OrderItem();
                    item.setProduct(product.get());
                    item.setQuantity(itemDTO.getQuantity());
                    item.setUnitPrice(itemDTO.getUnitPrice() != null ? itemDTO.getUnitPrice() : product.get().getCena());
                    item.setTotalPrice(itemDTO.getTotalPrice() != null 
                            ? itemDTO.getTotalPrice() 
                            : item.getQuantity() * item.getUnitPrice());
                    item.setNotes(itemDTO.getNotes());
                    item.setOrder(order);

                    order.getItems().add(item);

                    // Recalculate total price
                    Double newTotal = order.getItems().stream()
                            .mapToDouble(OrderItem::getTotalPrice)
                            .sum();
                    order.setTotalPrice(newTotal);

                    Order updated = orderRepository.save(order);
                    return Optional.of(entityToDTO(updated));
                });
    }

    /**
     * Remove order item and recalculate total
     */
    public Optional<OrderDTO> removeOrderItem(Long orderId, Long orderItemId) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    if (order.getItems() == null) {
                        return entityToDTO(order);
                    }

                    order.getItems().removeIf(item -> item.getId().equals(orderItemId));

                    // Recalculate total price
                    Double newTotal = order.getItems().stream()
                            .mapToDouble(OrderItem::getTotalPrice)
                            .sum();
                    order.setTotalPrice(newTotal);

                    Order updated = orderRepository.save(order);
                    return entityToDTO(updated);
                });
    }

    /**
     * Convert Entity to DTO
     */
    private OrderDTO entityToDTO(Order order) {
        List<OrderItemDTO> items = order.getItems() != null
                ? order.getItems().stream()
                .map(this::orderItemEntityToDTO)
                .collect(Collectors.toList())
                : null;

        return new OrderDTO(
                order.getId(),
                order.getOrderNumber(),
                order.getOrderDate(),
                order.getDueDate(),
                order.getDeliveryDate(),
                order.getTotalPrice(),
                order.getOrderState() != null ? order.getOrderState().name() : null,
                order.getPaymentState() != null ? order.getPaymentState().name() : null,
                order.getDeliveryAddress(),
                order.getNotes(),
                order.getUser() != null ? order.getUser().getId() : null,
                order.getUser() != null ? order.getUser().getEmail() : null,
                items
        );
    }

    /**
     * Convert OrderItem Entity to DTO
     */
    private OrderItemDTO orderItemEntityToDTO(OrderItem item) {
        return new OrderItemDTO(
                item.getId(),
                item.getQuantity(),
                item.getUnitPrice(),
                item.getTotalPrice(),
                item.getNotes(),
                item.getOrder() != null ? item.getOrder().getId() : null,
                item.getProduct() != null ? item.getProduct().getId() : null,
                item.getProduct() != null ? item.getProduct().getNazev() : null
        );
    }

}