import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

    // bezpečné načtení z localStorage
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // ukládání do localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // přidání do košíku
    const addToCart = (product, selectedSize, selectedVolume) => {
        setCart(prev => {
            const existingIndex = prev.findIndex(item =>
                item.product_id === product.id &&
                item.selectedSize === selectedSize &&
                item.selectedVolume === selectedVolume
            );

            // pokud existuje → zvýšit množství
            if (existingIndex !== -1) {
                return prev.map((item, i) =>
                    i === existingIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // jinak přidat nový
            return [
                ...prev,
                {
                    product_id: product.id,
                    nazev: product.nazev,
                    cena: product.cena,
                    image: product.obrazek,
                    selectedSize,
                    selectedVolume,
                    quantity: 1,
                }
            ];
        });
    };

    // zvýšení množství
    const increaseQty = (index) => {
        setCart(prev =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // snížení množství
    const decreaseQty = (index) => {
        setCart(prev =>
            prev
                .map((item, i) =>
                    i === index
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            addToCart,
            increaseQty,
            decreaseQty
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;