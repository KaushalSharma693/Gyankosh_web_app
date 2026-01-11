import React, { useEffect, useRef, useState } from "react";
import "./Client.css";

const testimonialsData = [
  {
    id: 1,
    text:"his platform completely changed how I discover books. The design is clean, and I always find what I need without hassle. A really smooth shopping experience",
    clientImg: "client5.avif",
    name: "Riya Sharma",
    role: "Product Manager",
    rating: 5,
    companyLogo: "logo4.webp",
  },
  {
    id: 2,
    text: "I loved how easy and fast it is to get what I need.Very happy with the quick delivery and curated recommendations. Everything feels simple and intuitive — makes book buying enjoyable! Highly recommended!",
    clientImg: "client2.avif",
    name: "Aman Verma",
    role: "UX Designer",
    rating: 4,
    companyLogo: "logo6.webp",
  },
  {
    id: 3,
    text: "As a regular reader, I appreciate the quality and variety here. The customer support is always responsive.The UI is clean and the recommendations are spot on. Great platform!",
    clientImg: "client4.avif",
    name: "Priya Mehta",
    role: "Marketing Lead",
    rating: 5,
    companyLogo: "logo5.avif",
  },
  {
    id: 4,
    text: "Excellent service, and the speed is amazing. I found my book in seconds.“I’ve been using this site for months and love how easy it is to browse and order books. Great offers and excellent service overall!",
    clientImg: "client3.avif",
    name: "Raghav Kumar",
    role: "Software Engineer",
    rating: 4,
    companyLogo: "logo2.webp",
  },
];

export default function ClientTestimonial() {
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [offset, setOffset] = useState(0);
  const cardWidth = 385;

  const trackRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;

    const moveBy = cardWidth;

    trackRef.current.style.transition = "transform 0.7s ease-in-out";
    trackRef.current.style.transform = `translateX(-${moveBy}px)`;

    const timer = setTimeout(() => {
      trackRef.current.style.transition = "none";
      setTestimonials((prev) => {
        const updated = [...prev];
        const first = updated.shift();
        updated.push(first);
        return updated;
      });
      trackRef.current.style.transform = `translateX(0px)`;
    }, 600);

    return () => clearTimeout(timer);
  }, [offset]);

  return (
    <div className="testimonial-section">
      <h2 className="testimonial-title">💬 What Our Clients Say</h2>

      <div className="testimonial-carousel-wrapper">
        <div className="testimonial-track" ref={trackRef}>
          {testimonials.map((item) => (
            <div className="testimonial-card" key={item.id}>
              <p className="testimonial-text">“{item.text}”</p>
              <div className="testimonial-footer">
                <div className="client-info">
                  <img src={item.clientImg} alt={item.name} className="client-img" />
                  <div>
                    <h4>{item.name}</h4>
                    <p className="client-role">{item.role}</p>
                  <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                   <i
                   key={i}
                    className={`fa-star ${i < item.rating ? 'fas' : 'far'}`}
                     ></i>
                    ))}
                  </div>

                  </div>
                </div>
                <img src={item.companyLogo} alt="Company Logo" className="company-logo" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
