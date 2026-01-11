import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./FeatureRow.css";

export default function FeatureRow() {
  const featuresRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      featuresRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2
      }
    );
  }, []);

  const features = [
    { icon: "🚚", title: "Free Shipping", desc: "On Orders Over ₹500" },
    { icon: "💳", title: "Secure Payment", desc: "100% Secure Payment" },
    { icon: "📞", title: "24x7 Support", desc: "Customer Support" },
    { icon: "🔄", title: "Easy Returns", desc: "Hassle-Free Returns" },
    { icon: "📚", title: "Wide Selection", desc: "Thousands of Books" }
  ];

  return (
    <div className="feature-row">
      {features.map((item, index) => (
        <div
          className="feature-item"
          key={index}
          ref={(el) => (featuresRef.current[index] = el)}
        >
          <div className="feature-icon">{item.icon}</div>
          <div className="feature-text">
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
