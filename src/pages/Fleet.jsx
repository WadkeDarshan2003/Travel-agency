import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCMS } from '../context/CMSContext';

const Fleet = () => {
  const { vehicles } = useCMS();
  const activeVehicles = vehicles.filter(v => v.status === 'Active');

  return (
    <>
      <SEO
        title="Our Fleet | Sedan, SUV & Innova Crysta Cabs"
        description="Browse our fleet of well-maintained, sanitized vehicles for Pune to Mumbai trips. Sedan, SUV, Innova & Innova Crysta available."
      />

      <style>{`
        .page-hero {
          padding: 3rem 0 2.5rem; background: var(--bg);
          border-bottom: 1.5px solid var(--border);
        }
        .page-hero .eyebrow { margin-bottom: 0.75rem; }
        .page-hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; letter-spacing: -0.025em; margin-bottom: 0.75rem; }
        .page-hero h1 em { font-style: italic; font-weight: 400; }
        .page-hero p { font-size: 1rem; color: var(--text-muted); max-width: 600px; line-height: 1.65; }
        .fleet-section { padding: 4rem 0; }
        .fleet-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .fleet-detail-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); overflow: hidden;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .fleet-detail-card:hover { border-color: var(--border-dark); box-shadow: var(--shadow-card); }
        .fleet-detail-img { width: 100%; height: 220px; object-fit: cover; }
        .fleet-detail-body { padding: 1.75rem; }
        .fleet-detail-body h3 { font-size: 1.35rem; margin-bottom: 0.5rem; }
        .fleet-detail-body .desc {
          font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 2.7em;
        }
        .fleet-meta { display: flex; gap: 1.5rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .fleet-meta-item { font-size: 0.82rem; color: var(--text-muted); }
        .fleet-meta-item strong { color: var(--text-main); display: block; font-size: 0.95rem; }
        .fleet-features { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
        .fleet-feat-tag {
          font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.04em; padding: 0.3rem 0.75rem;
          background: var(--cream); border: 1px solid var(--border);
          border-radius: var(--radius-pill); color: var(--text-muted);
        }
        .fleet-prices {
          border-top: 1.5px solid var(--border); padding-top: 1.25rem;
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .fleet-price-block .label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); font-weight: 600; }
        .fleet-price-block .val { font-size: 1.35rem; font-weight: 700; color: var(--text-main); }
        @media (max-width: 768px) { .fleet-detail-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Vehicle Options</div>
          <h1>Our <em>Fleet</em></h1>
          <p>Well-maintained, sanitized vehicles driven by experienced highway chauffeurs. Choose the ride that fits your comfort and budget.</p>
        </div>
      </section>

      <section className="fleet-section">
        <div className="container">
          <div className="fleet-detail-grid">
            {activeVehicles.map(v => (
              <div key={v.id} className="fleet-detail-card" id={`fleet-detail-${v.slug}`}>
                <img src={v.image} alt={v.name} className="fleet-detail-img" />
                <div className="fleet-detail-body">
                  <h3>{v.name}</h3>
                  <p className="desc">{v.description}</p>

                  <div className="fleet-meta">
                    <div className="fleet-meta-item">
                      <strong>{v.seating}</strong> Seating
                    </div>
                    <div className="fleet-meta-item">
                      <strong>{v.luggage}</strong> Luggage
                    </div>
                  </div>

                  <div className="fleet-features">
                    {v.features?.map((f, i) => (
                      <span key={i} className="fleet-feat-tag">{f}</span>
                    ))}
                  </div>

                  <div className="fleet-prices">
                    <div className="fleet-price-block">
                      <div className="label">One Way</div>
                      <div className="val">₹{v.puneToMumbaiOneWay.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="fleet-price-block">
                      <div className="label">Round Trip</div>
                      <div className="val">₹{v.puneToMumbaiRoundTrip.toLocaleString('en-IN')}</div>
                    </div>
                  </div>

                  <Link to={`/contact-booking?vehicle=${v.id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Book {v.name.split(' ')[0]}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Fleet;
