package com.eshop.config;

import com.eshop.entity.Category;
import com.eshop.entity.Product;
import com.eshop.repository.CategoryRepository;
import com.eshop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            Category bags = new Category();
            bags.setNazev("Luxusní kabelky");
            bags.setSlug("luxusni-kabelky");
            bags.setGender("women");
            categoryRepository.save(bags);

            Product bag = new Product();
            bag.setNazev("Versace Leather Bag");
            bag.setSlug("versace-leather-bag");
            bag.setCena(BigDecimal.valueOf(45000));
            bag.setPopis("Limitovaná edice kožené kabelky z italské dílny.");
            bag.setCategory(bags);
            productRepository.save(bag);
            
            System.out.println(">> Testovací data nahrána!");
        }
    }
}
