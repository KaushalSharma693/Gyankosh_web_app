import React, { useEffect, useState } from "react";
import "./Blog.css";

export default function BlogGrid() {
  const [blogs, setBlogs] = useState([]);
  const [tag, setTag] = useState("india"); 
  const [inputValue, setInputValue] = useState("");

  const fetchBlogs = (tagValue) => {
    fetch(`https://dev.to/api/articles?tag=${tagValue}&per_page=50`)
      .then((res) => res.json())
      .then((data) =>setBlogs(data))
      .catch((err) => console.error("API Error:", err));
  };

  useEffect(() => {
    fetchBlogs(tag);
  }, [tag]);

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      setTag(inputValue.trim().toLowerCase());
    }
  };

  return (
    <>
<div className="blog-banner">
  <img src="new.avif" alt="Left" className="banner-image left" />
  
  <div className="banner-text">
    <h1 className="banner-title">BLOGS</h1>
    <p className="banner-desc">Dive into the world of blogs and literary insights!</p>
  </div>

  <img src="hero-girl.png" alt="Right" className="banner-image right" />
</div>


    <div className="blog-grid-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search blogs by tag (e.g., tech, india, travel)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="blog-grid-wrapper">
        {blogs.map((item) => (
          <div className="blog-card" key={item.id}>
            <div className="blog-img-container">
              <img
                src={item.cover_image || `https://picsum.photos/seed/${item.id}/400/250`}
                alt={item.title}
                className="blog-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://picsum.photos/seed/fallback${item.id}/400/250`;
                }}
              />
            </div>
            <div className="blog-meta">
              <span>{new Date(item.published_at).toLocaleDateString()}</span>
              <span>{item.user.name}</span>
            </div>
            <h3 className="blog-title">{item.title}</h3>
            <p className="blog-excerpt">{item.description || item.summary || "No description available."}</p>
            <a href={item.url} target="_blank" rel="noreferrer" className="read-more">
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
