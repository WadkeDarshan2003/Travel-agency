import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCMS } from '../context/CMSContext';

const MumbaiToPune = () => {
  const { vehicles } = useCMS();
  const activeVehicles = vehicles.filter(v => v.status === 'Active');

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Mumbai to Pune Cab Service",
    "description": "Book Mumbai to Pune one way and round trip cab starting ₹2,999.",
    "offers": { "@type": "AggregateOffer", "lowPrice": "2999", "highPrice": "10999", "priceCurrency": "INR" }
  };

  return (
    <>
      <SEO
        title="Mumbai to Pune Cab | One Way & Round Trip from ₹2,999"
        description="Mumbai to Pune cab starting ₹2,999. Airport pickup, Sedan, SUV, Innova Crysta. Professional drivers, transparent pricing."
        schema={schema}
      />

      <style>{`
        .page-hero {
          padding: 3rem 0 2.5rem; background: var(--bg);
          border-bottom: 1.5px solid var(--border);
        }
        .page-hero .eyebrow { margin-bottom: 0.75rem; }
        .page-hero h1 {
          font-size: clamp(2rem, 4vw, 3rem); font-weight: 700;
          letter-spacing: -0.025em; margin-bottom: 0.75rem;
        }
        .page-hero h1 em { font-style: italic; font-weight: 400; }
        .page-hero p { font-size: 1rem; color: var(--text-muted); max-width: 640px; line-height: 1.65; }
        .page-hero-meta { display: flex; gap: 2rem; margin-top: 1.5rem; flex-wrap: wrap; }
        .page-hero-meta-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: var(--text-muted); }
        .page-hero-meta-item strong { color: var(--text-main); }
        .price-section { padding: 4rem 0; }
        .price-table-wrap { background: var(--white); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
        .price-table { width: 100%; border-collapse: collapse; text-align: left; }
        .price-table th { background: var(--cream); padding: 0.85rem 1.25rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); font-weight: 700; border-bottom: 1.5px solid var(--border); }
        .price-table td { padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
        .price-table tr:last-child td { border-bottom: none; }
        .price-table tbody tr:hover { background: var(--cream); }
        .price-table .price { font-weight: 700; font-size: 1.05rem; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 3rem; }
        .info-card { background: var(--white); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 2rem; }
        .info-card h3 { font-size: 1.15rem; margin-bottom: 0.75rem; }
        .info-card ul { list-style: none; padding: 0; }
        .info-card li { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; padding: 0.35rem 0; padding-left: 1.25rem; position: relative; }
        .info-card li::before { content: ''; position: absolute; left: 0; top: 0.7rem; width: 5px; height: 5px; border-radius: 50%; background: var(--text-main); }
        .page-cta { background: var(--white); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 2.5rem; text-align: center; margin-top: 3rem; }
        .page-cta h3 { font-size: 1.35rem; margin-bottom: 0.5rem; }
        .page-cta h3 em { font-style: italic; font-weight: 400; }
        .page-cta p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem; }
        .page-cta .cta-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 768px) { .info-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Mumbai → Pune Route</div>
          <h1>Mumbai to Pune <em>Cab Service</em></h1>
          <p>
            Doorstep pickup from Mumbai Airport (T1/T2), any Mumbai location, Thane, or Navi Mumbai — direct drop to all Pune areas. One-way & round-trip available 24×7.
          </p>
          <div className="page-hero-meta">
            <div className="page-hero-meta-item"><strong>150 km</strong> Distance</div>
            <div className="page-hero-meta-item"><strong>~3.5 Hrs</strong> Travel Time</div>
            <div className="page-hero-meta-item"><strong>Starting ₹2,999</strong> Sedan One Way</div>
          </div>
        </div>
      </section>

      <section className="price-section">
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <div className="eyebrow" style={{ marginBottom: '0.5rem' }}>Fare Chart</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700 }}>
              Mumbai to Pune <em style={{ fontStyle: 'italic', fontWeight: 400 }}>Cab Rates</em>
            </h2>
          </div>

          <div className="price-table-wrap">
            <table className="price-table" id="mumbai-pune-price-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Seating</th>
                  <th>One Way</th>
                  <th>Round Trip</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {activeVehicles.map(v => (
                  <tr key={v.id}>
                    <td><strong>{v.name}</strong></td>
                    <td>{v.seating}</td>
                    <td className="price">₹{v.mumbaiToPuneOneWay.toLocaleString('en-IN')}</td>
                    <td className="price">₹{v.mumbaiToPuneRoundTrip.toLocaleString('en-IN')}</td>
                    <td>
                      <Link to={`/contact-booking?vehicle=${v.id}&route=mumbai-to-pune`} className="btn btn-primary btn-sm">Book</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <h3>Popular Pickup Points in Mumbai</h3>
              <ul>
                <li>Mumbai Airport T1 (Domestic) & T2 (International)</li>
                <li>Dadar, Prabhadevi & Lower Parel</li>
                <li>Andheri, Goregaon & Malad</li>
                <li>BKC & Bandra</li>
                <li>Powai, Vikhroli & Ghatkopar</li>
                <li>Thane, Kalyan & Dombivli</li>
                <li>Navi Mumbai — Vashi, Belapur, Airoli, Panvel</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Popular Drop Points in Pune</h3>
              <ul>
                <li>Hinjewadi IT Park (Phase 1, 2, 3)</li>
                <li>Baner, Balewadi & Wakad</li>
                <li>Viman Nagar & Kharadi</li>
                <li>Koregaon Park & Kalyani Nagar</li>
                <li>Pune Railway Station & Pune Airport</li>
                <li>Hadapsar, Magarpatta & NIBM</li>
                <li>Kothrud, Warje & Paud Road</li>
              </ul>
            </div>
          </div>

          <div className="page-cta">
            <h3>Book your Mumbai to Pune <em>cab now</em></h3>
            <p>Instant booking with confirmed driver details. No advance payment required.</p>
            <div className="cta-btns">
              <Link to="/contact-booking?route=mumbai-to-pune" className="btn btn-primary" id="mtp-book-btn">Book Mumbai to Pune Cab</Link>
              <a href="tel:+919000000000" className="btn btn-outline">Call to Book</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MumbaiToPune;
