import Footer from "./footer.jsx";
import Footer1 from "./Footer1.jsx";


function Final() {


 return (
    <>
    <footer className="footer-section">
      <Footer 
      title="Call Us 7/24" 
      content="+208-555-0112" 
      iconClass="fa-solid fa-phone-volume"
       />

      <Footer 
      title="Make a Quote" 
      content="example@gmail.com"
      iconClass="fa-solid fa-envelope"
       />

      <Footer 
      title="Opening Hour" 
      content="Sunday - Fri: 9 aM - 6 pM" 
      iconClass="fa-solid fa-clock"
      />

      <Footer 
      title="Location" 
      content="4517 Washington ave."
      iconClass="fa-solid fa-location-dot"
       />
     
    </footer>
     <Footer1/>
    </>
  );

}


export default Final;
