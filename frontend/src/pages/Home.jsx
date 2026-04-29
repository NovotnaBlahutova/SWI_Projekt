import "./Home.css";
import video from "../assets/images/video.mp4";
import summer from "../assets/images/summer_collection.jpg";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Home() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const { user } = useContext(AuthContext);

    // FETCH PRODUCTS
    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    // FETCH CATEGORIES
    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    // 🎲 RANDOM PRODUKTY (bez duplicit)
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const presale = shuffled.slice(0, 3);
    const bestsellers = shuffled.slice(3, 6);

    return (
        <div className="home">

            {/* HERO */}
            <section className="hero">
                <div className="hero-overlay">
                    <h1>Den Matek</h1>
                    <p>Pro ženu, která si zaslouží to nejlepší</p>
                    <button>Nakupujte nyní</button>
                </div>
            </section>

            {/* KATEGORIE */}
            <section className="container mt-5">
                <h2 className="mb-4 text-center">Kategorie</h2>

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-5">
                    {categories.map((cat) => (
                        <div className="col" key={cat.id}>
                            <Link
                                to={`/category/${cat.slug}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <div className="card category-card-clean">
                                    <img src={cat.obrazek} alt={cat.nazev} />
                                    <div className="card-body text-center">
                                        <h5>{cat.nazev}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* VIDEO */}
            <section className="video-section">
                <video autoPlay muted loop className="video-bg">
                    <source src={video} type="video/mp4" />
                </video>

                <div className="video-overlay">
                    <h2>Styl, který mluví za vás</h2>
                    <p>Elegance v každém detailu</p>
                    <button>Prohlédnout</button>
                </div>
            </section>

            {/* PRE-SALE */}
            <section className="container mt-5">
                <h2 className="mb-4 text-center">Pre-sale produkty</h2>

                <div className="row row-cols-1 row-cols-md-3 g-5">
                    {presale.map((product) => {
                        const isInWishlist = wishlist.some(p => p.id === product.id);

                        return (
                            <div className="col" key={product.id}>
                                <Link
                                    to={`/product/${product.slug}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <div className="card product-card" style={{ position: "relative" }}>

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
                                            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                                        </div>

                                        <img src={product.obrazek} alt={product.nazev} />

                                        <div className="card-body text-center">
                                            <h5>{product.nazev}</h5>
                                            <p className="price">{product.cena} Kč</p>
                                        </div>

                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* BANNER */}
            <section className="quote-banner">
                <p>Elegance je jediná krása, která nikdy nevyjde z módy.</p>
            </section>

            {/* BESTSELLERS */}
            <section className="container mt-5">
                <h2 className="mb-4 text-center">Nejprodávanější</h2>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {bestsellers.map((product) => (
                        <div className="col" key={product.id}>
                            <Link
                                to={`/product/${product.slug}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <div className="card product-card">
                                    <div className="badge">Bestseller</div>
                                    <img src={product.obrazek} alt={product.nazev} />
                                    <div className="card-body text-center">
                                        <h5>{product.nazev}</h5>
                                        <p className="price">{product.cena} Kč</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* SUMMER HERO */}
            <section
                className="summer-hero"
                style={{ backgroundImage: `url(${summer})` }}
            >
                <div className="summer-overlay">
                    <h2>Objevte naši letní kolekci</h2>
                    <p>Lehkost, barvy a letní elegance</p>
                    <button>Prohlédnout kolekci</button>
                </div>
            </section>

        </div>
    );
}

export default Home;