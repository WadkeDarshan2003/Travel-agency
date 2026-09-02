import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CMSContext from '../context/CMSContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { settings } = useContext(CMSContext);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { label: 'routes', href: '/pune-to-mumbai-cab' },
    { label: 'fleet', href: '/fleet' },
    { label: 'about', href: '/about-us' },
    { label: 'contact', href: '/contact-booking' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        /* Glassmorphism Header */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          background: rgba(246, 247, 241, 0.75);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(227, 223, 212, 0.6);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
          transition: all 0.3s ease;
          text-transform: none !important;
        }
        .navbar.scrolled {
          background: rgba(246, 247, 241, 0.88);
          border-bottom-color: var(--border);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        .navbar-inner {
          display: flex; align-items: center;
          justify-content: space-between;
          height: 64px; gap: 2rem;
        }

        /* Logo - No uppercase */
        .navbar-logo {
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-main);
          text-decoration: none;
          flex-shrink: 0;
          text-transform: none;
        }

        /* Nav links - No uppercase */
        .nav-links {
          display: flex; align-items: center; gap: 0.2rem;
          list-style: none; text-transform: none;
        }
        .nav-link {
          padding: 0.4rem 0.85rem;
          font-size: 0.88rem; font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
          letter-spacing: 0.005em;
          text-transform: none;
        }
        .nav-link:hover, .nav-link.active { color: var(--text-main); }

        /* Action button - Glass outline, no uppercase */
        .nav-book {
          padding: 0.45rem 1.2rem;
          border: 1.5px solid var(--black);
          border-radius: 8px;
          font-size: 0.82rem; font-weight: 600;
          color: var(--text-main);
          text-decoration: none;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.2s ease;
          flex-shrink: 0;
          text-transform: none;
        }
        .nav-book:hover {
          background: var(--black);
          color: var(--white);
        }

        /* Hamburger */
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          padding: 8px; cursor: pointer; background: none; border: none;
        }
        .hamburger span {
          display: block; width: 20px; height: 1.5px;
          background: var(--black); border-radius: 2px;
          transition: all 0.25s ease;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); }

        /* Glassmorphism Mobile Drawer */
        .mobile-drawer {
          display: none; position: fixed; top: 64px; left: 0; right: 0;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1.5px solid var(--border);
          padding: 1.5rem 2rem;
          z-index: 999;
          transform: translateY(-8px); opacity: 0;
          transition: all 0.25s ease; pointer-events: none;
          box-shadow: 0 12px 36px rgba(0,0,0,0.06);
          text-transform: none;
        }
        .mobile-drawer.open { transform: translateY(0); opacity: 1; pointer-events: all; }
        .mobile-nav-links { display: flex; flex-direction: column; gap: 0; margin-bottom: 1.25rem; }
        .mobile-nav-link {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.85rem 0; font-size: 0.95rem; font-weight: 500;
          color: var(--text-main); text-decoration: none;
          border-bottom: 1px solid var(--border);
          text-transform: none;
        }
        .mobile-nav-link:last-child { border-bottom: none; }
        .mobile-drawer-footer { padding-top: 1rem; }
        .mobile-book-btn {
          display: block; text-align: center; padding: 0.75rem;
          border: 1.5px solid var(--black); border-radius: 8px;
          font-size: 0.85rem; font-weight: 600; text-transform: none;
          color: var(--text-main); text-decoration: none; transition: all 0.2s ease;
        }
        .mobile-book-btn:hover { background: var(--black); color: var(--white); }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-book { display: none; }
          .hamburger { display: flex; }
          .mobile-drawer { display: block; }
        }
      `}</style>

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            <Link to="/" className="navbar-logo" id="navbar-logo">
              punemumbaicab
            </Link>

            <ul className="nav-links">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className={`nav-link${isActive(href) ? ' active' : ''}`} id={`nav-${label.toLowerCase()}`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link to="/contact-booking" className="nav-book" id="navbar-book-btn">book now</Link>

            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
              id="navbar-hamburger"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        <div className={`mobile-drawer${menuOpen ? ' open' : ''}`}>
          <div className="mobile-nav-links">
            {navLinks.map(({ label, href }) => (
              <Link key={label} to={href} className="mobile-nav-link" id={`mobile-nav-${label.toLowerCase()}`}>
                {label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
          <div className="mobile-drawer-footer">
            <Link to="/contact-booking" className="mobile-book-btn" id="mobile-book-btn">book now</Link>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: '64px' }} />
    </>
  );
}
