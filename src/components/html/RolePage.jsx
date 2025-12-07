import React from "react";
import "../css/RolePage.css";
import { useNavigate } from "react-router-dom";

function Role_Page() {
  const navigate = useNavigate();

  // GET ROLE FROM LOCAL STORAGE
  const userRole = localStorage.getItem("userRole"); 
  // values will be: "donor", "ngo", or null

  const handleBack = () => navigate(-1);

  return (
    <div className="role-container">
      
      <nav className="navbar">
        <button className="back-btn" onClick={handleBack}>←</button>
        <h2 className="nav-title">SavePlate</h2>
      </nav>
      
      <div className="main-content">
        <h2 className="title">Want To Share Food?</h2>
        <p className="subtitle">Choose any one</p>

        <div className="role-options">

          {/* Donor visible only to donors or public */}
          {(userRole === "donor" || !userRole) && (
            <div className="role-card" onClick={() => navigate("/donor")}>
              <div className="icon-circle donate">🍲</div>
              <h3>Donor</h3>
              <p>Donate your food for needy</p>
            </div>
          )}

          {/* NGO visible only to NGO or public */}
          {(userRole === "ngo" || !userRole) && (
            <div className="role-card" onClick={() => navigate("/ngo")}>
              <div className="icon-circle ngo">🛵</div>
              <h3>NGO Agent</h3>
              <p>Food pickup</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Role_Page;
