import React from "react";
import "./LatestNews.css";
import LikeButton from "./LikedButton"; // adjust path if needed
import { NavLink, useNavigate } from "react-router-dom";

const blogData = [
  {
    id: 1,
    image: "latest.jpg",
    title: "10 Reading Habits That Improve Your Brain",
    date: "June 29, 2025",
    admin: "Akshat",
  },
  {
    id: 2,
    image: "latest2.jpg",
    title: "How to Choose the Right Book for Learning",
    date: "June 28, 2025",
    admin: "Akshat",
  },
  {
    id: 3,
    image: "latest3.jpg",
    title: "Top 5 Fiction Books You Can’t Miss in 2025",
    date: "June 27, 2025",
    admin: "Akshat",
  },
  {
    id: 4,
    image: "latest4.jpg",
    title: "The Rise of Ebooks in Modern Education",
    date: "June 26, 2025",
    admin: "Akshat",
  },
];

export default function LatestNews() {
  return (
    <div className="latest-news-section">
      <h2 className="news-title"><i class="fa-solid fa-envelope"></i> Our Latest News</h2>
      <p className="news-subtext">Stay updated with the latest articles and news in the world of books, learning, and innovation.</p>

      <div className="news-card-wrapper">
       {blogData.map((item) => (
  <div className="news-card" key={item.id}>
    <LikeButton />
    <div className="news-img-container">
      <img src={item.image} alt={item.title} className="news-img" />
    </div>
    <div className="news-meta">
      <span className="date"><i class="fa-solid fa-calendar-days"></i> {item.date}</span>
      <span className="admin"><i class="fa-solid fa-user"></i> {item.admin}</span>
    </div>
    <h3 className="news-heading">{item.title}</h3>

    <NavLink to="/blog" className="read-more" >Read More <i class="fa-solid fa-arrow-right"></i></NavLink>
  </div>
))}
      </div>
    </div>
  );
}
