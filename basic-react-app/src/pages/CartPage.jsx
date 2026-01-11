import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent (demo)");
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="split-contact">
      <div className="contact-left">
        <h2>Contact Information</h2>
        <p><strong>Location:</strong> Indore, Madhya Pradesh</p>
        <p><strong>Email:</strong> example@gmail.com</p>
        <p><strong>Phone:</strong> +91 12345 67890</p>
        <p>We’d love to hear from you. Send us a message anytime!</p>
      </div>

      <div className="contact-right">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>Full Name</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} />

          <label>Email Address</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} />

          <label>Phone Number</label>
          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />

          <label>Message</label>
          <textarea name="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
