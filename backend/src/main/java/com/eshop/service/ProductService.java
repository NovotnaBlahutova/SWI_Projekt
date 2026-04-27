package com.eshop.service;

import com.eshop.dto.ProductDTO;
import com.eshop.entity.Category;
import com.eshop.entity.Product;
import com.eshop.entity.Supplier;
import com.eshop.repository.CategoryRepository;
import com.eshop.repository.ProductRepository;
import com.eshop.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;

    /**
     * Get all products
     */
    public List<ProductDTO> getAll() {
        return productRepository.findAll()
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get product by ID
     */
    public Optional<ProductDTO> getById(Long id) {
        return productRepository.findById(id)
                .map(this::entityToDTO);
    }

    /**
     * Get product by slug
     */
    public Optional<ProductDTO> getBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .map(this::entityToDTO);
    }

    /**
     * Get all products by category slug
     */
    public List<ProductDTO> getProductsByCategorySlug(String slug) {
        return categoryRepository.findBySlug(slug)
                .map(category -> productRepository.findByCategoryId(category.getId())
                        .stream()
                        .map(this::entityToDTO)
                        .collect(Collectors.toList()))
                .orElse(List.of());
    }

    /**
     * Get all products by category ID
     */
    public List<ProductDTO> getByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get all products by supplier ID
     */
    public List<ProductDTO> getBySupplierId(Long supplierId) {
        return productRepository.findBySupplierId(supplierId)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get all products by gender
     */
    public List<ProductDTO> getByGender(String gender) {
        return productRepository.findByGender(gender)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get products by price range
     */
    public List<ProductDTO> getByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findByCenaBetween(minPrice, maxPrice)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Search products by name (nazev)
     */
    public List<ProductDTO> searchByNazev(String searchTerm) {
        return productRepository.searchByNazev(searchTerm)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Search and sort products
     */
    public List<ProductDTO> searchAndSort(String searchTerm, String sortBy, String sortDirection) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("DESC") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortBy);
        
        List<Product> products;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            products = productRepository.searchByNazev(searchTerm);
        } else {
            products = productRepository.findAll(sort);
        }
        
        return products.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get products with pagination and gender filter
     */
    public Page<ProductDTO> getByGenderPaginated(String gender, Pageable pageable) {
        return productRepository.findByGender(gender, pageable)
                .map(this::entityToDTO);
    }

    /**
     * Get products with pagination and category filter
     */
    public Page<ProductDTO> getByCategoryIdPaginated(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryId(categoryId, pageable)
                .map(this::entityToDTO);
    }

    /**
     * Search products by name with pagination
     */
    public Page<ProductDTO> searchByNazevPaginated(String searchTerm, Pageable pageable) {
        return productRepository.searchByNazevPaginated(searchTerm, pageable)
                .map(this::entityToDTO);
    }

    /**
     * Create a new product
     */
    public Optional<ProductDTO> create(ProductDTO productDTO) {
        Optional<Category> category = categoryRepository.findById(productDTO.getCategoryId());
        Optional<Supplier> supplier = supplierRepository.findById(productDTO.getSupplierId());

        if (category.isEmpty() || supplier.isEmpty()) {
            return Optional.empty();
        }

        Product product = dtoToEntity(productDTO, category.get(), supplier.get());
        Product saved = productRepository.save(product);
        return Optional.of(entityToDTO(saved));
    }

    /**
     * Update an existing product
     */
    public Optional<ProductDTO> update(Long id, ProductDTO productDTO) {
        return productRepository.findById(id)
                .flatMap(product -> {
                    Optional<Category> category = categoryRepository.findById(productDTO.getCategoryId());
                    Optional<Supplier> supplier = supplierRepository.findById(productDTO.getSupplierId());

                    if (category.isEmpty() || supplier.isEmpty()) {
                        return Optional.empty();
                    }

                    product.setNazev(productDTO.getNazev());
                    product.setSlug(productDTO.getSlug());
                    product.setCena(productDTO.getCena());
                    product.setPopis(productDTO.getPopis());
                    product.setTag(productDTO.getTag());
                    product.setGender(productDTO.getGender());
                    product.setImageUrl(productDTO.getImageUrl());
                    product.setCategory(category.get());
                    product.setSupplier(supplier.get());

                    Product updated = productRepository.save(product);
                    return Optional.of(entityToDTO(updated));
                });
    }

    /**
     * Delete a product by ID
     */
    public boolean delete(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Convert Entity to DTO
     */
    private ProductDTO entityToDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getNazev(),
                product.getSlug(),
                product.getCena(),
                product.getPopis(),
                product.getTag(),
                product.getGender(),
                product.getImageUrl(),
                product.getCategory() != null ? product.getCategory().getId() : null,
                product.getCategory() != null ? product.getCategory().getNazev() : null,
                product.getSupplier() != null ? product.getSupplier().getId() : null,
                product.getSupplier() != null ? product.getSupplier().getName() : null,
                product.getAttributes() != null
                        ? product.getAttributes().stream()
                        .map(attr -> attr.getId())
                        .collect(Collectors.toSet())
                        : null
        );
    }

    /**
     * Convert DTO to Entity
     */
    private Product dtoToEntity(ProductDTO productDTO, Category category, Supplier supplier) {
        return new Product(
                productDTO.getId(),
                productDTO.getNazev(),
                productDTO.getSlug(),
                productDTO.getCena(),
                productDTO.getPopis(),
                productDTO.getTag(),
                productDTO.getGender(),
                productDTO.getImageUrl(),
                category,
                supplier,
                null, // Attributes will be managed separately
                null  // OrderItems will be managed separately
        );
    }

}