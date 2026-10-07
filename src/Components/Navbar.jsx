
import React from "react";
import { Bell, Search, Menu } from "lucide-react";

function Navbar({ onMenuClick, onProfileClick }) {
  return (
    <header className="navbar">
      <div className="nav-left">
        <button
          type="button"
          className="mobile-menu"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="brand-mobile">
          TravelPro
        </div>

        <div className="global-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search anything..."
          />
        </div>
      </div>

      <div className="nav-right">
        <button
          type="button"
          className="icon-button"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div
          className="user-profile"
          onClick={onProfileClick}
          role="button"
          tabIndex={0}
          title="Open Profile"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onProfileClick();
            }
          }}
        >
          <div className="avatar">
            NR
          </div>

          <div className="user-info">
            <strong>Nithisha Reddy</strong>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
