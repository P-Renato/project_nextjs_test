import { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext(null);

export default function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productLikes, setProductLikes] = useState({});

  // Load cart from localStorage
  const [cartQuantity, setCartQuantity] = useState(() => {
    try {
      const storedCartQuantity = localStorage.getItem("cartQuantity");
      return storedCartQuantity ? JSON.parse(storedCartQuantity) : [];
    } catch (error) {
      console.error("Error loading cart quantity:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
  }, [cartQuantity]);

  // Add product to cart if it's not already there
  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartQuantity((prevCart) => {
      const exists = prevCart.some((item) => item.id === productId);
      return exists ? prevCart : [...prevCart, product];
    });
  };

  // ✅ This is the ONLY fetch now – from your backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);

        // Initialize productLikes state
        const initialLikes = data.reduce((acc, prod) => {
          acc[prod.id] = prod.likes || 0;
          return acc;
        }, {});
        setProductLikes(initialLikes);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handles like click
  const handleLike = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/category/${productId}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setProductLikes((prev) => ({
        ...prev,
        [productId]: data.likes,
      }));
    } catch (error) {
      console.error("Error liking product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cartQuantity,
        setCartQuantity,
        addToCart,
        productLikes,
        cartQuantityCount: cartQuantity.length,
        handleLike,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
