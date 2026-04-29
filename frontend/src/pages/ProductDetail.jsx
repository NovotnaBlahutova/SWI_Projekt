import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
    const { slug } = useParams();

    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedVolume, setSelectedVolume] = useState(null);
    const [error, setError] = useState("");

    const { addToCart } = useContext(CartContext);

    // FETCH JEDNOHO PRODUKTU
    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p.slug === slug);
                setProduct(found);
            })
            .catch(err => console.error(err));
    }, [slug]);

    if (!product) {
        return <h2 className="not-found">Načítání...</h2>;
    }

    const handleAddToCart = () => {
        if (product.sizes && !selectedSize) {
            setError("Vyberte velikost");
            return;
        }

        if (product.volume && !selectedVolume) {
            setError("Vyberte objem");
            return;
        }

        setError("");
        addToCart(product, selectedSize, selectedVolume);
    };

    return (
        <div className="product-page">
            <div className="product-container">

                {/* IMAGE */}
                <div className="product-image">
                    <img src={product.obrazek} alt={product.nazev} />
                </div>

                {/* INFO */}
                <div className="product-info">

                    <h1 className="product-title">{product.nazev}</h1>

                    <p className="product-price">{product.cena} Kč</p>

                    <p className="product-desc">
                        {product.popis || "Popis produktu zatím není k dispozici."}
                    </p>

                    {/* SIZES */}
                    {product.sizes?.length > 0 && (
                        <div className="sizes">
                            <p className="sizes-label">Velikost:</p>

                            <div className="sizes-list">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? "active" : ""}`}
                                        onClick={() => {
                                            setSelectedSize(size);
                                            setError("");
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* VOLUME */}
                    {product.volume?.length > 0 && (
                        <div className="sizes">
                            <p className="sizes-label">Objem (ml):</p>

                            <div className="sizes-list">
                                {product.volume.map(v => (
                                    <button
                                        key={v}
                                        className={`size-btn ${selectedVolume === v ? "active" : ""}`}
                                        onClick={() => {
                                            setSelectedVolume(v);
                                            setError("");
                                        }}
                                    >
                                        {v} ml
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {error && <p className="error">{error}</p>}

                    <button className="btn-add" onClick={handleAddToCart}>
                        Přidat do košíku
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ProductDetail;