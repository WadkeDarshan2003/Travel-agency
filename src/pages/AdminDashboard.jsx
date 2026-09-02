import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';

const AdminDashboard = () => {
  const { vehicles, enquiries, isAdmin, logout, updateVehiclePrice, updateEnquiryStatus, toggleVehicleStatus } = useCMS();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('enquiries');

  useEffect(() => {
    if (!isAdmin) navigate('/admin/login');
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const tabs = [
    { id: 'enquiries', label: 'Enquiries', count: enquiries.filter(e => e.status === 'New').length },
    { id: 'vehicles', label: 'Vehicles' },
  ];

  const statusColors = {
    'New': { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
    'Contacted': { bg: '#fefce8', color: '#a16207', border: '#fde68a' },
    'Confirmed': { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    'Completed': { bg: '#f0fdf4', color: '#15803d', border: '#86efac' },
    'Cancelled': { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' },
  };

  return (
    <>
      <style>{`
        .admin-page { padding: 2rem 0 4rem; min-height: calc(100vh - 136px); }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .admin-header h1 { font-size: 1.5rem; font-weight: 700; }
        .admin-tabs { display: flex; gap: 0.25rem; margin-bottom: 2rem; border-bottom: 1.5px solid var(--border); }
        .admin-tab {
          padding: 0.75rem 1.25rem; font-size: 0.85rem; font-weight: 600;
          color: var(--text-muted); cursor: pointer; border: none; background: none;
          border-bottom: 2px solid transparent; transition: all 0.2s ease;
          display: flex; align-items: center; gap: 0.4rem;
        }
        .admin-tab.active { color: var(--text-main); border-bottom-color: var(--black); }
        .admin-tab .badge {
          background: var(--black); color: var(--white); font-size: 0.65rem;
          padding: 0.1rem 0.4rem; border-radius: 99px; font-weight: 700;
        }
        .enq-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 1rem;
        }
        .enq-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem; }
        .enq-header h3 { font-size: 1.05rem; }
        .enq-status {
          padding: 0.25rem 0.65rem; border-radius: 99px; font-size: 0.7rem;
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
          border: 1px solid;
        }
        .enq-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 1rem; }
        .enq-field .label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); font-weight: 600; }
        .enq-field .val { font-size: 0.88rem; font-weight: 500; margin-top: 0.15rem; }
        .enq-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; border-top: 1px solid var(--border); padding-top: 1rem; }

        .veh-table { width: 100%; border-collapse: collapse; background: var(--white); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
        .veh-table th { background: var(--cream); padding: 0.85rem 1rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); font-weight: 700; text-align: left; border-bottom: 1.5px solid var(--border); }
        .veh-table td { padding: 0.85rem 1rem; border-bottom: 1px solid var(--border); font-size: 0.85rem; vertical-align: middle; }
        .veh-table tr:last-child td { border-bottom: none; }
        .veh-table tbody tr:hover { background: var(--cream); }
        .price-input {
          width: 90px; padding: 0.35rem 0.5rem; border: 1.5px solid var(--border);
          border-radius: var(--radius-sm); font-size: 0.85rem; text-align: right;
          background: var(--white);
        }
        .price-input:focus { border-color: var(--black); outline: none; }
        .status-badge-active { color: #16a34a; font-weight: 600; }
        .status-badge-inactive { color: #b91c1c; font-weight: 600; }

        @media (max-width: 768px) {
          .enq-grid { grid-template-columns: 1fr 1fr; }
          .veh-table { font-size: 0.78rem; }
          .veh-table th, .veh-table td { padding: 0.6rem 0.5rem; }
        }
      `}</style>

      <div className="admin-page">
        <div className="container">
          <div className="admin-header">
            <h1>Admin Dashboard</h1>
            <button className="btn btn-ghost" onClick={() => { logout(); navigate('/'); }} id="admin-logout-btn">
              Sign Out
            </button>
          </div>

          <div className="admin-tabs">
            {tabs.map(tab => (
              <button key={tab.id} className={`admin-tab${activeTab === tab.id ? ' active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
                {tab.count > 0 && <span className="badge">{tab.count}</span>}
              </button>
            ))}
          </div>

          {/* Enquiries Tab */}
          {activeTab === 'enquiries' && (
            <div id="admin-enquiries">
              {enquiries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No enquiries yet</div>
              ) : (
                enquiries.map(enq => {
                  const sc = statusColors[enq.status] || statusColors['New'];
                  return (
                    <div key={enq.id} className="enq-card">
                      <div className="enq-header">
                        <h3>{enq.name}</h3>
                        <span className="enq-status" style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}>{enq.status}</span>
                      </div>
                      <div className="enq-grid">
                        <div className="enq-field"><div className="label">Phone</div><div className="val">{enq.phone}</div></div>
                        <div className="enq-field"><div className="label">Route</div><div className="val">{enq.pickup} → {enq.drop}</div></div>
                        <div className="enq-field"><div className="label">Date & Time</div><div className="val">{enq.travelDate} {enq.travelTime}</div></div>
                        <div className="enq-field"><div className="label">Vehicle</div><div className="val">{enq.vehicleName}</div></div>
                        <div className="enq-field"><div className="label">Trip</div><div className="val">{enq.tripType}</div></div>
                        <div className="enq-field"><div className="label">Passengers</div><div className="val">{enq.passengers}</div></div>
                      </div>
                      {enq.message && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>💬 {enq.message}</div>}
                      <div className="enq-actions">
                        {['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'].map(s => (
                          <button
                            key={s}
                            className={`btn btn-sm ${enq.status === s ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => updateEnquiryStatus(enq.id, s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div id="admin-vehicles" style={{ overflowX: 'auto' }}>
              <table className="veh-table">
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Status</th>
                    <th>P→M One Way</th>
                    <th>P→M Round</th>
                    <th>M→P One Way</th>
                    <th>M→P Round</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map(v => (
                    <tr key={v.id}>
                      <td><strong>{v.name}</strong></td>
                      <td>
                        <span className={v.status === 'Active' ? 'status-badge-active' : 'status-badge-inactive'}>{v.status}</span>
                      </td>
                      <td>
                        <input
                          className="price-input"
                          type="number"
                          value={v.puneToMumbaiOneWay}
                          onChange={e => updateVehiclePrice(v.id, 'puneToMumbaiOneWay', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="price-input"
                          type="number"
                          value={v.puneToMumbaiRoundTrip}
                          onChange={e => updateVehiclePrice(v.id, 'puneToMumbaiRoundTrip', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="price-input"
                          type="number"
                          value={v.mumbaiToPuneOneWay}
                          onChange={e => updateVehiclePrice(v.id, 'mumbaiToPuneOneWay', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="price-input"
                          type="number"
                          value={v.mumbaiToPuneRoundTrip}
                          onChange={e => updateVehiclePrice(v.id, 'mumbaiToPuneRoundTrip', e.target.value)}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => toggleVehicleStatus(v.id)}
                        >
                          {v.status === 'Active' ? 'Disable' : 'Enable'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
