
// =====================================================
// TRAVELPRO DASHBOARD - ALL APPLICATION DATA
// =====================================================

// =====================================================
// DESTINATIONS
// =====================================================

export const initialDestinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
    description:
      "Explore the city of lights, iconic landmarks, art and French cuisine.",
    price: 1200,
    status: "Active",
  },

  {
    id: 2,
    name: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    description:
      "Experience luxury resorts, desert adventures and modern architecture.",
    price: 950,
    status: "Active",
  },

  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    description:
      "Relax on tropical beaches and discover temples, waterfalls and local culture.",
    price: 850,
    status: "Active",
  },

  {
    id: 4,
    name: "London",
    country: "United Kingdom",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80",
    description:
      "Discover historic landmarks, royal palaces and world-famous attractions.",
    price: 1100,
    status: "Active",
  },

  {
    id: 5,
    name: "Tokyo",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80",
    description:
      "Experience Japanese culture, technology, food and vibrant city life.",
    price: 1350,
    status: "Active",
  },

  {
    id: 6,
    name: "Maldives",
    country: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
    description:
      "Enjoy crystal-clear water, private beaches and beautiful island resorts.",
    price: 1500,
    status: "Active",
  },
];


// =====================================================
// TRIPS
// =====================================================

export const initialTrips = [
  {
    id: 1,
    title: "Paris Explorer",
    destination: "Paris",
    country: "France",
    duration: "5 Days / 4 Nights",
    price: 1200,

    startDate: "2026-11-10",
    endDate: "2026-11-14",

    capacity: 30,
    booked: 18,

    category: "Culture",
    status: "Upcoming",

    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 2,
    title: "Dubai Luxury Escape",
    destination: "Dubai",
    country: "United Arab Emirates",
    duration: "4 Days / 3 Nights",
    price: 950,

    startDate: "2026-11-18",
    endDate: "2026-11-21",

    capacity: 25,
    booked: 14,

    category: "Luxury",
    status: "Upcoming",

    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 3,
    title: "Bali Adventure",
    destination: "Bali",
    country: "Indonesia",
    duration: "6 Days / 5 Nights",
    price: 850,

    startDate: "2026-12-02",
    endDate: "2026-12-07",

    capacity: 20,
    booked: 11,

    category: "Adventure",
    status: "Upcoming",

    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 4,
    title: "London Heritage Tour",
    destination: "London",
    country: "United Kingdom",
    duration: "5 Days / 4 Nights",
    price: 1100,

    startDate: "2026-12-15",
    endDate: "2026-12-19",

    capacity: 28,
    booked: 21,

    category: "Culture",
    status: "Upcoming",

    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 5,
    title: "Tokyo Discovery",
    destination: "Tokyo",
    country: "Japan",
    duration: "7 Days / 6 Nights",
    price: 1350,

    startDate: "2027-01-08",
    endDate: "2027-01-14",

    capacity: 25,
    booked: 16,

    category: "Culture",
    status: "Upcoming",

    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 6,
    title: "Maldives Beach Escape",
    destination: "Maldives",
    country: "Maldives",
    duration: "5 Days / 4 Nights",
    price: 1500,

    startDate: "2027-01-20",
    endDate: "2027-01-24",

    capacity: 20,
    booked: 9,

    category: "Beach",
    status: "Upcoming",

    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
  },
];


// =====================================================
// CUSTOMERS
// =====================================================

