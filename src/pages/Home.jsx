import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCMS } from '../context/CMSContext';

const Home = () => {
  const { vehicles, routes } = useCMS();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const [selectedRoute, setSelectedRoute] = useState('pune-to-mumbai');
  const [selectedTripType, setSelectedTripType] = useState('oneWay');
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]?.id || 'veh-1');

  const activeVehicles = vehicles.filter(v => v.status === 'Active');
  const currentVehicleObj = vehicles.find(v => v.id === selectedVehicle) || vehicles[0];

  const calculateEstimatePrice = () => {
    if (!currentVehicleObj) return 2999;
    if (selectedRoute === 'pune-to-mumbai') {
      return selectedTripType === 'oneWay' ? currentVehicleObj.puneToMumbaiOneWay : currentVehicleObj.puneToMumbaiRoundTrip;
    } else {
      return selectedTripType === 'oneWay' ? currentVehicleObj.mumbaiToPuneOneWay : currentVehicleObj.mumbaiToPuneRoundTrip;
    }
  };

  const handleQuickBooking = (e) => {
    e.preventDefault();
    navigate(`/contact-booking?route=${selectedRoute}&type=${selectedTripType}&vehicle=${selectedVehicle}`);
  };

  const faqs = [
    { q: 'How much does a Pune to Mumbai cab cost?', a: 'A Pune to Mumbai Sedan cab starts at ₹2,999 for a one-way trip. SUVs (Ertiga) start at ₹4,499, and luxury Innova Crysta cabs start at ₹5,999. All prices are transparent with no hidden charges.' },
    { q: 'How long does the journey from Pune to Mumbai take?', a: 'The travel time between Pune and Mumbai via the Pune-Mumbai Expressway is approximately 3 to 3.5 hours for a distance of 150 km, depending on traffic conditions.' },
    { q: 'Do you provide one-way cabs from Pune to Mumbai?', a: 'Yes! We specialize in Pune to Mumbai One Way Cab services. You only pay for one side, with zero return charges.' },
    { q: 'Do you provide pickup from Mumbai Airport to Pune?', a: 'Yes, we provide 24x7 pickups from Mumbai Airport Terminal 1 and Terminal 2 directly to any address in Pune.' },
    { q: 'Are toll taxes included in the cab fare?', a: 'We offer both toll-inclusive and standard fares. Expressway toll charges (approx. ₹320) can be added transparently.' },
    { q: 'Can I choose my vehicle type?', a: 'Absolutely! Choose from Sedan (Dzire/Etios), SUV (Ertiga/Carens), Innova, or Innova Crysta.' }
  ];

  const homeSchema = {
    "@context": "https://schema.org", "@type": "LocalBusiness",
    "name": "Pune Mumbai Cab", "telephone": "+919000000000",
    "priceRange": "₹2999 - ₹10999",
    "description": "Top-rated intercity cab service between Pune and Mumbai."
  };

  /* Service-style cards data (LODR pattern: title with italic + image) */
  const services = [
    { title: 'One Way', titleItalic: 'Cab', desc: 'Affordable one-way cabs between Pune and Mumbai. Pay only for a single trip with no return charges.', img1: '/vehicles/sedan-dzire.png', img2: '/vehicles/suv-ertiga.png' },
    { title: 'Round Trip', titleItalic: 'Service', desc: 'Round trip cabs with wait-and-return option. Perfect for day trips and business travel.', img1: '/vehicles/suv-ertiga.png', img2: '/vehicles/innova-crysta.png' },
    { title: 'Airport', titleItalic: 'Transfers', desc: '24×7 pickup and drop to Mumbai Airport T1, T2 and Pune Airport. Flight tracking included.', img1: '/vehicles/innova-crysta.png', img2: '/vehicles/sedan-dzire.png' },
    { title: 'Car', titleItalic: 'Rental', desc: 'Flexible car rental options for outstation trips, weddings, and corporate events across Maharashtra.', img1: '/vehicles/innova-classic.png', img2: '/vehicles/suv-ertiga.png' },
    { title: 'Outstation', titleItalic: 'Cabs', desc: 'Travel to Lonavala, Mahabaleshwar, Shirdi, Goa and more from Pune or Mumbai.', img1: '/hero-cab.png', img2: '/vehicles/innova-crysta.png' },
    { title: 'Corporate', titleItalic: 'Travel', desc: 'Dedicated corporate accounts with monthly billing, priority booking, and fleet management.', img1: '/vehicles/innova-crysta.png', img2: '/vehicles/sedan-dzire.png' },
  ];

  return (
    <>
      <SEO
        title="Pune to Mumbai Cab | Luxury One Way & Round Trip Taxi"
        description="Book Pune to Mumbai Cab service starting at ₹2,999. Doorstep pickup, clean cabs, professional drivers, transparent fares."
        schema={homeSchema}
      />

      <style>{`
        /* ═══════ HERO - LODR SPLIT LAYOUT ═══════ */
        .lodr-hero {
          padding: 2.5rem 0 4rem;
          background: var(--bg);
        }
        .lodr-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: stretch;
        }
        .lodr-hero-image-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
        }
        .lodr-hero-image {
          width: 100%;
          height: 100%;
          min-height: 480px;
          border-radius: 16px;
          object-fit: cover;
        }
        .lodr-hero-content {
          padding-top: 1rem;
        }
        .lodr-hero-title {
          font-size: clamp(2.75rem, 5.5vw, 5rem);
          font-weight: 700;
          line-height: 1.0;
          letter-spacing: -0.035em;
          color: var(--text-main);
          margin-bottom: 1.5rem;
        }
        .lodr-hero-title em {
          font-style: italic;
          font-weight: 400;
          display: block;
        }
        .lodr-hero-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--text-muted);
          margin-bottom: 0.65rem;
        }
        .lodr-hero-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.65;
          max-width: 420px;
          margin-bottom: 2rem;
        }

        /* ═══════ BOOKING WIDGET (LODR-style inline) ═══════ */
        .booking-widget {
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem;
          background: var(--white);
        }
        .bw-fields {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .bw-field label {
          display: block;
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 0.3rem;
        }
        .bw-field select, .bw-field input {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border: 1.5px solid var(--border);
          border-radius: 6px;
          font-size: 0.82rem;
          font-family: var(--font-sans);
          color: var(--text-main);
          background: var(--white);
          -webkit-appearance: none;
          outline: none;
        }
        .bw-field select:focus, .bw-field input:focus {
          border-color: var(--black);
        }
        .bw-estimate {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--cream);
          border: 1.5px solid var(--cream-border);
          border-radius: 8px;
          padding: 0.85rem 1rem;
          margin-bottom: 0.75rem;
        }
        .bw-estimate .est-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .bw-estimate .est-price {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }
        .bw-submit {
          width: 100%;
          padding: 0.8rem;
          background: transparent;
          color: var(--text-main);
          border: 1.5px solid var(--black);
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: background 0.2s ease, color 0.2s ease;
        }
        .bw-submit:hover {
          background: var(--black);
          color: var(--white);
        }
        .trip-toggles {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
        }
        .trip-toggle-btn {
          padding: 0.55rem;
          border: 1.5px solid var(--border);
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--white);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-sans);
        }
        .trip-toggle-btn.active {
          background: var(--black);
          border-color: var(--black);
          color: var(--white);
        }

        /* ═══════ SERVICES GRID (LODR card style) ═══════ */
        .services-sect {
          padding: 5rem 0;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .service-card {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 1.75rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          transition: border-color 0.2s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }
        .service-card:hover {
          border-color: var(--border-dark);
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
        .service-card-text { flex: 1; }
        .service-card-title {
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 0.6rem;
        }
        .service-card-title em {
          font-style: italic;
          font-weight: 400;
          display: block;
        }
        .service-card-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.55;
        }
        .service-card-imgs {
          display: flex;
          flex-direction: column;
          gap: -8px;
          flex-shrink: 0;
        }
        .service-card-imgs img {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--white);
        }
        .service-card-imgs img:nth-child(2) {
          margin-top: -18px;
          margin-left: 20px;
        }

        /* ═══════ SECTION HEADERS (LODR editorial) ═══════ */
        .lodr-sect { padding: 5rem 0; }
        .lodr-sect-alt { background: var(--white); }
        .lodr-sect-header {
          text-align: center;
          max-width: 580px;
          margin: 0 auto 3.5rem;
        }
        .lodr-sect-header .eyebrow {
          font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.14em; color: var(--text-muted); margin-bottom: 0.75rem;
        }
        .lodr-sect-header h2 {
          font-size: clamp(2rem, 4vw, 3.25rem);
          font-weight: 700; letter-spacing: -0.03em;
          margin-bottom: 0.75rem; line-height: 1.05;
        }
        .lodr-sect-header h2 em { font-style: italic; font-weight: 400; }
        .lodr-sect-header p { font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; }

        /* ═══════ ROUTE CARDS ═══════ */
        .route-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .route-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: 12px; padding: 2rem;
          display: flex; flex-direction: column; justify-content: space-between;
          transition: border-color 0.2s, box-shadow 0.25s;
        }
        .route-card:hover { border-color: var(--border-dark); box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .route-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .route-card h3 { font-size: 1.65rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.6rem; }
        .route-card h3 em { font-style: italic; font-weight: 400; }
        .route-card p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem; }
        .route-fare {
          background: var(--cream); border: 1.5px solid var(--cream-border);
          border-radius: 8px; padding: 0.75rem 1rem;
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 1.25rem;
        }
        .route-fare .label { font-size: 0.82rem; color: var(--text-muted); }
        .route-fare .price { font-size: 1.2rem; font-weight: 700; }
        .route-link {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          padding: 0.75rem; border: 1.5px solid var(--black);
          border-radius: 8px; font-size: 0.78rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-main); text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .route-link:hover { background: var(--black); color: var(--white); }

        /* ═══════ FLEET GRID ═══════ */
        .fleet-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .fleet-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: 12px; overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.25s;
        }
        .fleet-card:hover { border-color: var(--border-dark); box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .fleet-card-img { width: 100%; height: 160px; object-fit: cover; }
        .fleet-card-body { padding: 1.25rem; }
        .fleet-card-body h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.3rem; letter-spacing: -0.01em; }
        .fleet-card-body .desc {
          font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.85rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 2.35em;
        }
        .fleet-price-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0.4rem 0; font-size: 0.82rem;
        }
        .fleet-price-row:first-of-type { border-top: 1px solid var(--border); padding-top: 0.85rem; }
        .fleet-price-row .label { color: var(--text-muted); font-size: 0.75rem; }
        .fleet-price-row .val { font-weight: 700; }
        .fleet-card-foot { padding: 0 1.25rem 1.25rem; }
        .fleet-book-btn {
          display: block; text-align: center; padding: 0.6rem;
          border: 1.5px solid var(--black); border-radius: 6px;
          font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.06em; color: var(--text-main);
          text-decoration: none; transition: background 0.2s, color 0.2s;
        }
        .fleet-book-btn:hover { background: var(--black); color: var(--white); }

        /* ═══════ WHY US (LODR minimal text cards) ═══════ */
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .why-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: 12px; padding: 2rem;
          transition: border-color 0.2s, box-shadow 0.25s;
        }
        .why-card:hover { border-color: var(--border-dark); box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .why-card h3 {
          font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }
        .why-card h3 em { font-style: italic; font-weight: 400; }
        .why-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }

        /* ═══════ FAQ ═══════ */
        .faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.65rem; }
        .faq-item {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: 10px; padding: 1.15rem 1.5rem;
          cursor: pointer; transition: border-color 0.2s;
        }
        .faq-item:hover { border-color: var(--border-dark); }
        .faq-q {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.95rem; font-weight: 600;
        }
        .faq-q svg { flex-shrink: 0; margin-left: 1rem; color: var(--text-muted); transition: transform 0.2s; }
        .faq-a {
          margin-top: 0.75rem; padding-top: 0.75rem;
          border-top: 1px solid var(--border);
          font-size: 0.88rem; color: var(--text-muted); line-height: 1.65;
        }

        /* ═══════ CTA BANNER (LODR Light) ═══════ */
        .cta-sect { padding: 0 0 5rem; }
        .cta-banner {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 16px;
          padding: 4rem 3rem; text-align: center; color: var(--text-main);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        .cta-banner h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.75rem); font-weight: 700;
          margin-bottom: 0.75rem; color: var(--text-main); letter-spacing: -0.02em;
        }
        .cta-banner h2 em { font-style: italic; font-weight: 400; }
        .cta-banner p { font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.75rem; max-width: 440px; margin-left: auto; margin-right: auto; }
        .cta-white {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--black); color: var(--white);
          padding: 0.75rem 2rem; border-radius: 8px;
          font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; text-decoration: none;
          transition: background 0.2s;
        }
        .cta-white:hover { background: #2a2a2a; }


        /* ═══════ RESPONSIVE ═══════ */
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .fleet-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .lodr-hero-grid { grid-template-columns: 1fr; }
          .route-cards { grid-template-columns: 1fr; }
          .why-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
          .fleet-grid { grid-template-columns: 1fr; }
          .bw-fields { grid-template-columns: 1fr; }
          .cta-banner { padding: 2.5rem 1.5rem; border-radius: 12px; }
        }
      `}</style>

      {/* ═══════ HERO ═══════ */}
      <section className="lodr-hero">
        <div className="container">
          <div className="lodr-hero-grid">
            {/* LEFT: Hero Image */}
            <div className="lodr-hero-image-wrapper">
              <img
                src="/hero-cab.png"
                alt="Premium cab on Pune Mumbai Expressway"
                className="lodr-hero-image"
              />
            </div>

            {/* RIGHT: Text + Booking Widget */}
            <div className="lodr-hero-content">
              <h1 className="lodr-hero-title">
                PUNE TO MUMBAI
                <em>One Way & Round Trip Cab</em>
              </h1>

              <div className="lodr-hero-label">PuneMumbaiCab — Intercity Travel</div>
              <p className="lodr-hero-desc">
                Experience seamless highway travel between Pune and Mumbai. Flat rates starting at ₹2,999 — doorstep pickup, professional chauffeurs, zero hidden charges.
              </p>

              {/* Inline Booking Widget */}
              <form className="booking-widget" onSubmit={handleQuickBooking} id="hero-booking-widget">
                <div className="bw-fields">
                  <div className="bw-field">
                    <label>Route</label>
                    <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)}>
                      <option value="pune-to-mumbai">Pune → Mumbai</option>
                      <option value="mumbai-to-pune">Mumbai → Pune</option>
                    </select>
                  </div>
                  <div className="bw-field">
                    <label>Vehicle</label>
                    <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)}>
                      {activeVehicles.map(v => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="bw-field">
                    <label>Passengers</label>
                    <select defaultValue="2">
                      {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} Guest{n>1?'s':''}</option>)}
                    </select>
                  </div>
                </div>

                <div className="trip-toggles">
                  <button type="button" className={`trip-toggle-btn${selectedTripType === 'oneWay' ? ' active' : ''}`} onClick={() => setSelectedTripType('oneWay')}>One Way</button>
                  <button type="button" className={`trip-toggle-btn${selectedTripType === 'roundTrip' ? ' active' : ''}`} onClick={() => setSelectedTripType('roundTrip')}>Round Trip</button>
                </div>

                <div className="bw-estimate">
                  <div className="est-label">Estimated Fare</div>
                  <div className="est-price">₹{calculateEstimatePrice().toLocaleString('en-IN')}</div>
                </div>

                <button type="submit" className="bw-submit" id="hero-book-btn">Book This Ride</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES GRID (LODR card pattern) ═══════ */}
      <section className="services-sect">
        <div className="container">
          <div className="lodr-sect-header">
            <div className="eyebrow">Our Services</div>
            <h2>Travel <em>Solutions</em></h2>
            <p>Everything from one-way cabs to corporate fleet management, all on one platform</p>
          </div>

          <div className="services-grid">
            {services.map((s, i) => (
              <Link to="/contact-booking" key={i} className="service-card" id={`service-${i}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="service-card-text">
                  <div className="service-card-title">
                    {s.title}
                    <em>{s.titleItalic}</em>
                  </div>
                  <p className="service-card-desc">{s.desc}</p>
                </div>
                <div className="service-card-imgs">
                  <img src={s.img1} alt={`${s.title} ${s.titleItalic}`} />
                  <img src={s.img2} alt={`${s.title} ${s.titleItalic} detail`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ROUTE DETAILS ═══════ */}
      <section className="lodr-sect lodr-sect-alt">
        <div className="container">
          <div className="lodr-sect-header">
            <div className="eyebrow">Popular Routes</div>
            <h2>Pune & Mumbai <em>Express</em></h2>
            <p>Fast, comfortable, and affordable cabs on the Pune-Mumbai Expressway</p>
          </div>

          <div className="route-cards">
            <div className="route-card" id="route-pune-mumbai">
              <div>
                <div className="route-top">
                  <span className="tag">Most Popular</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>150 km · ~3.5 hrs</span>
                </div>
                <h3>Pune → Mumbai <em>Cab</em></h3>
                <p>Pickup from any location in Pune — Hinjewadi, Baner, Wakad, Viman Nagar — and drop anywhere in Mumbai, Thane, or Mumbai Airport.</p>
                <div className="route-fare">
                  <span className="label">Sedan One Way</span>
                  <span className="price">₹{activeVehicles.find(v => v.slug === 'sedan')?.puneToMumbaiOneWay.toLocaleString('en-IN') || '2,999'}</span>
                </div>
              </div>
              <Link to="/pune-to-mumbai-cab" className="route-link">
                View Details & All Rates
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            <div className="route-card" id="route-mumbai-pune">
              <div>
                <div className="route-top">
                  <span className="tag">24×7 Available</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>150 km · ~3.5 hrs</span>
                </div>
                <h3>Mumbai → Pune <em>Cab</em></h3>
                <p>Pickup from Mumbai Airport T1/T2, Dadar, Borivali, Powai, Thane — direct drop to all Pune IT hubs and residential areas.</p>
                <div className="route-fare">
                  <span className="label">Sedan One Way</span>
                  <span className="price">₹{activeVehicles.find(v => v.slug === 'sedan')?.mumbaiToPuneOneWay.toLocaleString('en-IN') || '2,999'}</span>
                </div>
              </div>
              <Link to="/mumbai-to-pune-cab" className="route-link">
                View Details & All Rates
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FLEET OVERVIEW ═══════ */}
      <section className="lodr-sect">
        <div className="container">
          <div className="lodr-sect-header">
            <div className="eyebrow">Our Fleet</div>
            <h2>Choose Your <em>Ride</em></h2>
            <p>Well-maintained, sanitized vehicles driven by professional highway chauffeurs</p>
          </div>

          <div className="fleet-grid">
            {activeVehicles.map(v => (
              <div key={v.id} className="fleet-card" id={`fleet-${v.slug}`}>
                <img src={v.image} alt={v.name} className="fleet-card-img" />
                <div className="fleet-card-body">
                  <h3>{v.name}</h3>
                  <p className="desc">{v.description}</p>
                  <div className="fleet-price-row">
                    <span className="label">One Way</span>
                    <span className="val">₹{v.puneToMumbaiOneWay.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="fleet-price-row">
                    <span className="label">Round Trip</span>
                    <span className="val" style={{ color: 'var(--text-muted)' }}>₹{v.puneToMumbaiRoundTrip.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="fleet-card-foot">
                  <Link to={`/contact-booking?vehicle=${v.id}`} className="fleet-book-btn">Book {v.name.split(' ')[0]}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHY US ═══════ */}
      <section className="lodr-sect lodr-sect-alt">
        <div className="container">
          <div className="lodr-sect-header">
            <div className="eyebrow">Why Choose Us</div>
            <h2>The Trusted <em>Standard</em></h2>
            <p>50,000+ happy travelers trust us for Pune ↔ Mumbai highway journeys</p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <h3>Transparent <em>Pricing</em></h3>
              <p>No surprise fees or hidden surge. Clear per-trip rates with options for toll-inclusive packages.</p>
            </div>
            <div className="why-card">
              <h3>On-Time <em>Guarantee</em></h3>
              <p>Our verified chauffeurs arrive 10 minutes before the scheduled pickup. Flight tracking for airport transfers.</p>
            </div>
            <div className="why-card">
              <h3>Professional <em>Drivers</em></h3>
              <p>Background-checked with 5+ years of Pune-Mumbai Expressway driving experience. Courteous and well-trained.</p>
            </div>
            <div className="why-card">
              <h3>Airport <em>Transfers</em></h3>
              <p>24×7 pickup and drop to Mumbai Airport T1, T2 and Pune Airport. Flight tracking included.</p>
            </div>
            <div className="why-card">
              <h3>Sanitized <em>Fleet</em></h3>
              <p>Every cab is deep-cleaned and sanitized before each trip with hospital-grade disinfectants.</p>
            </div>
            <div className="why-card">
              <h3>Easy <em>Booking</em></h3>
              <p>Book via website, phone call, or WhatsApp. Instant confirmation with driver details shared in advance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="lodr-sect">
        <div className="container">
          <div className="lodr-sect-header">
            <div className="eyebrow">Got Questions?</div>
            <h2>Frequently <em>Asked</em></h2>
            <p>Everything you need to know about our Pune ↔ Mumbai cab service</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item" onClick={() => setOpenFaq(openFaq === idx ? null : idx)} id={`faq-${idx}`}>
                <div className="faq-q">
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none' }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
                {openFaq === idx && <div className="faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="cta-sect">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to <em>Travel?</em></h2>
            <p>Book your Pune to Mumbai or Mumbai to Pune cab in under 2 minutes.</p>
            <Link to="/contact-booking" className="cta-white" id="cta-book-btn">
              Book Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
