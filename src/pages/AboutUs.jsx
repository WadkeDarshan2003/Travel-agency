import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const AboutUs = () => {
  return (
    <>
      <SEO
        title="About Us | PuneMumbaiCab — Your Trusted Intercity Partner"
        description="Learn about PuneMumbaiCab — our mission, values, and commitment to safe, comfortable, and affordable Pune to Mumbai cab service."
      />

      <style>{`
        .page-hero {
          padding: 3rem 0 2.5rem; background: var(--bg);
          border-bottom: 1.5px solid var(--border);
        }
        .page-hero .eyebrow { margin-bottom: 0.75rem; }
        .page-hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; letter-spacing: -0.025em; margin-bottom: 0.75rem; }
        .page-hero h1 em { font-style: italic; font-weight: 400; }
        .page-hero p { font-size: 1rem; color: var(--text-muted); max-width: 640px; line-height: 1.65; }
        .about-section { padding: 4rem 0; }
        .about-content { max-width: 720px; }
        .about-content h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; margin-top: 2.5rem; }
        .about-content h2 em { font-style: italic; font-weight: 400; }
        .about-content p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin: 3rem 0; }
        .stat-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 1.75rem; text-align: center;
        }
        .stat-card .number { font-size: 2rem; font-weight: 700; color: var(--text-main); line-height: 1; }
        .stat-card .label { font-size: 0.78rem; color: var(--text-muted); margin-top: 0.35rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
        .values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin: 2.5rem 0; }
        .value-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 1.75rem;
        }
        .value-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
        .value-card p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; }
        .about-cta {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 2.5rem; text-align: center;
          margin-top: 2rem;
        }
        .about-cta h3 { font-size: 1.35rem; margin-bottom: 0.5rem; }
        .about-cta h3 em { font-style: italic; font-weight: 400; }
        .about-cta p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem; }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">About Us</div>
          <h1>We Make Highway <em>Travel Easy</em></h1>
          <p>Founded with a simple mission — to make Pune-Mumbai travel reliable, comfortable, and affordable for everyone.</p>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="number">50K+</div>
              <div className="label">Happy Travelers</div>
            </div>
            <div className="stat-card">
              <div className="number">8+</div>
              <div className="label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="number">100+</div>
              <div className="label">Verified Drivers</div>
            </div>
            <div className="stat-card">
              <div className="number">4.8</div>
              <div className="label">Google Rating</div>
            </div>
          </div>

          <div className="about-content">
            <h2>Our <em>Story</em></h2>
            <p>
              PuneMumbaiCab started with a single idea: the Pune-Mumbai Expressway is one of India's busiest routes, yet finding a reliable, fairly-priced cab was unnecessarily difficult. Hidden charges, unprofessional drivers, and unreliable pickups were the norm.
            </p>
            <p>
              We set out to change that. Today, we operate a fleet of well-maintained sedans, SUVs, and luxury vehicles, serving thousands of corporate professionals, families, and travelers every month between Pune, Mumbai, and their airports.
            </p>

            <h2>Our <em>Values</em></h2>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <h3>🛡 Transparency First</h3>
              <p>No hidden charges, no surge pricing. The fare you see is the fare you pay — always. Toll charges are clearly communicated upfront.</p>
            </div>
            <div className="value-card">
              <h3>⏱ Punctuality Promise</h3>
              <p>Our drivers arrive 10 minutes before the scheduled pickup. For airport transfers, we track your flight and adjust timing automatically.</p>
            </div>
            <div className="value-card">
              <h3>🚗 Quality Fleet</h3>
              <p>Every vehicle is deep-cleaned before each trip. Regular maintenance ensures your ride is smooth, safe, and comfortable.</p>
            </div>
            <div className="value-card">
              <h3>👤 Professional Chauffeurs</h3>
              <p>All drivers are background-verified with 5+ years of Expressway driving experience. Courteous, uniformed, and well-trained.</p>
            </div>
          </div>

          <div className="about-cta">
            <h3>Ready to <em>ride with us?</em></h3>
            <p>Experience the difference that thousands of happy travelers already know about.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact-booking" className="btn btn-primary" id="about-book-btn">Book a Cab Now</Link>
              <Link to="/fleet" className="btn btn-outline">View Our Fleet</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
