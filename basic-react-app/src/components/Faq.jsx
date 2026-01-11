import React, { useState } from "react";
import "./Faq.css";
import { NavLink, useNavigate } from "react-router-dom";

const faqData = [
  {
    question: "How can I track my order status?",
    answer: "After placing an order, you can track it from the 'My Orders' section in your profile. You will also get timely email updates including dispatch and delivery status with tracking ID.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we do ship internationally to many countries. International shipping charges and delivery times may vary depending on your location.",
  },
  {
    question: "What if I receive a damaged book?",
    answer: "In such cases, please contact our support within 48 hours of delivery with images of the damaged product. We’ll arrange for a quick replacement or refund.",
  },
  {
    question: "Can I download ebooks after purchasing?",
    answer: "Yes, once the payment is successful, you can immediately download the ebook from your account’s digital library section.",
  },
  {
    question: "What payment methods are supported?",
    answer: "We support all major debit/credit cards, net banking, UPI, wallets like Paytm/PhonePe, and cash on delivery in select regions.",
  },
  {
    question: "Is my personal information secure?",
    answer: "Absolutely! We follow strict security protocols and your data is encrypted. We never share your information with third parties.",
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="faq-section">
      <h2 className="faq-title">❓ FAQ's</h2>
      <p className="faq-subtext">
        Here are some common questions to help improve your experience and ensure happy customers.
      </p>

      <div className="faq-items">
        {faqData.map((item, index) => (
          <div className="faq-card" key={index}>
            <div className="faq-question" onClick={() => toggle(index)}>
              <span>{item.question}</span>
              <i
                className={`fa-solid fa-chevron-${
                  openIndex === index ? "up" : "down"
                }`}
              ></i>
            </div>
            <div
              className={`faq-answer-wrapper ${
                openIndex === index ? "open" : ""
              }`}
            >
              <div className="faq-answer">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="faq-link">
        For more answers, visit the{" "}
        <NavLink to="/library"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bookle FAQ Page
        </NavLink>
      </p>
    </div>
  );
}
