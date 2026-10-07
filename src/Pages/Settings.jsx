
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    whatsappNotifications: false,
    pushNotifications: true,
    appearance: "system",
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("travel_dashboard_settings");

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Unable to load saved settings", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "travel_dashboard_settings",
      JSON.stringify(settings)
    );

    applyTheme(settings.appearance);
  }, [settings]);

  const applyTheme = (mode) => {
    const root = document.documentElement;

    if (mode === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (mode === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      root.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
      );
    }
  };

  const handleToggle = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleAppearance = (mode) => {
    setSettings((prev) => ({
      ...prev,
      appearance: mode,
    }));
  };

  const NotificationToggle = ({ name, value }) => {
    return (
      <div className="notification-toggle">
        <button
          type="button"
          className={`toggle-switch ${value ? "active" : ""}`}
          onClick={() => handleToggle(name)}
          aria-label={`Toggle ${name}`}
          aria-pressed={value}
        >
          <span></span>
        </button>

        <span className={`toggle-label ${value ? "on" : "off"}`}>
          {value ? "ON" : "OFF"}
        </span>
      </div>
    );
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <div className="page-subtitle">PREFERENCES</div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">
            Manage your notifications and dashboard appearance preferences.
          </p>
        </div>
      </div>

      <section className="settings-section">
        <div className="settings-section-header">
          <div className="setting-icon notification-icon">
            🔔
          </div>

          <div>
            <h2 className="settings-section-title">
              Notifications
            </h2>

            <p className="settings-section-description">
              Choose how you want to receive travel and booking updates.
            </p>
          </div>
        </div>

        <div className="setting-list">
          <div className="setting-row">
            <div className="setting-info">
              <div className="setting-icon email-notification-icon">
                ✉️
              </div>

              <div className="setting-text">
                <h3 className="setting-title">
                  Email Notifications
                </h3>

                <p className="setting-description">
                  Receive booking confirmations, cancellations and travel
                  updates by email.
                </p>
              </div>
            </div>

            <NotificationToggle
              name="emailNotifications"
              value={settings.emailNotifications}
            />
          </div>

          <div className="setting-row">
            <div className="setting-info">
              <div className="setting-icon whatsapp-notification-icon">
                💬
              </div>

              <div className="setting-text">
                <h3 className="setting-title">
                  WhatsApp Notifications
                </h3>

                <p className="setting-description">
                  Get booking alerts, ticket updates and important travel
                  reminders on WhatsApp.
                </p>
              </div>
            </div>

            <NotificationToggle
              name="whatsappNotifications"
              value={settings.whatsappNotifications}
            />
          </div>

          <div className="setting-row">
            <div className="setting-info">
              <div className="setting-icon push-notification-icon">
                🔔
              </div>

              <div className="setting-text">
                <h3 className="setting-title">
                  Push Notifications
                </h3>

                <p className="setting-description">
                  Receive instant notifications directly in your browser.
                </p>
              </div>
            </div>

            <NotificationToggle
              name="pushNotifications"
              value={settings.pushNotifications}
            />
          </div>
        </div>
      </section>

      <section className="settings-section">
        <div className="settings-section-header">
          <div className="setting-icon appearance-icon">
            🎨
          </div>

          <div>
            <h2 className="settings-section-title">
              Appearance
            </h2>

            <p className="settings-section-description">
              Customize how the Travel Dashboard looks on your device.
            </p>
          </div>
        </div>

        <div className="appearance-options">
          <button
            type="button"
            className={`appearance-option ${
              settings.appearance === "light"
                ? "selected"
                : ""
            }`}
            onClick={() => handleAppearance("light")}
          >
            <div className="appearance-preview light-preview">
              <div className="preview-top"></div>

              <div className="preview-body">
                <div className="preview-sidebar"></div>

                <div className="preview-content">
                  <div className="preview-line"></div>
                  <div className="preview-line short"></div>

                  <div className="preview-cards">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="appearance-label">
              <div>
                <strong>Light</strong>
                <span>Always use light mode</span>
              </div>

              <span
                className={`radio-circle ${
                  settings.appearance === "light"
                    ? "checked"
                    : ""
                }`}
              >
                {settings.appearance === "light" ? "✓" : ""}
              </span>
            </div>
          </button>

          <button
            type="button"
            className={`appearance-option ${
              settings.appearance === "dark"
                ? "selected"
                : ""
            }`}
            onClick={() => handleAppearance("dark")}
          >
            <div className="appearance-preview dark-preview">
              <div className="preview-top"></div>

              <div className="preview-body">
                <div className="preview-sidebar"></div>

                <div className="preview-content">
                  <div className="preview-line"></div>
                  <div className="preview-line short"></div>

                  <div className="preview-cards">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="appearance-label">
              <div>
                <strong>Dark</strong>
                <span>Always use dark mode</span>
              </div>

              <span
                className={`radio-circle ${
                  settings.appearance === "dark"
                    ? "checked"
                    : ""
                }`}
              >
                {settings.appearance === "dark" ? "✓" : ""}
              </span>
            </div>
          </button>

          <button
            type="button"
            className={`appearance-option ${
              settings.appearance === "system"
                ? "selected"
                : ""
            }`}
            onClick={() => handleAppearance("system")}
          >
            <div className="appearance-preview system-preview">
              <div className="system-half light-half">
                <div className="system-top"></div>
                <div className="system-content"></div>
              </div>

              <div className="system-half dark-half">
                <div className="system-top"></div>
                <div className="system-content"></div>
              </div>
            </div>

            <div className="appearance-label">
              <div>
                <strong>System Default</strong>
                <span>Follow your device settings</span>
              </div>

              <span
                className={`radio-circle ${
                  settings.appearance === "system"
                    ? "checked"
                    : ""
                }`}
              >
                {settings.appearance === "system" ? "✓" : ""}
              </span>
            </div>
          </button>
        </div>
      </section>

      <section className="settings-section">
        <div className="settings-section-header">
          <div className="setting-icon account-icon">
            ⚙️
          </div>

          <div>
            <h2 className="settings-section-title">
              Preferences
            </h2>

            <p className="settings-section-description">
              Your preferences are automatically saved on this device.
            </p>
          </div>
        </div>

        <div className="settings-info-box">
          <span>✓</span>

          <div>
            <strong>Settings saved automatically</strong>

            <p>
              Your notification and appearance preferences are stored
              locally and will remain active when you return to the
              dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
