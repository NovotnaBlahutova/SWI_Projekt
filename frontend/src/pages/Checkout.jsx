import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
    const { cart, setCart } = useContext(CartContext);

    const [orderData, setOrderData] = useState(null);
    const [orderDone, setOrderDone] = useState(false);

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        country: "",
        delivery: "zasilkovna",
        payment: "card",
    });

    const totalProducts = cart.reduce(
        (sum, item) => sum + item.cena * item.quantity,
        0
    );

    const deliveryPrice = form.delivery === "kuryr" ? 120 : 70;
    const totalPrice = totalProducts + deliveryPrice;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.name ||
            !form.surname ||
            !form.email ||
            !form.phone ||
            !form.address ||
            !form.city ||
            !form.zip ||
            !form.country
        ) {
            alert("Vyplň všechna pole");
            return;
        }

        const order = {
            items: cart,
            customer: form,
            total: totalPrice,
        };

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(order),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Chyba objednávky");
                return;
            }

            // úspěch
            setOrderData(order);
            setOrderDone(true);
            setCart([]);
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    if (orderDone && orderData) {
        return (
            <div className="order-page">

                <h1 className="order-title">
                    Děkujeme za objednávku!
                </h1>

                <p className="order-sub">
                    Vaše objednávka byla úspěšně vytvořena.
                </p>

                <div className="order-box">

                    <h2>Rekapitulace objednávky</h2>

                    <div className="order-items">
                        {orderData.items.map((item, i) => (
                            <div key={i} className="order-item">
                                <div className="order-left">
                                    <span>{item.nazev}</span>
                                    <span>{item.quantity}×</span>
                                </div>

                                <div>
                                    {item.cena * item.quantity} Kč
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order-total-row">
                        <span>Celkem</span>
                        <span>{orderData.total} Kč</span>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">

            <h1 className="checkout-title">Pokladna</h1>

            <div className="checkout-layout">

                {/* FORM */}
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h2>Kontaktní údaje</h2>

                    <input name="name" placeholder="Jméno" onChange={handleChange} />
                    <input name="surname" placeholder="Příjmení" onChange={handleChange} />
                    <input name="email" placeholder="Email" onChange={handleChange} />
                    <input name="phone" placeholder="Telefon" onChange={handleChange} />

                    <h2>Adresa</h2>

                    <input name="address" placeholder="Ulice" onChange={handleChange} />
                    <input name="city" placeholder="Město" onChange={handleChange} />
                    <input name="zip" placeholder="PSČ" onChange={handleChange} />
                    <input name="country" placeholder="Stát" onChange={handleChange} />

                    <button type="submit" className="checkout-submit">
                        Dokončit objednávku
                    </button>
                </form>

                {/* SUMMARY */}
                <div className="checkout-summary">

                    <h2>Souhrn</h2>

                    {cart.map((item, i) => (
                        <div key={i}>
                            {item.nazev} ({item.quantity}×)
                        </div>
                    ))}

                    <div>Doprava: {deliveryPrice} Kč</div>

                    <div className="total">
                        Celkem: {totalPrice} Kč
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;