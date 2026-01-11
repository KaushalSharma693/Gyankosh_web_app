import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ScrollNavbar.css";

export default function ScrollNavbar() {
  const navRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={navRef} className="scroll-navbar">
      <div className="scroll-left">
        <div className="scroll-image-wrapper">
          <span className="scroll-title">GYANKOSH</span>
          <img src="book.avif" alt="Book" />
        </div>
      </div>

      <div className="scroll-links">
        {["Home", "Shop", "Page", "Blog", "Contact"].map((text, i) => (
          <div key={i} className="nav-item">
            <a href="#">{text}<i className="fa-solid fa-ghost"></i></a>
            {text !== "Contact" && (
              <div className="dropdown">
                {text === "Home" && <>
                  <a href="#">Home Default</a>
                  <a href="#">Home Variation</a>
                </>}
                {text === "Shop" && <>
                  <a href="#">Shop Default</a>
                  <a href="#">Shop List</a>
                  <a href="#">Shop Grid</a>
                </>}
                {text === "Page" && <>
                  <a href="#">About Us</a>
                  <a href="#">FAQ</a>
                </>}
                {text === "Blog" && <>
                  <a href="#">Blog Default</a>
                  <a href="#">Blog List</a>
                </>}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="scroll-actions">
        <a href="#"><i className="fa-regular fa-heart"></i></a>
        <a href="#"><i className="fa-solid fa-cart-shopping"></i></a>
        <a href="#"><i className="fa-solid fa-lines-leaning"></i></a>
      </div>
    </div>
  );
}
