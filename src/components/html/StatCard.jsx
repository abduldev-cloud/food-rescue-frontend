import React from "react";
import "../css/StatCard.css";

const StatCard = ({ title, value, icon }) => (
  <div className="stat-card">
    <div className="stat-title">
      {icon} {title}
    </div>
    <div className="stat-value">{value}</div>
  </div>
);

export default StatCard;
