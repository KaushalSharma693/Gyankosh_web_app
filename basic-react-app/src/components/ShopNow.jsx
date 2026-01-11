import React from "react";
import "./ShopNow.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ShopNow() {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("🔒 Please login to add books to cart!", {
        position: "top-right",
        autoClose: 2500,
        style: {
          background: "#fff3cd",
          color: "#856404",
          fontWeight: "bold",
        },
      });
      return;
    }

    // ✅ User is logged in — redirect to /library
    navigate("/library");
  };

  return (
    <div className="shop-now-section">
      <img src="new.avif" alt="Left Side" className="shop-image left" />

      <div className="shop-now-content">
        <h2>Get 25% Discount</h2>
        <p>Some exciting offers waiting for you</p>
        <button onClick={handleAddToCart}>Shop Now</button>
      </div>

      <img src="hero-girl.png" alt="Right Side" className="shop-image right flipped" />
    </div>
  );
}
