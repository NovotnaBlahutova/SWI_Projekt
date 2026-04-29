import { useParams, useNavigate } from "react-router-dom";
import "./CategoryPage.css";

import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function CategoryPage() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const { user } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // fetch categories
    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    // fetch products
    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    // najdi kategorii podle slug
    const category = categories.find(c => c.slug === slug);

    // filtr produktů
    const filteredProducts = products.filter(
        p => p.kategorie_id === category?.id
    );

    return (
        <div className="container mt-5 category-page">

            <h1 className="mb-4 text-center category-title">
                {category?.nazev || "Kategorie"}
            </h1>

            <div className="d-flex justify-content-end mb-3">
                <select className="form-select w-auto">
                    <option>Nejnovější</option>
                    <option>Nejlevnější</option>
                    <option>Nejdražší</option>
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
                                src={product.obrazek}
                                alt={product.nazev}
                                className="product-img"
                            />

                            {/* wishlist */}
                            <div
                                className="wishlist-icon"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    if (!user) {
                                        navigate("/login");
                                        return;
                                    }

                                    toggleWishlist(product);
                                }}
                            >
                                {wishlist.some(p => p.id === product.id)
                                    ? <FaHeart />
                                    : <FaRegHeart />}
                            </div>

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