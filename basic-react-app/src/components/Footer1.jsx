import React from 'react';
import './Footer1.css';

const Footer1 = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Column 1: Logo + Paragraph */}
        <div className="footer-col">
          <h2><span>GYANKOSH</span></h2>
         
            <p className="para">Phasellus ultricies aliquam volutpat. Ullamcorper laoreet neque, a lacinia curabitur lacinia mollis.</p>
             <div className= "icon-i">
            <i class="fa-brands fa-facebook-f i"></i>
            <i class="fa-brands fa-twitter i"></i>
            <i class="fa-brands fa-youtube i"></i>
            <i class="fa-brands fa-linkedin i"></i>
            
          </div>
          <img src='https://gramentheme.com/html/bookle/assets/img/plane-shape.png' className='image' />
        </div>

        {/* Column 2: Customer Support */}
        <div className="footer-col">
          <h3 >Customer Support</h3>
          <ul className="custom-list">
            <li>Store List</li>
            <li>Opening Hours</li>
            <li>Contact Us</li>
            <li>Return Policy</li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="footer-col">
          <h3>Categories</h3>
          <ul className="custom-list">
            <li>Novel Books</li>
            <li>Poetry Books</li>
            <li>Political Books</li>
            <li>History Books</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-col">
          <h3>Newsletter</h3>
          <p>Sign up to searing weekly newsletter to get the latest updates.</p>
          <div className="newsletter-input-wrapper">
          <input 
            type="email" 
           placeholder="Enter email address" 
           className="newsletter-input"
           />
          <i className="fa-solid fa-paper-plane send-icon"></i>  
        </div>

        </div>

      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
  <div className="footer-center">
    © 2025 Bookshala
    <span>Terms & Conditions</span>
  </div>
  <div className="footer-right">
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="payment-icon" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="payment-icon" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="payment-icon" />
  </div>
</div>

    </footer>
  );
};

export default Footer1;
