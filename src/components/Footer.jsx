import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer {
          background: var(--bg);
          color: var(--text-main);
          padding: 4rem 0 0;
          border-top: 1.5px solid var(--border);
        }
        .footer-top {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid var(--border);
        }
        .footer-col h4 {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 1.2rem;
          letter-spacing: -0.01em;
        }
        .footer-col ul { list-style: none; padding: 0; margin: 0; }
        .footer-col li { margin-bottom: 0.55rem; }
        .footer-col a {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-col a:hover { color: var(--text-main); }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .footer-bottom a {
          color: var(--text-muted);
          text-decoration: none;
          margin-left: 1.5rem;
          transition: color 0.2s ease;
        }
        .footer-bottom a:hover { color: var(--text-main); }
        
        .footer-socials {
          display: flex;
          gap: 0.6rem;
          align-items: center;
        }
        .footer-socials a {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          transition: all 0.2s ease;
          font-size: 0.8rem;
          text-decoration: none;
        }
        .footer-socials a:hover {
          border-color: var(--black);
          background: var(--black);
          color: var(--white);
        }

        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
          .footer-bottom a { margin-left: 0; margin-right: 1rem; }
        }
        @media (max-width: 480px) {
          .footer-top { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="footer" id="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-col">
              <h4>Routes</h4>
              <ul>
                <li><Link to="/pune-to-mumbai-cab">Pune to Mumbai</Link></li>
                <li><Link to="/mumbai-to-pune-cab">Mumbai to Pune</Link></li>
                <li><Link to="/contact-booking">Airport Transfers</Link></li>
                <li><Link to="/fleet">Outstation Cabs</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/fleet">Our Fleet</Link></li>
                <li><Link to="/contact-booking">Contact</Link></li>
                <li><Link to="/admin/login">Admin Portal</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="tel:+919000000000">+91 90000 00000</a></li>
                <li><a href="mailto:bookings@punemumbaicab.com">bookings@punemumbaicab.com</a></li>
                <li><a href="https://wa.me/919000000000" target="_blank" rel="noopener noreferrer">WhatsApp Support</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {year} PuneMumbaiCab. All rights reserved.</span>
            <div className="footer-socials">
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◎</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
