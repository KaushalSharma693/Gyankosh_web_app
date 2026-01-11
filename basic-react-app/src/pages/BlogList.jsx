// BlogList.jsx
import React, { useEffect, useState } from "react";
import "./BlogList.css"; // We'll style it separately

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://dev.to/api/articles?tag=sex")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="blog-container">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <img src={blog.cover_image || "https://via.placeholder.com/300"} alt="cover" />
          <h3>{blog.title}</h3>
          <p>By <strong>{blog.user.name}</strong></p>
          <p className="desc">{blog.description}</p>
          <a href={blog.url} target="_blank" rel="noopener noreferrer" className="read-btn">
            Read Full Blog →
          </a>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
