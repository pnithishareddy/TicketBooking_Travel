
import React, { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Toast from "./Components/Toast";

import Dashboard from "./Pages/Dashboard";
import Destinations from "./Pages/Destinations";
import Trips from "./Pages/Trips";
import Customers from "./Pages/Customers";
import Bookings from "./Pages/Bookings";
import Payments from "./Pages/Payments";
import Calendar from "./Pages/Calendar";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";

import {
  initialDestinations,
  initialTrips,
  initialCustomers,
  initialBookings,
  initialPayments,
} from "./data/data";

function App() {
  /* =========================================
     ACTIVE PAGE
  ========================================= */

  const [activePage, setActivePage] = useState("Dashboard");

  /* =========================================
     SIDEBAR
  ========================================= */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================================
     APPLICATION DATA
  ========================================= */

  const [destinations, setDestinations] = useState(
    initialDestinations
  );

  const [trips, setTrips] = useState(
    initialTrips
  );

  const [customers, setCustomers] = useState(
    initialCustomers
  );

  const [bookings, setBookings] = useState(
    initialBookings
  );

  const [payments, setPayments] = useState(
    initialPayments || []
  );

  /* =========================================
     TOAST
  ========================================= */

  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  /* =========================================
     CLOSE MOBILE SIDEBAR ON DESKTOP
  ========================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =========================================
     CLOSE SIDEBAR WHEN PAGE CHANGES
  ========================================= */

  useEffect(() => {
    if (window.innerWidth <= 900) {
      setSidebarOpen(false);
    }
  }, [activePage]);

  /* =========================================
     RENDER CURRENT PAGE
  ========================================= */

  const renderPage = () => {
    switch (activePage) {
      /* =====================================
         DASHBOARD
      ===================================== */

      case "Dashboard":
        return (
          <Dashboard
            trips={trips}
            customers={customers}
            bookings={bookings}
            destinations={destinations}
            setActivePage={setActivePage}
          />
        );

      /* =====================================
         DESTINATIONS
      ===================================== */

      case "Destinations":
        return (
          <Destinations
            destinations={destinations}
            setDestinations={setDestinations}
            showToast={showToast}
          />
        );

      /* =====================================
         TRIPS
      ===================================== */

      case "Trips":
        return (
          <Trips
            trips={trips}
            setTrips={setTrips}
            destinations={destinations}
            showToast={showToast}
          />
        );

      /* =====================================
         CUSTOMERS
      ===================================== */

      case "Customers":
        return (
          <Customers
            customers={customers}
          />
        );

      /* =====================================
         BOOKINGS
      ===================================== */

      case "Bookings":
        return (
          <Bookings
            bookings={bookings}
            setBookings={setBookings}
            trips={trips}
            showToast={showToast}
          />
        );

      /* =====================================
         PAYMENTS
      ===================================== */

      case "Payments":
        return (
          <Payments
            payments={payments}
            setPayments={setPayments}
            showToast={showToast}
            bookings={bookings}
          />
        );

      /* =====================================
         CALENDAR
      ===================================== */

      case "Calendar":
        return (
          <Calendar
            trips={trips}
            bookings={bookings}
          />
        );

      /* =====================================
         ANALYTICS
      ===================================== */

      case "Analytics":
        return (
          <Dashboard
            trips={trips}
            customers={customers}
            bookings={bookings}
            destinations={destinations}
            setActivePage={setActivePage}
          />
        );

      /* =====================================
         PROFILE
      ===================================== */

      case "Profile":
        return (
          <Profile
            showToast={showToast}
          />
        );

      /* =====================================
         SETTINGS
      ===================================== */

      case "Settings":
        return (
          <Settings
            showToast={showToast}
          />
        );

      /* =====================================
         DEFAULT
      ===================================== */

      default:
        return (
          <Dashboard
            trips={trips}
            customers={customers}
            bookings={bookings}
            destinations={destinations}
            setActivePage={setActivePage}
          />
        );
    }
  };

  /* =========================================
     MAIN APP
  ========================================= */

  return (
    <div className="app">

      {/* SIDEBAR */}

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN AREA */}

      <div className="main-area">

        {/* NAVBAR */}

        <Navbar
  onMenuClick={() => setSidebarOpen(true)}
  onProfileClick={() => setActivePage("Profile")}
        />

        {/* PAGE CONTENT */}

        <main>
          {renderPage()}
        </main>

      </div>

      {/* TOAST */}

      <Toast
        message={toast}
        onClose={() => setToast("")}
      />

    </div>
  );
}

export default App;

