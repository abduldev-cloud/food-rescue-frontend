import React, { useEffect, useState } from "react";
import "../css/NgoPge.css";
import { useNavigate } from "react-router-dom";

function NgoPage() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const NGO_NAME = storedUser?.name || "Unknown NGO";

  const handleBack = () => {
    navigate(-1);
  };

  const fetchDonations = () => {
    // fetch("http://localhost:5000/api/donors/list")
    fetch(`${process.env.REACT_APP_API_URL}/api/donors/list`)
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donations:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // CLAIM DONATION
  const handleClaim = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/donors/claim/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ngoName: NGO_NAME }),
      });

      const data = await res.json();
      setMessage(data.message);

      fetchDonations();
    } catch (err) {
      console.error("Claim error:", err);
    }
  };

  if (loading) return <p className="loading-text">Loading donations...</p>;

  // SPLIT LISTS
  const available = donations.filter((d) => d.claimed_by === null);
  const claimed = donations.filter((d) => d.claimed_by !== null);

  return (
    <div className="ngo-container">
      <nav className="navbar">
        <h2 className="nav-title">SavePlate - NGO Dashboard</h2>
      </nav>

      <div className="main-content">
        {message && <div className="info-message">{message}</div>}

        {/* ---------------------- AVAILABLE DONATIONS ---------------------- */}
        <h2 className="title">Available Donations</h2>

        {available.length === 0 ? (
          <p className="no-donations">No available donations right now.</p>
        ) : (
          <div className="donation-grid">
            {available.map((donation) => (
              <div key={donation.id} className="donation-card">
                <h3>{donation.food_type}</h3>
                <p>
                  <strong>Quantity:</strong> {donation.food_quantity}
                </p>
                <p>
                  <strong>Address:</strong> {donation.address}
                </p>
                <p>
                  <strong>Donor:</strong> {donation.donor_name} (
                  {donation.donor_phone})
                </p>

                <button
                  className="claim-btn"
                  onClick={() => handleClaim(donation.id)}
                >
                  Claim
                </button>

                <p className="timestamp">
                  {new Date(donation.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ------------------------ CLAIMED DONATIONS ------------------------ */}
        <h2 className="title claimed-title">Claimed Donations</h2>

        {claimed.length === 0 ? (
          <p className="no-donations">No donations have been claimed yet.</p>
        ) : (
          <div className="donation-grid">
            {claimed.map((donation) => (
              <div key={donation.id} className="donation-card claimed">
                <h3>{donation.food_type}</h3>
                <p>
                  <strong>Quantity:</strong> {donation.food_quantity}
                </p>
                <p>
                  <strong>Address:</strong> {donation.address}
                </p>
                <p>
                  <strong>Donor:</strong> {donation.donor_name} (
                  {donation.donor_phone})
                </p>

                <p className="claimed-other">
                  Claimed by: <strong>{donation.claimed_by}</strong>
                </p>

                <p className="timestamp">
                  {new Date(donation.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="back-btn" onClick={handleBack}>
        ← Back
      </button>
    </div>
  );
}

// export default NgoPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import "./css/NgoPage.css";
// import "../css/NgoPge.css";

// function NgoPage() {
//   const [donations, setDonations] = useState([]);
//   const [selected, setSelected] = useState(null);

//   const ngoId = localStorage.getItem("ngoId");

//   useEffect(() => {
//     fetchDonations();
//   }, []);

//   const fetchDonations = async () => {
//     try {
//       // const res = await axios.get("http://localhost:5000/admin/ngos/donations");
//       const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/donations`);

//       setDonations(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // CLAIM ACTION
//   const claimDonation = async () => {
//     // try {
//     //   await axios.put(`http://localhost:5000/ngo/claim/${selected.id}`, {
//     //     ngoId: ngoId,
//     //   });
//     try {
//   await axios.put(
//     `${process.env.REACT_APP_API_URL}/ngo/claim/${selected.id}`,
//     {
//       ngoId: ngoId,
//     }
//   );

//       setSelected(null);
//       fetchDonations();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getCardClass = (status) => {
//     switch (status) {
//       case "AVAILABLE":
//         return "card available";
//       case "CLAIMING":
//       case "PICKUP":
//       case "TRANSPORTING":
//         return "card in-progress";
//       case "CLAIMED":
//         return "card completed";
//       default:
//         return "card";
//     }
//   };

//   return (
//     <div className="ngo-container">
//       <h2>NGO Dashboard</h2>

//       <div className="cards">
//         {donations.map((don) => (
//           <div
//             key={don.id}
//             className={getCardClass(don.status)}
//             onClick={() => {
//               if (don.status === "AVAILABLE") setSelected(don);
//             }}
//           >
//             <h3>{don.foodItem}</h3>
//             <p>Qty: {don.quantity}</p>
//             <p>Status: {don.status}</p>

//             {don.status === "CLAIMING" && <small>Pickup Assigned</small>}
//             {don.status === "CLAIMED" && <small>Completed</small>}
//           </div>
//         ))}
//       </div>

//       {/* DIALOG */}
//       {selected && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             <h2>Claim Donation</h2>

//             <p><b>Food:</b> {selected.foodItem}</p>
//             <p><b>Quantity:</b> {selected.quantity}</p>
//             <p><b>Address:</b> {selected.address}</p>
//             <p><b>Donor:</b> {selected.donorName}</p>

//             <div className="dialog-actions">
//               <button onClick={() => setSelected(null)} className="cancel-btn">
//                 Cancel
//               </button>

//               <button onClick={claimDonation} className="claim-btn">
//                 Confirm Claim
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export default NgoPage;
