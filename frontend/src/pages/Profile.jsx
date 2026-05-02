import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from '../apiConfig';
import "./Profile.css";

function Profile() {
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("profile");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (activeTab === "orders" && user) {
            fetch(`${API_BASE_URL}/orders/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(data => setOrders(data))
                .catch(err => console.error(err));
        }
    }, [activeTab, user]);

    if (!user) {
        return <h2 className="not-found">Nejste přihlášen</h2>;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">

                <h1 className="profile-title">Můj účet</h1>

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

                <div className="profile-content">

                    {activeTab === "profile" && (
                        <div className="profile-card">
                            <div className="profile-avatar">
                                {user.firstName?.charAt(0)}
                                {user.lastName?.charAt(0)}
                            </div>

                            <div className="profile-details">
                                <p><span>Jméno</span>{user.firstName}</p>
                                <p><span>Příjmení</span>{user.lastName}</p>
                                <p><span>Email</span>{user.email}</p>
                                {user.phoneNumber && (
                                    <p><span>Telefon</span>{user.phoneNumber}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div className="orders-list">
                            {orders.length === 0 && (
                                <p style={{ textAlign: "center", color: "#999" }}>
                                    Žádné objednávky
                                </p>
                            )}

                            {orders.map((order) => (
                                <div className="order-card" key={order.id}>
                                    <div>
                                        <p className="order-id">#{order.orderNumber}</p>
                                        <p className="order-date">
                                            {new Date(order.orderDate).toLocaleDateString("cs-CZ")}
                                        </p>
                                    </div>

                                    <div className="order-right">
                                        <p className="order-price">{order.totalPrice} Kč</p>
                                        <span className="order-status">{order.orderState}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Profile;