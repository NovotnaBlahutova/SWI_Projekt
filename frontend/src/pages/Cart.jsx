import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {
    const { cart, setCart, increaseQty, decreaseQty } = useContext(CartContext);

    const removeItem = (index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.cena * item.quantity,
        0
    );

    if (cart.length === 0) {
        return <h2 className="empty-cart">Váš košík je prázdný</h2>;
    }

    return (
        <div className="cart-page">

            <h1 className="cart-title">Košík</h1>

            <div className="cart-layout">

                {/* LEFT - ITEMS */}
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div className="cart-item" key={index}>

                            <img src={item.imageUrl} alt={item.nazev} />

                            <div className="cart-info">
                                <h3>{item.nazev}</h3>

                                {item.selectedSize && (
                                    <p>Velikost: {item.selectedSize}</p>
                                )}

                                {item.selectedVolume && (
                                    <p>Objem: {item.selectedVolume} ml</p>
                                )}

                                <div className="cart-bottom">

                                    <div className="left-side">
                                        <div className="quantity">
                                            <button onClick={() => decreaseQty(index)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => increaseQty(index)}>+</button>
                                        </div>
                                    </div>

                                    <div className="right-side">
                                        {item.cena * item.quantity} Kč
                                    </div>

                                </div>

                                <button onClick={() => removeItem(index)}>
                                    Odebrat
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                {/* RIGHT - SUMMARY */}
                <div className="cart-summary">
                    <h2>Souhrn</h2>

                    <div className="summary-row">
                        <span>Produkty</span>
                        <span>{cart.length}</span>
                    </div>

                    <div className="summary-row total">
                        <span>Celkem</span>
                        <span>{totalPrice} Kč</span>
                    </div>

                    <Link to="/checkout">
                        <button className="checkout-btn">
                            Pokračovat k platbě
                        </button>
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Cart;