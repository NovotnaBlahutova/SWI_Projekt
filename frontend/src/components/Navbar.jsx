import { useState } from "react";
import {
    FaBars,
    FaSearch,
    FaHeart,
    FaUser,
    FaShoppingBag,
    FaPhone,
} from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
    const [showSearch, setShowSearch] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenu = () => {
        console.log("Klik na hamburger");
        setMenuOpen((prev) => !prev);
        setShowSearch(false);
    };

    const handleSearch = () => {
        console.log("Klik na search");
        setShowSearch((prev) => !prev);
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

            {/* DROPDOWN MENU */}
            <div className={`dropdown-menu ${menuOpen ? "open" : ""}`}>
                <div className="dropdown-inner">
                    <div className="menu-column">
                        <h4>for HER</h4>
                        <p>Kabelky</p>
                        <p>Boty</p>
                        <p>Šperky</p>
                        <p>Parfémy</p>
                        <p>Oblečení</p>
                        <p>Šály</p>
                        <p>Peněženky</p>
                        <p>Hodinky</p>
                    </div>

                    <div className="menu-column">
                        <h4>for HIM</h4>
                        <p>Hodinky</p>
                        <p>Oblečení</p>
                        <p>Boty</p>
                        <p>Peněženky</p>
                        <p>Šály</p>
                        <p>Šperky</p>
                        <p>Tašky</p>
                        <p>Doplňky</p>
                    </div>
                </div>
            </div>

            {/* SEARCH PANEL */}
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
