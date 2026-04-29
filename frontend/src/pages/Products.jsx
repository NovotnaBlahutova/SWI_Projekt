import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../apiConfig';
// Pokud máš CSS soubor, odkomentuj:
// import './Products.css'; 

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Zavoláme tvůj backend
        fetch(`${API_BASE_URL}/products`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Chyba při načítání produktů:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Načítám luxusní kousky...</div>;

    return (
        <div className="products-container">
            <h1>Naše nabídka</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.nazev} />
                        <div className="product-info">
                            <h3>{product.nazev}</h3>
                            <p className="category">{product.categoryNazev}</p>
                            <p className="description">{product.popis}</p>
                            <p className="price">{product.cena.toLocaleString()} Kč</p>
                            <button className="add-to-cart">Do košíku</button>
                        </div>
                    </div>
                ))}
            </div>
            {products.length === 0 && <p>Momentálně nemáme žádné produkty skladem.</p>}
        </div>
    );
}

export default Products;
