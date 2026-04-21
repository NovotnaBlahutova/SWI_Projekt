import { useState } from "react";
import { FaBars, FaSearch, FaHeart, FaUser, FaShoppingBag, FaPhone } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">

                    <div className="nav-left">
                        <FaBars className="icon" />

                        <FaSearch
                            className="icon"
                            onClick={() => setShowSearch(!showSearch)}
                        />
                    </div>

                    <div className="nav-center">
                        <h2 className="logo">Boujee</h2>
                    </div>

                    <div className="nav-right">
                        <FaPhone className="icon" />
                        <FaHeart className="icon" />
                        <FaUser className="icon" />
                        <FaShoppingBag className="icon" />
                    </div>

                </div>
            </nav>

            <div className={`search-panel ${showSearch ? "active" : ""}`}>
                <input
                    type="text"
                    placeholder="Hledat produkty..."
                    className="search-big"
                />

                <div className="search-results">
                    <div className="product">Produkt 1</div>
                    <div className="product">Produkt 2</div>
                    <div className="product">Produkt 3</div>
                </div>
            </div>
        </>
    );
}

export default Navbar;