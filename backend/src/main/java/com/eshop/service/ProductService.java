/**
     * Vyhledávání a řazení (pro ProductController)
     */
    public List<ProductDTO> searchAndSort(String searchTerm, String sortBy, String sortDirection) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("DESC") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortBy);
        
        List<Product> products;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            // Pokud vyhledáváme, použijeme naši vyhledávací metodu
            products = productRepository.searchByNazev(searchTerm);
        } else {
            // Jinak vrátíme vše seřazené
            products = productRepository.findAll(sort);
        }
        
        return products.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }
