import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <>
<footer className="footer">
    <div className="footer__addr">
      <h1 className="footer__logo">FashionNova</h1>
          
      <h2>Contact</h2>
      
      <address>
        5534 Somewhere In. The World 22193-10212<br />
            
        <a className="footer__btn" href="mailto:example@gmail.com">Email Us</a>
      </address>
    </div>
    
    <ul className="footer__nav">
      <li className="nav__item">
        <h2 className="nav__title">Mode</h2>
  
        <ul className="nav__ul">
          <li>
            <a href="#">Online</a>
          </li>
  
          <li>
            <a href="#">Offline</a>
          </li>
        </ul>
      </li>
      
      <li className="nav__item nav__item--extra">
        <h2 className="nav__title">Categories</h2>
        
        <ul className="nav__ul nav__ul--extra">
          <li>
            <a href="#">Western Wear</a>
          </li>
          
          <li>
            <a href="#">Ehnic Wear</a>
          </li>
          
          <li>
            <a href="#">Winter Wear</a>
          </li>
          
          <li>
            <a href="#">Stylish Jeans</a>
          </li>
          
          <li>
            <a href="#">Formal Wear</a>
          </li>
          
          <li>
            <a href="#">Traditional Wear</a>
          </li>
        </ul>
      </li>
      
      <li className="nav__item">
        <h2 className="nav__title">Legal</h2>
        
        <ul className="nav__ul">
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          
          <li>
            <a href="#">Terms of Use</a>
          </li>
          
          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </li>
    </ul>
    
    <div className="legal">
      <p>&copy; 2025 Something. All rights reserved.</p>
      
      <div className="legal__links">
        <span>Made with <span className="heart">♥</span> remotely from Anywhere</span>
      </div>
    </div>
  </footer>

    </>
  )
}

export default Footer
