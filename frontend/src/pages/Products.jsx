function Products() {
    const products = [
        { id: 1, name: "Produkt 1", price: "499 Kč" },
        { id: 2, name: "Produkt 2", price: "799 Kč" },
        { id: 3, name: "Produkt 3", price: "299 Kč" },
        { id: 4, name: "Produkt 4", price: "999 Kč" },
    ];

    return (
        <div className="products-container">
            <h1>Produkty</h1>

            <div className="products-grid">
                {products.map((p) => (
                    <div key={p.id} className="product-card">
                        <div className="image-placeholder"></div>
                        <h3>{p.name}</h3>
                        <p>{p.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;