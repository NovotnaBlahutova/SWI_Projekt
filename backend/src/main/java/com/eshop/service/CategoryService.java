package com.eshop.service;

import com.eshop.dto.CategoryDTO;
import com.eshop.entity.Category;
import com.eshop.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    /**
     * Get all categories
     */
    public List<CategoryDTO> getAll() {
        return categoryRepository.findAll()
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get category by ID
     */
    public Optional<CategoryDTO> getById(Long id) {
        return categoryRepository.findById(id)
                .map(this::entityToDTO);
    }

    /**
     * Get category by slug
     */
    public Optional<CategoryDTO> getBySlug(String slug) {
        return categoryRepository.findBySlug(slug)
                .map(this::entityToDTO);
    }

    /**
     * Get all categories by gender
     */
    public List<CategoryDTO> getByGender(String gender) {
        return categoryRepository.findByGender(gender)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Create a new category
     */
    public CategoryDTO create(CategoryDTO categoryDTO) {
        Category category = dtoToEntity(categoryDTO);
        Category saved = categoryRepository.save(category);
        return entityToDTO(saved);
    }

    /**
     * Update an existing category
     */
    public Optional<CategoryDTO> update(Long id, CategoryDTO categoryDTO) {
        return categoryRepository.findById(id)
                .map(category -> {
                    category.setNazev(categoryDTO.getNazev());
                    category.setSlug(categoryDTO.getSlug());
                    category.setGender(categoryDTO.getGender());
                    category.setImageUrl(categoryDTO.getImageUrl());
                    Category updated = categoryRepository.save(category);
                    return entityToDTO(updated);
                });
    }

    /**
     * Delete a category by ID
     */
    public boolean delete(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Convert Entity to DTO
     */
    private CategoryDTO entityToDTO(Category category) {
        return new CategoryDTO(
                category.getId(),
                category.getNazev(),
                category.getSlug(),
                category.getGender(),
                category.getImageUrl()
        );
    }

    /**
     * Convert DTO to Entity
     */
    private Category dtoToEntity(CategoryDTO categoryDTO) {
        return new Category(
                categoryDTO.getId(),
                categoryDTO.getNazev(),
                categoryDTO.getSlug(),
                categoryDTO.getGender(),
                categoryDTO.getImageUrl(),
                null // Products will be managed separately
        );
    }

}