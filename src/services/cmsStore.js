const STORAGE_KEYS = {
  VEHICLES: 'pmc_vehicles_v2',
  ROUTES: 'pmc_routes_v1',
  ENQUIRIES: 'pmc_enquiries_v1',
  AUTH: 'pmc_admin_auth_v1',
};

const DEFAULT_VEHICLES = [
  {
    id: 'veh-1',
    name: 'Sedan (Dzire / Etios)',
    slug: 'sedan',
    seating: '4+1',
    luggage: '2 Bags',
    description: 'Comfortable air-conditioned sedan suitable for small families and corporate travelers.',
    puneToMumbaiOneWay: 2999,
    puneToMumbaiRoundTrip: 5499,
    mumbaiToPuneOneWay: 2999,
    mumbaiToPuneRoundTrip: 5499,
    status: 'Active',
    image: '/vehicles/sedan-dzire.png',
    features: ['Air Conditioner', 'Clean & Sanitized', '24x7 GPS Tracking', 'Professional Driver']
  },
  {
    id: 'veh-2',
    name: 'SUV (Ertiga / Carens)',
    slug: 'suv',
    seating: '6+1',
    luggage: '3 Bags',
    description: 'Spacious 6-seater SUV ideal for group outings and luggage-heavy trips.',
    puneToMumbaiOneWay: 4499,
    puneToMumbaiRoundTrip: 7999,
    mumbaiToPuneOneWay: 4499,
    mumbaiToPuneRoundTrip: 7999,
    status: 'Active',
    image: '/vehicles/suv-ertiga.png',
    features: ['Rear AC Vents', 'Ample Legroom', 'USB Charging Points', 'Music System']
  },
  {
    id: 'veh-3',
    name: 'Innova (Classic)',
    slug: 'innova',
    seating: '6+1',
    luggage: '4 Bags',
    description: 'The standard of comfort for long-distance highway travel on Pune-Mumbai Expressway.',
    puneToMumbaiOneWay: 4999,
    puneToMumbaiRoundTrip: 8999,
    mumbaiToPuneOneWay: 4999,
    mumbaiToPuneRoundTrip: 8999,
    status: 'Active',
    image: '/vehicles/innova-classic.png',
    features: ['Dual AC', 'Pushback Seats', 'Top Highway Safety', 'Experienced Chauffeur']
  },
  {
    id: 'veh-4',
    name: 'Innova Crysta',
    slug: 'crysta',
    seating: '6+1',
    luggage: '5 Bags',
    description: 'Premium luxury MUV offering supreme comfort, smooth ride quality, and leather seating.',
    puneToMumbaiOneWay: 5999,
    puneToMumbaiRoundTrip: 10999,
    mumbaiToPuneOneWay: 5999,
    mumbaiToPuneRoundTrip: 10999,
    status: 'Active',
    image: '/vehicles/innova-crysta.png',
    features: ['Premium Leather Seats', 'Ultra Smooth Ride', 'Chilled Climate Control', 'VIP Chauffeur']
  }
];

const DEFAULT_ROUTES = [
  {
    id: 'route-1',
    name: 'Pune to Mumbai Cab',
    slug: 'pune-to-mumbai-cab',
    origin: 'Pune',
    destination: 'Mumbai',
    distance: '150 km',
    travelTime: '3.5 Hours',
    startingPrice: 2999,
    description: 'Fast and reliable one-way & round-trip taxi service from Pune to Mumbai City, Dadar, Thane, Navi Mumbai, and Mumbai Airport T1/T2 via Expressway.',
    status: 'Active'
  },
  {
    id: 'route-2',
    name: 'Mumbai to Pune Cab',
    slug: 'mumbai-to-pune-cab',
    origin: 'Mumbai',
    destination: 'Pune',
    distance: '150 km',
    travelTime: '3.5 Hours',
    startingPrice: 2999,
    description: 'Doorstep pickup from Mumbai & Mumbai Airport to Hinjewadi, Wakad, Viman Nagar, Baner, Kothrud, and Pune Airport.',
    status: 'Active'
  }
];

const DEFAULT_ENQUIRIES = [
  {
    id: 'enq-101',
    name: 'Rahul Sharma',
    phone: '9823011223',
    email: 'rahul.s@example.com',
    pickup: 'Hinjewadi Phase 1, Pune',
    drop: 'Mumbai Airport Terminal 2',
    travelDate: '2026-09-15',
    travelTime: '06:00 AM',
    tripType: 'One Way',
    vehicleId: 'veh-1',
    vehicleName: 'Sedan (Dzire / Etios)',
    passengers: 2,
    message: 'Need prompt pickup for morning flight.',
    status: 'New',
    createdAt: '2026-09-02T10:15:00Z'
  },
  {
    id: 'enq-102',
    name: 'Priya Patel',
    phone: '9890123456',
    email: 'priya.p@example.com',
    pickup: 'Andheri East, Mumbai',
    drop: 'Koregaon Park, Pune',
    travelDate: '2026-09-18',
    travelTime: '02:00 PM',
    tripType: 'Round Trip',
    vehicleId: 'veh-4',
    vehicleName: 'Innova Crysta',
    passengers: 5,
    message: 'Traveling with elderly parents.',
    status: 'Contacted',
    createdAt: '2026-09-01T14:30:00Z'
  }
];

export const getStoredVehicles = () => {
  const data = localStorage.getItem(STORAGE_KEYS.VEHICLES);
  return data ? JSON.parse(data) : DEFAULT_VEHICLES;
};

export const saveVehicles = (vehicles) => {
  localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
};

export const getStoredRoutes = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ROUTES);
  return data ? JSON.parse(data) : DEFAULT_ROUTES;
};

export const saveRoutes = (routes) => {
  localStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(routes));
};

export const getStoredEnquiries = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
  return data ? JSON.parse(data) : DEFAULT_ENQUIRIES;
};

export const saveEnquiries = (enquiries) => {
  localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
};

export const getAdminAuth = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
};

export const setAdminAuth = (isAuthenticated) => {
  if (isAuthenticated) {
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
};
