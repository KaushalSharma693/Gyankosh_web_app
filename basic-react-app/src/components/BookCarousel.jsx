import React, { useEffect, useState, useRef } from "react";
import "./BookCarousel.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";



const booksData = [
  {
    id: 1,
    title: "The Art of Thinking Clearly",
    author: "Rolf Dobelli",
    price: "200",
    img: "bookie.png",
    desc: "A fascinating look into human biases and how to avoid them."
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: "120",
    img: "book2.avif",
    desc: "Small changes, remarkable results. Build better habits every day."
  },
  {
    id: 3,
    title: "Deep Work",
    author: "Cal Newport",
    price: "180000",
    img: "book3.avif",
    desc: "Learn the habits of highly focused and productive people."
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: "315",
    img: "book4.avif",
    desc: "A magical story about following your dreams and destiny."
  },
  {
    id: 5,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: "90",
    img: "book.avif",
    desc: "A powerful guide to financial freedom through smart investing."
  }
];

export default function BookCarousel() {
  const [books, setBooks] = useState(booksData);
  const [offset, setOffset] = useState(0);
  const cardWidth = 220; // width + margin (adjust as per your card)

  const trackRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  if (!trackRef.current) return;

  const moveBy = cardWidth + 80; // 20 = margin-right

trackRef.current.style.transition = "transform 0.6s ease-in-out";
  trackRef.current.style.transform = `translateX(-${moveBy}px)`;

  const timer = setTimeout(() => {
    // Remove transition temporarily
    trackRef.current.style.transition = "none";

    // Move first card to end
    setBooks((prev) => {
      const updated = [...prev];
      const first = updated.shift();
      updated.push(first);
      return updated;
    });

    trackRef.current.style.transform = `translateX(0px)`;
  }, 600); // match with CSS transition time

  return () => clearTimeout(timer);
}, [offset]);

const handleAddToCart = (book) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login to add books to cart!", {
      position: "top-right",
      autoClose: 2500,
      style: {
        background: "#f8f7f7ff",
        color: "#0b0a0aff",
        fontWeight: "bold",
      },
    });
    return;
  }
  toast.success(`📘 "${book.title}" added to cart!`, {
    position: "top-right",
    autoClose: 2500,
    style: {
      background: "#e0f7fa",
      color: "#00796b",
      fontWeight: "bold",
    },
  });
};


  return (
<div className="carousel-section">
  <div className="carousel-header">
    <h2 className="carousel-title">📚 Featured Books</h2>
   <NavLink to="/library" > <button className="explore-btn"><span>Explore Books More <i class="fa-solid fa-arrow-right"></i></span></button></NavLink>
  </div>


    <div className="carousel-container">
      <div className="carousel-window">
        <div className="carousel-track" ref={trackRef}>
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <img src={book.img} alt={book.title} />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author"><b><i>AUTHOR BY:-{book.author}</i></b></p>
              <p className="book-desc">{book.desc}</p>
              <span className="book-price">&#8377;{book.price.toLocaleString("en-IN")}</span>
              <button className="add-to-cart-btn"   onClick={() => handleAddToCart(book)}><i class="fa-solid fa-bucket"></i> Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>       
);

}
