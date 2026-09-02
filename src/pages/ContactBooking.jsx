import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCMS } from '../context/CMSContext';

const ContactBooking = () => {
  const { vehicles, addEnquiry } = useCMS();
  const [searchParams] = useSearchParams();
  const activeVehicles = vehicles.filter(v => v.status === 'Active');

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    pickup: '', drop: '',
    travelDate: '', travelTime: '',
    tripType: 'One Way',
    vehicleId: activeVehicles[0]?.id || 'veh-1',
    passengers: 1, message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const vehicleParam = searchParams.get('vehicle');
    const routeParam = searchParams.get('route');
    const typeParam = searchParams.get('type');

    if (vehicleParam) setFormData(p => ({ ...p, vehicleId: vehicleParam }));
    if (typeParam === 'roundTrip') setFormData(p => ({ ...p, tripType: 'Round Trip' }));
    if (routeParam === 'pune-to-mumbai') {
      setFormData(p => ({ ...p, pickup: 'Pune', drop: 'Mumbai' }));
    } else if (routeParam === 'mumbai-to-pune') {
      setFormData(p => ({ ...p, pickup: 'Mumbai', drop: 'Pune' }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
    const enquiry = addEnquiry({
      ...formData,
      vehicleName: selectedVehicle?.name || 'Not specified',
      passengers: Number(formData.passengers)
    });
    setSubmittedData(enquiry);
    setSubmitted(true);
  };

  const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);

  return (
    <>
      <SEO
        title="Book a Cab | Pune to Mumbai & Mumbai to Pune"
        description="Book your Pune to Mumbai or Mumbai to Pune cab online. Instant confirmation, transparent pricing, and professional drivers."
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
        .booking-section { padding: 4rem 0; }
        .booking-grid { display: grid; grid-template-columns: 1fr 380px; gap: 2.5rem; align-items: start; }
        .booking-form {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 2rem;
        }
        .booking-form h3 { font-size: 1.2rem; margin-bottom: 0.35rem; }
        .booking-form .sub { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .booking-sidebar {
          display: flex; flex-direction: column; gap: 1.25rem;
          position: sticky; top: 90px;
        }
        .sidebar-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 1.75rem;
        }
        .sidebar-card h4 {
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 1rem;
        }
        .sidebar-item {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.6rem 0; border-bottom: 1px solid var(--border);
          font-size: 0.88rem;
        }
        .sidebar-item:last-child { border-bottom: none; }
        .sidebar-item .label { color: var(--text-muted); }
        .sidebar-item .val { font-weight: 600; }
        .contact-info-item {
          padding: 0.6rem 0; font-size: 0.88rem; color: var(--text-muted);
        }
        .contact-info-item a { color: var(--text-main); font-weight: 600; text-decoration: none; }
        .contact-info-item a:hover { text-decoration: underline; }
        .success-card {
          background: var(--white); border: 1.5px solid #bbf7d0;
          border-radius: var(--radius-md); padding: 2.5rem; text-align: center;
          max-width: 560px; margin: 0 auto;
        }
        .success-card .icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .success-card h2 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .success-card p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem; }
        .success-details {
          background: var(--cream); border: 1.5px solid var(--border);
          border-radius: var(--radius-sm); padding: 1.25rem;
          text-align: left; margin-bottom: 1.5rem;
        }
        .success-row {
          display: flex; justify-content: space-between;
          padding: 0.4rem 0; font-size: 0.85rem;
        }
        .success-row .label { color: var(--text-muted); }
        .success-row .val { font-weight: 600; }
        @media (max-width: 900px) {
          .booking-grid { grid-template-columns: 1fr; }
          .booking-sidebar { position: static; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Book a Ride</div>
          <h1>Contact & <em>Booking</em></h1>
          <p>Fill in your travel details and we'll confirm your booking within minutes. No advance payment required.</p>
        </div>
      </section>

      <section className="booking-section">
        <div className="container">
          {submitted ? (
            <div className="success-card" id="booking-success">
              <div className="icon">✅</div>
              <h2>Booking Request Received!</h2>
              <p>We've received your booking request. Our team will call you within 15 minutes to confirm the cab and driver details.</p>
              {submittedData && (
                <div className="success-details">
                  <div className="success-row"><span className="label">Booking ID</span><span className="val">{submittedData.id}</span></div>
                  <div className="success-row"><span className="label">Name</span><span className="val">{submittedData.name}</span></div>
                  <div className="success-row"><span className="label">Route</span><span className="val">{submittedData.pickup} → {submittedData.drop}</span></div>
                  <div className="success-row"><span className="label">Date</span><span className="val">{submittedData.travelDate}</span></div>
                  <div className="success-row"><span className="label">Vehicle</span><span className="val">{submittedData.vehicleName}</span></div>
                  <div className="success-row"><span className="label">Trip Type</span><span className="val">{submittedData.tripType}</span></div>
                </div>
              )}
              <button className="btn btn-primary" onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', pickup: '', drop: '', travelDate: '', travelTime: '', tripType: 'One Way', vehicleId: activeVehicles[0]?.id || 'veh-1', passengers: 1, message: '' }); }}>
                Book Another Ride
              </button>
            </div>
          ) : (
            <div className="booking-grid">
              <div className="booking-form" id="booking-form">
                <h3>Enter Travel Details</h3>
                <p className="sub">All fields marked with * are required</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" id="form-name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input className="form-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" id="form-phone" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" id="form-email" />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Pickup Location *</label>
                      <input className="form-input" type="text" name="pickup" value={formData.pickup} onChange={handleChange} required placeholder="e.g. Hinjewadi, Pune" id="form-pickup" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Drop Location *</label>
                      <input className="form-input" type="text" name="drop" value={formData.drop} onChange={handleChange} required placeholder="e.g. Mumbai Airport T2" id="form-drop" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Travel Date *</label>
                      <input className="form-input" type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} required id="form-date" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pickup Time *</label>
                      <input className="form-input" type="time" name="travelTime" value={formData.travelTime} onChange={handleChange} required id="form-time" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Trip Type</label>
                      <select className="form-select" name="tripType" value={formData.tripType} onChange={handleChange} id="form-trip-type">
                        <option>One Way</option>
                        <option>Round Trip</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Vehicle</label>
                      <select className="form-select" name="vehicleId" value={formData.vehicleId} onChange={handleChange} id="form-vehicle">
                        {activeVehicles.map(v => (
                          <option key={v.id} value={v.id}>{v.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Passengers</label>
                      <select className="form-select" name="passengers" value={formData.passengers} onChange={handleChange} id="form-passengers">
                        {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Additional Notes</label>
                    <textarea className="form-textarea" name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Any special requests..." id="form-message" style={{ resize: 'vertical' }} />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} id="form-submit-btn">
                    Submit Booking Request
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </form>
              </div>

              <div className="booking-sidebar">
                {selectedVehicle && (
                  <div className="sidebar-card" id="selected-vehicle-card">
                    <h4>Selected Vehicle</h4>
                    <img src={selectedVehicle.image} alt={selectedVehicle.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }} />
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem' }}>{selectedVehicle.name}</div>
                    <div className="sidebar-item"><span className="label">Seating</span><span className="val">{selectedVehicle.seating}</span></div>
                    <div className="sidebar-item"><span className="label">Luggage</span><span className="val">{selectedVehicle.luggage}</span></div>
                    <div className="sidebar-item"><span className="label">One Way</span><span className="val">₹{selectedVehicle.puneToMumbaiOneWay.toLocaleString('en-IN')}</span></div>
                    <div className="sidebar-item"><span className="label">Round Trip</span><span className="val">₹{selectedVehicle.puneToMumbaiRoundTrip.toLocaleString('en-IN')}</span></div>
                  </div>
                )}

                <div className="sidebar-card">
                  <h4>Contact Info</h4>
                  <div className="contact-info-item">📞 <a href="tel:+919000000000">+91 90000 00000</a></div>
                  <div className="contact-info-item">💬 <a href="https://wa.me/919000000000" target="_blank" rel="noopener noreferrer">WhatsApp Chat</a></div>
                  <div className="contact-info-item">📧 <a href="mailto:bookings@punemumbaicab.com">bookings@punemumbaicab.com</a></div>
                </div>

                <div className="sidebar-card">
                  <h4>Why Book With Us</h4>
                  <div className="sidebar-item"><span className="label">✓ No Advance Payment</span></div>
                  <div className="sidebar-item"><span className="label">✓ Free Cancellation</span></div>
                  <div className="sidebar-item"><span className="label">✓ Instant Confirmation</span></div>
                  <div className="sidebar-item"><span className="label">✓ GPS-Tracked Rides</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ContactBooking;
