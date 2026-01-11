import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { toast } from "react-toastify";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [showScrollNavbar, setShowScrollNavbar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navItemsRef = useRef([]);
  const navigate = useNavigate();

  // ✅ Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Animate NavItems
  useEffect(() => {
    gsap.fromTo(
      navItemsRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2,
      }
    );
  }, []);

  // ✅ Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollNavbar(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
      toast.success("Logged out successfully");
  };

  return (
    <div className={`navbar-container ${showNavbar ? "visible" : "hidden"}`}>
      <div className="nav-image">
        <div className="image-wrapper">
          <div className="gyankosh-logo">GYANKOSH</div>
        </div>
      </div>

      <div className="nav-content">
        <div className="top-bar">
          <div className="top-left">
            <span>📞 +91 98765 43210</span>
            <span>|</span>
            <span>✉ support@gyankosh.com</span>
            <span>|</span>
            <span>
              <i className="fa-regular fa-clock"></i> Sunday-Fri: 9AM - 6PM
            </span>
          </div>
          <div className="top-right">
            <NavLink to="/Chatbot">
              <div className="offer">Live Chat</div>
            </NavLink>

            {isAuthenticated ? (
              <div className="offer" onClick={handleLogout}>
                Logout
              </div>
            ) : (
              <NavLink to="/auth">
                <div className="offer">Login</div>
              </NavLink>
            )}
          </div>
        </div>

        <div className="main-navbar">
          <div className="logo"></div>
          <div className="nav-links">
            <div
              className="nav-item"
              ref={(el) => (navItemsRef.current[0] = el)}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Home <i className="fa-solid fa-ghost"></i>
              </NavLink>
            </div>

            <div
              className="nav-item"
              ref={(el) => (navItemsRef.current[1] = el)}
            >
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Shop <i className="fa-solid fa-ghost"></i>
              </NavLink>
            </div>

            <div
              className="nav-item"
              ref={(el) => (navItemsRef.current[2] = el)}
            >
              <NavLink
                to="/saved-books"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Books <i className="fa-solid fa-ghost"></i>
              </NavLink>
              <div className="dropdown">
                <NavLink to="/saved-books">Engineering</NavLink>
                <NavLink to="/shop-list">Commerce</NavLink>
                <NavLink to="/shop-grid">Others</NavLink>
              </div>
            </div>

            <div
              className="nav-item"
              ref={(el) => (navItemsRef.current[3] = el)}
            >
              <NavLink
                to="/Upload"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Upload <i className="fa-solid fa-ghost"></i>
              </NavLink>
              <div className="dropdown">
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/faq">FAQ</NavLink>
              </div>
            </div>

            <div
              className="nav-item"
              ref={(el) => (navItemsRef.current[4] = el)}
            >
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Read & Learn <i className="fa-solid fa-ghost"></i>
              </NavLink>
              <div className="dropdown">
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    isActive ? "active-link" : " "
                  }
                >
                  Blogs
                </NavLink>
                <NavLink
                  to="/Dictionary"
                  className={({ isActive }) =>
                    isActive ? "active-link" : " "
                  }
                >
                  Dictionary
                </NavLink>
              </div>
            </div>

            <div
              className="nav-item"
              ref={(el) => (navItemsRef.current[5] = el)}
            >
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Contact <i className="fa-solid fa-ghost"></i>
              </NavLink>
            </div>
          </div>

          <div className="nav-actions">
            <NavLink to="/wishlist">
              <i className="fa-regular fa-heart"></i>
            </NavLink>
            <NavLink to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
            <NavLink to="/menu">
              <i className="fa-solid fa-lines-leaning"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
