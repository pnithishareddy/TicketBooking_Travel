import React from "react";
import {
  MapPin,
  Plane,
  Users,
  CalendarCheck,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import StatCard from "../components/StatCard";

function Dashboard({
  trips = [],
  customers = [],
  bookings = [],
  destinations = [],
  setActivePage,
}) {
  // -----------------------------
  // TOTAL REVENUE
  // -----------------------------
  const revenue = bookings
    .filter((booking) => booking.paymentStatus === "Paid")
    .reduce((sum, booking) => sum + Number(booking.amount || 0), 0);

  // -----------------------------
  // MONTHLY REVENUE DATA
  // -----------------------------
  const monthlyData = [
    { month: "Jan", revenue: 12000, bookings: 18 },
    { month: "Feb", revenue: 16500, bookings: 24 },
    { month: "Mar", revenue: 14200, bookings: 21 },
    { month: "Apr", revenue: 21500, bookings: 31 },
    { month: "May", revenue: 25800, bookings: 38 },
    { month: "Jun", revenue: 29400, bookings: 45 },
    { month: "Jul", revenue: 32600, bookings: 49 },
    { month: "Aug", revenue: 37100, bookings: 55 },
    { month: "Sep", revenue: 41900, bookings: 62 },
    { month: "Oct", revenue: 46200, bookings: 68 },
  ];

  // -----------------------------
  // BOOKING STATUS
  // IMPORTANT:
  // data.jsx uses "status"
  // -----------------------------
  const bookingStatus = [
    {
      name: "Confirmed",
      value: bookings.filter(
        (booking) => booking.status === "Confirmed"
      ).length,
    },
    {
      name: "Pending",
      value: bookings.filter(
        (booking) => booking.status === "Pending"
      ).length,
    },
    {
      name: "Cancelled",
      value: bookings.filter(
        (booking) => booking.status === "Cancelled"
      ).length,
    },
  ];

  // -----------------------------
  // POPULAR DESTINATIONS
  // -----------------------------
  const popularDestinations = [
    { name: "Paris", bookings: 48 },
    { name: "Dubai", bookings: 42 },
    { name: "Bali", bookings: 36 },
    { name: "Maldives", bookings: 31 },
    { name: "Tokyo", bookings: 24 },
  ];

  // -----------------------------
  // CUSTOMER INITIALS
  // -----------------------------
  const getInitials = (name) => {
    if (!name) return "??";

    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // -----------------------------
  // CURRENCY FORMAT
  // -----------------------------
  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  return (
    <div className="page">

      {/* =====================================
          PAGE HEADER
      ====================================== */}
      <div className="page-heading">
        <div>
          <h1>Good morning</h1>

          <p>
            Here's what's happening with your travel business today.
          </p>
        </div>

        <button
          className="btn primary"
          onClick={() => setActivePage("Trips")}
        >
          + Create Trip
        </button>
      </div>

      {/* =====================================
          STAT CARDS
      ====================================== */}
      <div className="stats-grid">

        <StatCard
          title="Total Revenue"
          value={formatCurrency(revenue)}
          change="12.5%"
          positive
          icon={<DollarSign size={22} />}
        />

        <StatCard
          title="Total Bookings"
          value={bookings.length}
          change="8.2%"
          positive
          icon={<CalendarCheck size={22} />}
        />

        <StatCard
          title="Active Trips"
          value={trips.length}
          change="5.4%"
          positive
          icon={<Plane size={22} />}
        />

        <StatCard
          title="Customers"
          value={customers.length}
          change="10.1%"
          positive
          icon={<Users size={22} />}
        />

      </div>

      {/* =====================================
          REVENUE + BOOKING STATUS
      ====================================== */}
      <div className="dashboard-grid">

        {/* REVENUE */}
        <div className="panel revenue-panel">

          <div className="panel-heading">

            <div>
              <h2>Revenue Overview</h2>
              <p>Monthly revenue performance</p>
            </div>

            <select defaultValue="Last 10 Months">
              <option>Last 10 Months</option>
              <option>This Year</option>
            </select>

          </div>

          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart data={monthlyData}>

                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#6366f1"
                      stopOpacity={0.4}
                    />

                    <stop
                      offset="100%"
                      stopColor="#6366f1"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip
                  formatter={(value) => [
                    formatCurrency(value),
                    "Revenue",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  fill="url(#revenueGradient)"
                  strokeWidth={3}
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* BOOKING STATUS */}
        <div className="panel booking-status-panel">

          <div className="panel-heading">

            <div>
              <h2>Booking Status</h2>
              <p>Current booking distribution</p>
            </div>

          </div>

          <div className="pie-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={bookingStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                >
                  <Cell fill="#6366f1" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ef4444" />
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>

          <div className="legend">

            <span>
              <i className="dot purple"></i>
              Confirmed
            </span>

            <span>
              <i className="dot orange"></i>
              Pending
            </span>

            <span>
              <i className="dot red"></i>
              Cancelled
            </span>

          </div>

        </div>

      </div>

      {/* =====================================
          DESTINATIONS + RECENT BOOKINGS
      ====================================== */}
      <div className="dashboard-grid">

        {/* POPULAR DESTINATIONS */}
        <div className="panel">

          <div className="panel-heading">

            <div>
              <h2>Popular Destinations</h2>
              <p>Most booked destinations</p>
            </div>

            <button
              className="text-button"
              onClick={() =>
                setActivePage("Destinations")
              }
            >
              View all
            </button>

          </div>

          <div className="bar-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={popularDestinations}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="bookings"
                  fill="#6366f1"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* RECENT BOOKINGS */}
        <div className="panel">

          <div className="panel-heading">

            <div>
              <h2>Recent Bookings</h2>
              <p>Latest customer bookings</p>
            </div>

            <button
              className="text-button"
              onClick={() =>
                setActivePage("Bookings")
              }
            >
              View all
            </button>

          </div>

          <div className="recent-list">

            {bookings.length === 0 ? (

              <div className="empty-state small">
                <h3>No bookings available</h3>
                <p>New bookings will appear here.</p>
              </div>

            ) : (

              bookings.slice(0, 5).map((booking) => {

                // IMPORTANT:
                // data.jsx uses customerName and tripName
                const customerName =
                  booking.customerName || "Unknown Customer";

                const tripName =
                  booking.tripName ||
                  booking.destination ||
                  "Unknown Trip";

                const paymentStatus =
                  booking.paymentStatus || "Pending";

                return (
                  <div
                    className="recent-item"
                    key={booking.id}
                  >

                    {/* AVATAR */}
                    <div className="recent-avatar">
                      {getInitials(customerName)}
                    </div>

                    {/* CUSTOMER INFO */}
                    <div className="recent-info">

                      <strong>
                        {customerName}
                      </strong>

                      <span>
                        {tripName}
                      </span>

                    </div>

                    {/* PRICE + PAYMENT */}
                    <div className="recent-price">

                      <strong>
                        {formatCurrency(
                          booking.amount
                        )}
                      </strong>

                      <span
                        className={`status ${paymentStatus
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {paymentStatus}
                      </span>

                    </div>

                  </div>
                );
              })
            )}

          </div>

        </div>

      </div>

      {/* =====================================
          QUICK ACTIONS
      ====================================== */}
      <div className="quick-actions">

        <div
          className="quick-card"
          onClick={() =>
            setActivePage("Trips")
          }
        >
          <Plane size={25} />

          <strong>
            Manage Trips
          </strong>

          <span>
            {trips.length} trips available
          </span>
        </div>

        <div
          className="quick-card"
          onClick={() =>
            setActivePage("Destinations")
          }
        >
          <MapPin size={25} />

          <strong>
            Destinations
          </strong>

          <span>
            {destinations.length} destinations
          </span>
        </div>

        <div
          className="quick-card"
          onClick={() =>
            setActivePage("Customers")
          }
        >
          <Users size={25} />

          <strong>
            Customers
          </strong>

          <span>
            {customers.length} registered
          </span>
        </div>

        <div
          className="quick-card"
          onClick={() =>
            setActivePage("Bookings")
          }
        >
          <TrendingUp size={25} />

          <strong>
            Bookings
          </strong>

          <span>
            {bookings.length} total bookings
          </span>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;