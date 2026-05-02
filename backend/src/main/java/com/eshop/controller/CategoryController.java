package com.eshop.controller;

import com.eshop.dto.CategoryDTO;
import com.eshop.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * GET /api/categories - Get all categories
     */
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = categoryService.getAll();
        return ResponseEntity.ok(categories);
    }

    /**
     * GET /api/categories/{id} - Get category by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
        return categoryService.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * GET /api/categories/slug/{slug} - Get category by slug
     */
    @GetMapping("/slug/{slug}")
    public ResponseEntity<CategoryDTO> getCategoryBySlug(@PathVariable String slug) {
        return categoryService.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * GET /api/categories/gender/{gender} - Get categories by gender
     */
    @GetMapping("/gender/{gender}")
    public ResponseEntity<List<CategoryDTO>> getCategoriesByGender(@PathVariable String gender) {
        List<CategoryDTO> categories = categoryService.getByGender(gender);
        if (categories.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(categories);
    }

    /**
     * POST /api/categories - Create a new category
     */
    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO created = categoryService.create(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * PUT /api/categories/{id} - Update a category
     */
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        return categoryService.update(id, categoryDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * DELETE /api/categories/{id} - Delete a category
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        if (categoryService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}