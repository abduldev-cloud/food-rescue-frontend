import React from "react";
import { Dashboard, People, Restaurant, Assessment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setPage, onLogout }) => {
  const items = [
    { name: "Overview", icon: <Dashboard />, key: "overview" },
    { name: "Donors", icon: <People />, key: "donors" },
    { name: "NGOs", icon: <Restaurant />, key: "ngos" },
    { name: "Donations", icon: <Assessment />, key: "donations" },
  ];
  const navigate = useNavigate();

  const handleBack = () => {
    
     navigate(-1);
  };

  return (
    <div
      style={{
        width: "220px",
        background: "#f6ad55",
        color: "white",
        height: "100vh",
        padding: "20px",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* TOP MENU */}
      <div>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>🍽️ Admin</h2>
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => setPage(item.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: "15px 0",
              cursor: "pointer",
            }}
          >
            {item.icon} <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* LOGOUT BUTTON */}
      <div
        onClick={onLogout}
        style={{
          marginTop: "20px",
          padding: "12px",
          // background: "#00000020",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        <button className="back-btn" onClick={handleBack}>Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