export const initialCustomers = [
  {
    id: 1,
    name: "Abhinav Kumar",
    initials: "AK",
    email: "abhinav.kumar@example.com",
    phone: "+91 98765 43210",
    country: "India",
    city: "Hyderabad",
    status: "Active",
    bookings: 4,
    totalSpent: 485000,
  },

  {
    id: 2,
    name: "Chandrika Devi",
    initials: "CD",
    email: "chandrika.devi@example.com",
    phone: "+91 91234 56789",
    country: "India",
    city: "Bengaluru",
    status: "Active",
    bookings: 3,
    totalSpent: 362500,
  },

  {
    id: 3,
    name: "Girish Kumar",
    initials: "GK",
    email: "girish.kumar@example.com",
    phone: "+91 99887 66554",
    country: "India",
    city: "Chennai",
    status: "Active",
    bookings: 2,
    totalSpent: 248000,
  },

  {
    id: 4,
    name: "Jyothi Kumari",
    initials: "JK",
    email: "jyothi.kumari@example.com",
    phone: "+91 90123 45678",
    country: "India",
    city: "Vijayawada",
    status: "Active",
    bookings: 5,
    totalSpent: 675000,
  },

  {
    id: 5,
    name: "Manoj Naidu",
    initials: "MN",
    email: "manoj.naidu@example.com",
    phone: "+91 87654 32109",
    country: "India",
    city: "Visakhapatnam",
    status: "Active",
    bookings: 1,
    totalSpent: 125000,
  },

  {
    id: 6,
    name: "Priya Reddy",
    initials: "PR",
    email: "priya.reddy@example.com",
    phone: "+91 93456 78901",
    country: "India",
    city: "Hyderabad",
    status: "Active",
    bookings: 6,
    totalSpent: 825000,
  },

  {
    id: 7,
    name: "Rahul Sharma",
    initials: "RS",
    email: "rahul.sharma@example.com",
    phone: "+91 96543 21098",
    country: "India",
    city: "Mumbai",
    status: "Active",
    bookings: 3,
    totalSpent: 310000,
  },

  {
    id: 8,
    name: "Tejaswini Varma",
    initials: "TV",
    email: "tejaswini.varma@example.com",
    phone: "+91 88990 11223",
    country: "India",
    city: "Kurnool",
    status: "Active",
    bookings: 2,
    totalSpent: 215000,
  },
];


// =====================================================
// BOOKINGS
// =====================================================

export const initialBookings = [
  {
    id: 1,

    customerId: 1,
    customerName: "Abhinav Kumar",
    customerEmail:
      "abhinav.kumar@example.com",

    tripId: 1,
    tripName: "Paris Explorer",

    destination: "Paris",

    bookingDate: "2026-10-01",
    travelDate: "2026-11-10",

    amount: 1200,

    status: "Confirmed",
    paymentStatus: "Paid",
  },

  {
    id: 2,

    customerId: 2,
    customerName: "Chandrika Devi",
    customerEmail:
      "chandrika.devi@example.com",

    tripId: 2,
    tripName: "Dubai Luxury Escape",

    destination: "Dubai",

    bookingDate: "2026-10-02",
    travelDate: "2026-11-18",

    amount: 950,

    status: "Confirmed",
    paymentStatus: "Paid",
  },

  {
    id: 3,

    customerId: 3,
    customerName: "Girish Kumar",
    customerEmail:
      "girish.kumar@example.com",

    tripId: 3,
    tripName: "Bali Adventure",

    destination: "Bali",

    bookingDate: "2026-10-03",
    travelDate: "2026-12-02",

    amount: 850,

    status: "Pending",
    paymentStatus: "Pending",
  },

  {
    id: 4,

    customerId: 4,
    customerName: "Jyothi Kumari",
    customerEmail:
      "jyothi.kumari@example.com",

    tripId: 4,
    tripName: "London Heritage Tour",

    destination: "London",

    bookingDate: "2026-10-04",
    travelDate: "2026-12-15",

    amount: 1100,

    status: "Confirmed",
    paymentStatus: "Paid",
  },

  {
    id: 5,

    customerId: 5,
    customerName: "Manoj Naidu",
    customerEmail:
      "manoj.naidu@example.com",

    tripId: 5,
    tripName: "Tokyo Discovery",

    destination: "Tokyo",

    bookingDate: "2026-10-05",
    travelDate: "2027-01-08",

    amount: 1350,

    status: "Confirmed",
    paymentStatus: "Paid",
  },

  {
    id: 6,

    customerId: 6,
    customerName: "Priya Reddy",
    customerEmail:
      "priya.reddy@example.com",

    tripId: 6,
    tripName: "Maldives Beach Escape",

    destination: "Maldives",

    bookingDate: "2026-10-06",
    travelDate: "2027-01-20",

    amount: 1500,

    status: "Pending",
    paymentStatus: "Pending",
  },
];


