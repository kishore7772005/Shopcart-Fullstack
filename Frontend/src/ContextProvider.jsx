import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import axios from "axios";

export const CartContext = createContext();

const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/shop`;

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const alertTimeoutRef = useRef(null);
  const token = localStorage.getItem("token");

  /* -----------------------------------
     FETCH CART (ON LOGIN / LOGOUT)
  ----------------------------------- */
  useEffect(() => {
    if (!token) {
      setCart([]);
      return;
    }

    axios
      .get(`${API_BASE}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCart(res.data.items || []);
      })
      .catch((err) => {
        console.error("Fetch cart failed:", err);
        setCart([]);
      });
  }, [token]);

  /* -----------------------------------
     SYNC CART TO BACKEND
  ----------------------------------- */
  const syncCartToBackend = useCallback(
    (items) => {
      if (!token) return;

      axios.post(
        `${API_BASE}/cart`,
        { items },
        { headers: { Authorization: `Bearer ${token}` } }
      ).catch((err) => console.error("Sync cart failed:", err));
    },
    [token]
  );

  /* -----------------------------------
     ADD TO CART
  ----------------------------------- */
  const addToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const existing = prev.find(
          (i) => String(i.productId) === String(product.productId)
        );

        let updated;

        if (existing) {
          updated = prev.map((i) =>
            String(i.productId) === String(product.productId)
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        } else {
          updated = [
            ...prev,
            {
              productId: product.productId,
              title: product.title,
              price: Number(product.price),
              quantity: 1,
              img: product.img,
              desc: product.desc,
            },
          ];
        }

        syncCartToBackend(updated);
        return updated;
      });

      // Alert handling
      setAlertMessage(`${product.title} added to cart`);
      setShowAlert(true);

      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }

      alertTimeoutRef.current = setTimeout(() => {
        setShowAlert(false);
      }, 2500);
    },
    [syncCartToBackend]
  );

  /* -----------------------------------
     UPDATE QUANTITY
  ----------------------------------- */
  const updateQuantity = useCallback(
    (productId, qty) => {
      if (qty <= 0) {
        return removeFromCart(productId);
      }

      setCart((prev) => {
        const updated = prev.map((i) =>
          String(i.productId) === String(productId)
            ? { ...i, quantity: qty }
            : i
        );
        syncCartToBackend(updated);
        return updated;
      });
    },
    [syncCartToBackend]
  );

  /* -----------------------------------
     REMOVE FROM CART
  ----------------------------------- */
  const removeFromCart = useCallback(
    (productId) => {
      setCart((prev) => {
        const updated = prev.filter(
          (i) => String(i.productId) !== String(productId)
        );
        syncCartToBackend(updated);
        return updated;
      });
    },
    [syncCartToBackend]
  );

  /* -----------------------------------
     CLEAR CART
  ----------------------------------- */
  const clearCart = useCallback(() => {
    setCart([]);
    if (!token) return;

    axios.delete(`${API_BASE}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }, [token]);

  /* -----------------------------------
     TOTALS
  ----------------------------------- */
  const getTotalPrice = useCallback(
    () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart]
  );

  const getTotalItems = useCallback(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );

  /* -----------------------------------
     CLEANUP ALERT TIMER
  ----------------------------------- */
  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
        showAlert,
        alertMessage,
        setShowAlert,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
