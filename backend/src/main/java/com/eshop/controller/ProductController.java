package com.eshop.controller;

import com.eshop.dto.ProductDTO;
import com.eshop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /**
     * GET /api/products - Get all products
     */
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAll();
        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/{id} - Get product by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return productService.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * GET /api/products/slug/{slug} - Get product by slug
     */
    @GetMapping("/slug/{slug}")
    public ResponseEntity<ProductDTO> getProductBySlug(@PathVariable String slug) {
        return productService.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * GET /api/products/category/{categoryId} - Get products by category ID
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable Long categoryId) {
        List<ProductDTO> products = productService.getByCategoryId(categoryId);
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/category-slug/{slug} - Get products by category slug
     */
    @GetMapping("/category-slug/{slug}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategorySlug(@PathVariable String slug) {
        List<ProductDTO> products = productService.getProductsByCategorySlug(slug);
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/supplier/{supplierId} - Get products by supplier ID
     */
    @GetMapping("/supplier/{supplierId}")
    public ResponseEntity<List<ProductDTO>> getProductsBySupplier(@PathVariable Long supplierId) {
        List<ProductDTO> products = productService.getBySupplierId(supplierId);
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/gender/{gender} - Get products by gender
     */
    @GetMapping("/gender/{gender}")
    public ResponseEntity<List<ProductDTO>> getProductsByGender(@PathVariable String gender) {
        List<ProductDTO> products = productService.getByGender(gender);
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/price-range?minPrice=X&maxPrice=Y - Get products by price range
     */
    @GetMapping("/price-range")
    public ResponseEntity<List<ProductDTO>> getProductsByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        List<ProductDTO> products = productService.getByPriceRange(minPrice, maxPrice);
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/search?query=X - Search products by name (nazev)
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam String query) {
        List<ProductDTO> products = productService.searchByNazev(query);
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/search-and-sort?query=X&sortBy=cena&sortDirection=ASC
     * CRITICAL: Supports searching and sorting by price (cena) or name (nazev)
     */
    @GetMapping("/search-and-sort")
    public ResponseEntity<List<ProductDTO>> searchAndSort(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "nazev") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection) {
        
        // Validate sortBy parameter
        if (!sortBy.equalsIgnoreCase("nazev") && !sortBy.equalsIgnoreCase("cena")) {
            return ResponseEntity.badRequest().build();
        }
        
        List<ProductDTO> products = productService.searchAndSort(query, sortBy, sortDirection);
        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/paginated?page=0&size=10&gender=female - Get products with pagination and gender filter
     */
    @GetMapping("/paginated")
    public ResponseEntity<Page<ProductDTO>> getProductsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String gender) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductDTO> products;

        if (gender != null && !gender.isEmpty()) {
            products = productService.getByGenderPaginated(gender, pageable);
        } else {
            products = productService.getByGenderPaginated(gender, pageable);
        }

        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/category/{categoryId}/paginated?page=0&size=10 - Get products by category with pagination
     */
    @GetMapping("/category/{categoryId}/paginated")
    public ResponseEntity<Page<ProductDTO>> getProductsByCategoryPaginated(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductDTO> products = productService.getByCategoryIdPaginated(categoryId, pageable);
        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/search/paginated?query=X&page=0&size=10 - Search products by name with pagination
     */
    @GetMapping("/search/paginated")
    public ResponseEntity<Page<ProductDTO>> searchProductsPaginated(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductDTO> products = productService.searchByNazevPaginated(query, pageable);
        return ResponseEntity.ok(products);
    }

    /**
     * POST /api/products - Create a new product
     */
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        return productService.create(productDTO)
                .map(dto -> ResponseEntity.status(HttpStatus.CREATED).body(dto))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    /**
     * PUT /api/products/{id} - Update a product
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        return productService.update(id, productDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * DELETE /api/products/{id} - Delete a product
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}