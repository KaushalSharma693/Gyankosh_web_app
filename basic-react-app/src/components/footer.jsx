import "./footer.css";
export default function FooterItem({ title, content, iconClass }) {
  return (
  <div>
  <div className="footer-item">
    <div className="icon">
     <i className={iconClass}></i>
    </div>
    <div className="content">
      <p>{title}</p>
      <a>{content}</a>
    </div>
    </div>
    <hr/>
    </div>
     
  );
}