// =====================================================
// PAYMENTS
// =====================================================

export const initialPayments = [
  {
    id: "PAY-001",
    bookingId: 1,

    customerId: 1,
    customerName: "Abhinav Kumar",

    tripId: 1,
    tripName: "Paris Explorer",

    amount: 1200,

    paymentDate: "2026-10-01",

    method: "Credit Card",

    status: "Paid",

    transactionId: "TXN-PAR-10001",
  },

  {
    id: "PAY-002",
    bookingId: 2,

    customerId: 2,
    customerName: "Chandrika Devi",

    tripId: 2,
    tripName: "Dubai Luxury Escape",

    amount: 950,

    paymentDate: "2026-10-02",

    method: "UPI",

    status: "Paid",

    transactionId: "TXN-DXB-10002",
  },

  {
    id: "PAY-003",
    bookingId: 3,

    customerId: 3,
    customerName: "Girish Kumar",

    tripId: 3,
    tripName: "Bali Adventure",

    amount: 850,

    paymentDate: "2026-10-03",

    method: "Bank Transfer",

    status: "Pending",

    transactionId: "TXN-BAL-10003",
  },

  {
    id: "PAY-004",
    bookingId: 4,

    customerId: 4,
    customerName: "Jyothi Kumari",

    tripId: 4,
    tripName: "London Heritage Tour",

    amount: 1100,

    paymentDate: "2026-10-04",

    method: "Credit Card",

    status: "Paid",

    transactionId: "TXN-LON-10004",
  },

  {
    id: "PAY-005",
    bookingId: 5,

    customerId: 5,
    customerName: "Manoj Naidu",

    tripId: 5,
    tripName: "Tokyo Discovery",

    amount: 1350,

    paymentDate: "2026-10-05",

    method: "UPI",

    status: "Paid",

    transactionId: "TXN-TKY-10005",
  },

  {
    id: "PAY-006",
    bookingId: 6,

    customerId: 6,
    customerName: "Priya Reddy",

    tripId: 6,
    tripName: "Maldives Beach Escape",

    amount: 1500,

    paymentDate: "2026-10-06",

    method: "UPI",

    status: "Pending",

    transactionId: "TXN-MDV-10006",
  },

  {
    id: "PAY-007",
    bookingId: 7,

    customerId: 7,
    customerName: "Rahul Sharma",

    tripId: 2,
    tripName: "Dubai Luxury Escape",

    amount: 950,

    paymentDate: "2026-10-06",

    method: "Credit Card",

    status: "Paid",

    transactionId: "TXN-DXB-10007",
  },

  {
    id: "PAY-008",
    bookingId: 8,

    customerId: 8,
    customerName: "Tejaswini Varma",

    tripId: 3,
    tripName: "Bali Adventure",

    amount: 850,

    paymentDate: "2026-10-07",

    method: "UPI",

    status: "Failed",

    transactionId: "TXN-BAL-10008",
  },
];


// =====================================================
// CALENDAR EVENTS
// =====================================================

export const initialCalendarEvents = [
  {
    id: 1,
    title: "Paris Explorer",
    date: "2026-11-10",
    type: "trip",
    destination: "Paris",
  },

  {
    id: 2,
    title: "Dubai Luxury Escape",
    date: "2026-11-18",
    type: "trip",
    destination: "Dubai",
  },

  {
    id: 3,
    title: "Bali Adventure",
    date: "2026-12-02",
    type: "trip",
    destination: "Bali",
  },

  {
    id: 4,
    title: "London Heritage Tour",
    date: "2026-12-15",
    type: "trip",
    destination: "London",
  },

  {
    id: 5,
    title: "Tokyo Discovery",
    date: "2027-01-08",
    type: "trip",
    destination: "Tokyo",
  },

  {
    id: 6,
    title: "Maldives Beach Escape",
    date: "2027-01-20",
    type: "trip",
    destination: "Maldives",
  },
];
