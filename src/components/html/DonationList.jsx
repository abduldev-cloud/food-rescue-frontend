import React, { useEffect, useState } from "react";
import "../css/DonationList.css";

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      // const res = await fetch("http://localhost:5000/admin/donations");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/donations`);

      const data = await res.json();
      setDonations(data);
    } catch (error) {
      console.error("Failed to fetch donations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  if (loading) {
    return <h2 className="donation-title">Loading donations...</h2>;
  }

  return (
    <div className="donation-container">
      <h2 className="donation-title">🍱 Recent Food Donations</h2>

      <table className="donation-table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Donor Name</th>
            <th>Food</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {donations.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No donations found.
              </td>
            </tr>
          ) : (
            donations.map((donation, index) => (
              <tr key={donation.id}>
                <td>{index + 1}</td>
                <td>{donation.donor_name || "Unknown"}</td>
                <td>{donation.food_type}</td>
                <td>{donation.food_quantity} qnty</td>
                <td>
                  <span className={`status-badge ${donation.status?.toLowerCase()}`}>
                    {donation.status}
                  </span>
                </td>
                <td>{donation.created_at?.split("T")[0]}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonationList;
