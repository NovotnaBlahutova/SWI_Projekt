import { useState, useContext, useEffect } from "react";
import {
    FaBars,
    FaSearch,
    FaHeart,
    FaUser,
    FaShoppingBag,
    FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const [showSearch, setShowSearch] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    // FETCH categories
    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    const handleMenu = () => {
        setMenuOpen(prev => !prev);
        setShowSearch(false);
    };

    const handleSearch = () => {
        setShowSearch(prev => !prev);
        setMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">

                    <div className="nav-left">
                        <FaBars className="icon" onClick={handleMenu} />
                        <FaSearch className="icon" onClick={handleSearch} />
                    </div>

                    <div className="nav-center">
                        <Link to="/" className="logo-link">
                            <h2 className="logo">Boujee</h2>
                        </Link>
                    </div>

                    <div className="nav-right">
                        <Link to="/contact">
                            <FaPhone className="icon" />
                        </Link>

                        <Link to="/wishlist">
                            <FaHeart className="icon" />
                        </Link>

                        {user ? (
                            <div className="nav-user">
                                <Link to="/profile" className="user-name">
                                    {user.jmeno}
                                </Link>

                                <span onClick={logout} className="logout-text">
                                    Odhlásit
                                </span>
                            </div>
                        ) : (
                            <Link to="/login">
                                <FaUser className="icon" />
                            </Link>
                        )}

                        <Link to="/cart">
                            <div className="cart-icon">
                                <FaShoppingBag className="icon" />
                                {cart.length > 0 && (
                                    <span className="cart-count">
                                        {cart.length}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>

                </div>
            </nav>

            {menuOpen && (
                <div className="overlay" onClick={() => setMenuOpen(false)} />
            )}

            {/* DROPDOWN */}
            <div className={`dropdown-menu ${menuOpen ? "open" : ""}`}>
                <div className="dropdown-inner">

                    <div className="menu-column">
                        <h4>Kategorie</h4>
                        {categories.map(cat => (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.slug}`}
                                className="menu-link"
                                onClick={() => setMenuOpen(false)}
                            >
                                {cat.nazev}
                            </Link>
                        ))}
                    </div>

                </div>
            </div>

            {/* SEARCH */}
            <div className={`search-panel ${showSearch ? "active" : ""}`}>
                <input
                    type="text"
                    placeholder="Hledat produkty..."
                    className="search-big"
                />
            </div>
        </>
    );
}

export default Navbar;