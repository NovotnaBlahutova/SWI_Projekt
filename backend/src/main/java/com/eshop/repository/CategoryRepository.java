package com.eshop.repository;

import com.eshop.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    // Pro vyhledávání podle slugu (např. v URL)
    Optional<Category> findBySlug(String slug);
    
    // Tady byla ta chyba - tohle Service vyžaduje pro filtrování
    List<Category> findByGender(String gender);
    
    // Kontrola existence (aby v DB nebyly duplikáty)
    boolean existsByNazev(String nazev);
}
