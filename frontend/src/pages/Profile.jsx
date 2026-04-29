import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("profile");

    if (!user) {
        return <h2 className="not-found">Nejste přihlášen</h2>;
    }

    return (
        <div className="profile-page">

            <div className="profile-container">

                {/* HEADER */}
                <h1 className="profile-title">Můj účet</h1>

                {/* MENU */}
                <div className="profile-menu">

                    <span
                        className={activeTab === "profile" ? "active" : ""}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profil
                    </span>

                    <span
                        className={activeTab === "orders" ? "active" : ""}
                        onClick={() => setActiveTab("orders")}
                    >
                        Moje objednávky
                    </span>

                    <span onClick={logout} className="logout">
                        Odhlásit
                    </span>

                </div>

                {/* CONTENT */}
                <div className="profile-content">

                    {/* ===== PROFIL ===== */}
                    {activeTab === "profile" && (
                        <div className="profile-card">

                            <div className="profile-avatar">
                                {user.jmeno?.charAt(0)}
                                {user.prijmeni?.charAt(0)}
                            </div>

                            <div className="profile-details">
                                <p><span>Jméno</span>{user.jmeno}</p>
                                <p><span>Příjmení</span>{user.prijmeni}</p>
                                <p><span>Email</span>{user.email}</p>
                                {user.telefon && (
                                    <p><span>Telefon</span>{user.telefon}</p>
                                )}
                            </div>

                        </div>
                    )}

                    {/* ===== OBJEDNÁVKY (fake) ===== */}
                    {activeTab === "orders" && (
                        <div className="orders-list">

                            <div className="order-card">
                                <div>
                                    <p className="order-id">#12345</p>
                                    <p className="order-date">12. 5. 2026</p>
                                </div>

                                <div className="order-right">
                                    <p className="order-price">3290 Kč</p>
                                    <span className="order-status">Doručeno</span>
                                </div>
                            </div>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Profile;