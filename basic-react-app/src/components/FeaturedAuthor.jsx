import React, { useRef } from "react";
import "./FeaturedAuthor.css";

const authors = [
  {
    id: 1,
    name: "Riya Sharma",
    books: 12,
    photo: "client5.avif", 
    deco: "shape.png",
  },
  {
    id: 2,
    name: "Aman Verma",
    books: 9,
    photo: "client2.avif",
    deco: "shape.png",
  },
  {
    id: 3,
    name: "Sneha Gupta",
    books: 15,
    photo: "client3.avif",
    deco: "shape.png",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    books: 7,
    photo: "client4.avif",
    deco: "shape.png",
  },
  {
    id: 5,
    name: "Neha Joshi",
    books: 10,
    photo: "client5.avif",
    deco: "shape.png",
  },
  {
    id: 6,
    name: "Karan Patel",
    books: 11,
    photo: "client2.avif",
    deco: "shape.png",
  },
  {
    id: 7,
    name: "Priya Das",
    books: 13,
    photo: "client3.avif",
    deco: "shape.png",
  },
  {
    id: 8,
    name: "Rohit Kumar",
    books: 8,
    photo: "client4.avif",
    deco: "shape.png",
  },
  {
    id: 9,
    name: "hero boy",
    books: 10,
    photo: "client5.avif",
    deco: "shape.png",
  },
  {
    id: 10,
    name: "praveen Patel",
    books: 11,
    photo: "client2.avif",
    deco: "shape.png",
  },
];

export default function FeaturedAuthor() {
  const trackRef = useRef();

  const scrollLeft = () => {
    trackRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="featured-author-section">
      <h2 className="section-heading">🌟 Featured Authors</h2>
      <p className="section-sub">Meet our top contributors with amazing books!</p>

      <div className="slider-container">
        <button className="slider-btn left" onClick={scrollLeft}>
          &#8592;
        </button>
        <div className="author-track" ref={trackRef}>
          {authors.map((author) => (
            <div className="author-card" key={author.id}>
          <div className="author-photo-wrapper">
              <img src={author.deco} alt="decorative ring" className="wave-img" />
              <img src={author.photo} alt={author.name} className="author-photo" />
          </div>
              <div className="author-box">
                <p className="author-name">{author.name}</p>
                <p className="book-count">{author.books} Books Published</p>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn right" onClick={scrollRight}>
          &#8594;
        </button>
      </div>
    </div>
  );
}
