import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredVehicles, saveVehicles,
  getStoredRoutes, saveRoutes,
  getStoredEnquiries, saveEnquiries,
  getAdminAuth, setAdminAuth
} from '../services/cmsStore';

export const CMSContext = createContext(null);

export const CMSProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(getStoredVehicles);
  const [routes, setRoutes] = useState(getStoredRoutes);
  const [enquiries, setEnquiries] = useState(getStoredEnquiries);
  const [isAdmin, setIsAdmin] = useState(getAdminAuth);

  useEffect(() => { saveVehicles(vehicles); }, [vehicles]);
  useEffect(() => { saveRoutes(routes); }, [routes]);
  useEffect(() => { saveEnquiries(enquiries); }, [enquiries]);

  // Vehicle Mutations
  const updateVehiclePrice = (id, field, newPrice) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === id) {
        const updated = { ...v, [field]: Number(newPrice) };
        return updated;
      }
      return v;
    }));
  };

  const updateVehicle = (updatedVeh) => {
    setVehicles(prev => prev.map(v => v.id === updatedVeh.id ? updatedVeh : v));
  };

  const addVehicle = (newVeh) => {
    const vehObj = {
      ...newVeh,
      id: `veh-${Date.now()}`,
      status: 'Active'
    };
    setVehicles(prev => [...prev, vehObj]);
  };

  const toggleVehicleStatus = (id) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === id) {
        return { ...v, status: v.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return v;
    }));
  };

  // Route Mutations
  const updateRoutePrice = (id, startingPrice) => {
    setRoutes(prev => prev.map(r => r.id === id ? { ...r, startingPrice: Number(startingPrice) } : r));
  };

  // Enquiry Mutations
  const addEnquiry = (enquiryData) => {
    const newEnq = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setEnquiries(prev => [newEnq, ...prev]);
    return newEnq;
  };

  const updateEnquiryStatus = (id, newStatus) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
  };

  // Auth
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      setAdminAuth(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials. Use admin / admin123' };
  };

  const logout = () => {
    setIsAdmin(false);
    setAdminAuth(false);
  };

  return (
    <CMSContext.Provider value={{
      vehicles,
      routes,
      enquiries,
      isAdmin,
      updateVehiclePrice,
      updateVehicle,
      addVehicle,
      toggleVehicleStatus,
      updateRoutePrice,
      addEnquiry,
      updateEnquiryStatus,
      login,
      logout
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

export default CMSContext;