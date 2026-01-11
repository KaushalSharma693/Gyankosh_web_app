import React, { useState } from 'react';
import './Contact.css';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("akshat hero");
    setFormData({ name: '', email: '', phone: '', message: '', city: '' });
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <div className="card-left">
          <h2>Get in Touch</h2>
          <p><strong>📍 Location:</strong> Indore, MP</p>
          <p><strong>✉️ Email:</strong> example@gmail.com</p>
          <p><strong>📞 Phone:</strong> +91 12345 67890</p>
          <p>Let’s talk about ideas, feedback, or queries!</p>
        </div>

        <div className="card-right">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <label>Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} />

            <label>Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} />

            <label>Contact Number</label>
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />

            <label>Message</label>
            <textarea name="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>

            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
