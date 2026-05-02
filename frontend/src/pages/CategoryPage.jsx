import { useParams, useNavigate } from "react-router-dom";
import "./CategoryPage.css";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../apiConfig';

function CategoryPage() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        fetch(`${API_BASE_URL}/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    const category = categories.find(c => c.slug === slug);

    const filteredProducts = products
        .filter(p => p.categoryId === category?.id)
        .sort((a, b) => {
            if (sortBy === "cheapest") return a.cena - b.cena;
            if (sortBy === "expensive") return b.cena - a.cena;
            return 0;
        });

    return (
        <div className="container mt-5 category-page">

            <h1 className="mb-4 text-center category-title">
                {category?.nazev || "Kategorie"}
            </h1>

            <div className="d-flex justify-content-end mb-3">
                <select
                    className="form-select w-auto"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="newest">Nejnovější</option>
                    <option value="cheapest">Nejlevnější</option>
                    <option value="expensive">Nejdražší</option>
                </select>
            </div>

            {filteredProducts.length === 0 && (
                <p className="text-center mt-5">
                    Žádné produkty v této kategorii
                </p>
            )}

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="col">
                        <div
                            className="card product-card"
                            onClick={() => navigate(`/product/${product.slug}`)}
                            style={{ cursor: "pointer", position: "relative" }}
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.nazev}
                                className="product-img"
                            />
                            <div className="card-body text-center">
                                <h5>{product.nazev}</h5>
                                <p className="price">{product.cena} Kč</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default CategoryPage;