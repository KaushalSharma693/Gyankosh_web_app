import React, { useState, useEffect } from "react";
import "./MainSection.css";
import { toast } from "react-toastify";
import { motion } from "framer-motion";



const quickMessages = [
  "5000+ Happy Readers 📚",
  "Free Delivery on All Orders 🚚",
  "24x7 Customer Support 💬",
  "New Arrivals Every Week ✨",
  "Secure Payments 🔒",
  "Best Prices Guaranteed 💸",
  "Easy Returns 🔁"
];

export default function MainSection() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (resetting) return;

    if (visibleCount < quickMessages.length) {
      const timer = setTimeout(() => {
        setVisibleCount(visibleCount + 1);
      }, 800);  // Slightly slower for smoother entry
      return () => clearTimeout(timer);
    } else {
      const pauseTimer = setTimeout(() => {
        setResetting(true);
      }, 3000);  
      return () => clearTimeout(pauseTimer);
    }
  }, [visibleCount, resetting]);

  useEffect(() => {
    if (resetting) {
      const resetTimer = setTimeout(() => {
        setVisibleCount(0);
        setResetting(false);
      }, 1200); // smoother fade out
      return () => clearTimeout(resetTimer);
    }
  }, [resetting]);

  return (
    <div className="main-section">
      <img src="book.avif" alt="Background" className="main-image" />
      <img src="book.avif" alt="Blurred Background" className="blurred-image" />

      <div className="overlay-content glassmorphic-card">
       <motion.h1
  initial={{ y: -300, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  Welcome to <span>GYANKOSH</span>
</motion.h1>
        <p>Your one-stop shop for amazing books</p>
        <div className="main-buttons">
          <button
    className="shop-btn"
    onClick={() => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to continue shopping");
      } else {
        window.location.href = "/library"; // or navigate using useNavigate
      }
    }}
  >
    Shop Now
  </button>
         
  <button
    className="sell-btn"
    onClick={() => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to upload or sell books");
      } else {
        window.location.href = "/upload";
      }
    }}
  >
    Sell Now
  </button>

        </div>
      </div>

      <div className={`quick-messages-list ${resetting ? "fade-out" : ""}`}>
        {quickMessages.slice(0, visibleCount).map((msg, index) => (
          <div key={index} className="quick-message-item">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
