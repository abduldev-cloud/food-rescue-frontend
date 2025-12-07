// import React from "react";
// import "../css/DonationList.css";

// const DonationList = () => {
//   const donations = [
//     { id: 1, donor: "R K Restaurents", food: "Rice & Curry", quantity: "25 kg", status: "Delivered", date: "2025-11-12",phoneNo:"9876543210" },
//     { id: 2, donor: "Abdul Restaurents", food: "Chapati & Kurma", quantity: "15 kg", status: "Pending", date: "2025-11-13",phoneNo:"9876543210" },
//     { id: 3, donor: "Wedding Hall", food: "Mixed Buffet", quantity: "40 kg", status: "Accepted", date: "2025-11-13",phoneNo:"9876543210" },
//     { id: 4, donor: "Annapoorna Mess", food: "Idly & Sambar", quantity: "30 kg", status: "Delivered", date: "2025-11-11",phoneNo:"9876543210" },
//   ];

//   return (
//     <div className="donation-container">
//       <h2 className="donation-title">🍱 Food Donors</h2>
//       <table className="donation-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Donor</th>
//             <th>Food Type</th>
//             <th>Quantity</th>
//             <th>Status</th>
//             <th>Date</th>
//             <th>PhoneNo</th>
//           </tr>
//         </thead>
//         <tbody>
//           {donations.map((donation) => (
//             <tr key={donation.id}>
//               <td>{donation.id}</td>
//               <td>{donation.donor}</td>
//               <td>{donation.food}</td>
//               <td>{donation.quantity}</td>
//               <td>
//                 <span className={`status-badge ${donation.status.toLowerCase()}`}>
//                   {donation.status}
//                 </span>
//               </td>
//               <td>{donation.date}</td>
//               <td>{donation.phoneNo}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DonationList;


import React, { useEffect, useState } from "react";
import "../css/DonationList.css";

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      // const res = await fetch("http://localhost:5000/api/donors/list");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/donors/list`);

      const data = await res.json();
      setDonations(data);
    } catch (err) {
      console.error("Error fetching donations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  if (loading) return <p>Loading donations...</p>;

  return (
    <div className="donation-container">
      <h2 className="donation-title">🍱 Food Donors</h2>
      <table className="donation-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Donor</th>
            {/* <th>Food Type</th> */}
            {/* <th>Quantity</th> */}
            {/* <th>Status</th> */}
            <th>Date</th>
            <th>Phone No</th>
          </tr>
        </thead>

        <tbody>
          {donations.map((donation, index) => (
            <tr key={donation.id}>
              <td>{index + 1}</td>

              <td>{donation.donor_name}</td>

              {/* <td>{donation.food_type}</td> */}

              {/* <td>{donation.food_quantity}</td> */}

              {/* <td>
                <span className={`status-badge ${donation.status?.toLowerCase()}`}>
                  {donation.status}
                </span>
              </td> */}

              <td>{new Date(donation.created_at).toLocaleDateString()}</td>

              <td>{donation.donor_phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationList;
