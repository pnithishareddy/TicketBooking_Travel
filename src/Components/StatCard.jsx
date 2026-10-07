import React from "react";
function StatCard({ title, value, icon, change, positive = true }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <p className="stat-card-title">{title}</p>
          <h3 className="stat-card-value">{value}</h3>
        </div>

        <div className="stat-card-icon">
          {icon}
        </div>
      </div>

      {change && (
        <div className={`stat-card-change ${positive ? "positive" : "negative"}`}>
          <span>{positive ? "↑" : "↓"}</span>
          {change}
        </div>
      )}
    </div>
  );
}

export default StatCard;