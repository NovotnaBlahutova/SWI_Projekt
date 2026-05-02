package com.eshop.config;

import com.eshop.entity.Category;
import com.eshop.entity.Product;
import com.eshop.entity.Supplier;
import com.eshop.repository.CategoryRepository;
import com.eshop.repository.ProductRepository;
import com.eshop.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;

    @Override
    public void run(String... args) {
        // Kontrola, jestli už data v DB náhodou nejsou
        if (categoryRepository.count() == 0 && productRepository.count() == 0) {
            
            // 1. VYTVOŘENÍ KATEGORIE (všechna pole nullable = false)
            Category bags = new Category();
            bags.setNazev("Luxusní kabelky");
            bags.setSlug("luxusni-kabelky");
            bags.setGender("women");
            bags.setImageUrl("https://placehold.co/600x400?text=Kabelky"); 
            categoryRepository.save(bags);

            // 2. VYTVOŘENÍ DODAVATELE (všechna pole nullable = false)
            Supplier supplier = new Supplier();
            supplier.setName("Versace Official");
            supplier.setAddress("Via Gesù 12, 20121 Milano, Italy"); // povinné
            supplier.setIco("IT0123456789"); // povinné a unikátní
            supplier.setEmail("wholesale@versace.it"); // povinné a unikátní
            supplierRepository.save(supplier);

            // 3. VYTVOŘENÍ PRODUKTU (všechna pole nullable = false)
            Product bag = new Product();
            bag.setNazev("Versace Leather Bag");
            bag.setSlug("versace-leather-bag");
            bag.setCena(45000.0);
            bag.setPopis("Limitovaná edice kožené kabelky z italské dílny Versace.");
            bag.setTag("Luxury");
            bag.setGender("women");
            bag.setImageUrl("https://placehold.co/600x400?text=Versace+Bag");
            
            // Propojení vazeb (Many-to-One)
            bag.setCategory(bags);
            bag.setSupplier(supplier);
            
            productRepository.save(bag);
            
            System.out.println("--------------------------------------------------");
            System.out.println(">> ÚSPĚCH: Databáze byla kompletně naplněna!");
            System.out.println("--------------------------------------------------");
        }
    }
}
