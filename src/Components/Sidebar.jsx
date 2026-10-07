import React from "react";

import {
  LayoutDashboard,
  Map,
  Plane,
  Users,
  CalendarCheck,
  CreditCard,
  CalendarDays,
  BarChart3,
  User,
  Settings,
  X,
} from "lucide-react";

function Sidebar({ activePage, setActivePage, open, setOpen }) {
  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Destinations",
      icon: Map,
    },
    {
      name: "Trips",
      icon: Plane,
    },
    {
      name: "Customers",
      icon: Users,
    },
    {
      name: "Bookings",
      icon: CalendarCheck,
    },
    {
      name: "Payments",
      icon: CreditCard,
    },
    {
      name: "Calendar",
      icon: CalendarDays,
    },
    {
      name: "Analytics",
      icon: BarChart3,
    },
  ];

  const systemMenu = [
    {
      name: "Profile",
      icon: User,
    },
    {
      name: "Settings",
      icon: Settings,
    },
  ];

  const handleNavigation = (page) => {
    setActivePage(page);
    setOpen(false);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`sidebar ${
          open ? "sidebar-open" : ""
        }`}
      >
        {/* =================================
            SIDEBAR HEADER
        ================================== */}
        <div className="sidebar-header">

          <div className="logo-icon">
            ✈
          </div>

          <div className="logo-text">
            <h2>TravelPro</h2>
            <span>Travel Management</span>
          </div>

          {/* MOBILE CLOSE BUTTON */}
          <button
            type="button"
            className="close-sidebar"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>

        </div>

        {/* =================================
            NAVIGATION
        ================================== */}
        <nav className="sidebar-nav">

          {/* MAIN MENU */}
          <p className="menu-title">
            MAIN MENU
          </p>

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.name}
                className={`menu-item ${
                  activePage === item.name
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleNavigation(item.name)
                }
              >
                <Icon size={20} />

                <span>
                  {item.name}
                </span>
              </button>
            );
          })}

          {/* SYSTEM MENU */}
          <p className="menu-title settings-title">
            SYSTEM
          </p>

          {systemMenu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.name}
                className={`menu-item ${
                  activePage === item.name
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleNavigation(item.name)
                }
              >
                <Icon size={20} />

                <span>
                  {item.name}
                </span>
              </button>
            );
          })}

        </nav>

       

      </aside>
    </>
  );
}

export default Sidebar;