import React, { useState } from "react";
import "../css/DonorPage.css";
import { useNavigate } from "react-router-dom";

function DonorPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    donorName: "",
    donorPhone: "",
    foodType: "",
    foodQuantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // const response = await fetch("http://localhost:5000/api/donors/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/donors/add`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});


    const data = await response.json();
    if (response.ok) {
      alert("Donation submitted successfully!");
      setFormData({ donorName: "", donorPhone: "", foodType: "", foodQuantity: "", place: "" });
    } else {
      alert(data.message || "Failed to submit donation");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error! Try again later.");
  }
};


  const handleBack = () => {
     navigate(-1);
  };

  return (
    
    <div className = "don-container">
        <div className="donor-container">

          <h2>🍲 Donor Details</h2>
          <form className="donor-form" onSubmit={handleSubmit}>
            {/* Donor Name */}
            <label>Donor Name:</label>
            <input
              type="text"
              name="donorName"
              placeholder="Enter your name"
              value={formData.donorName}
              onChange={handleChange}
              required
            />

            {/* Donor Phone */}
            <label>Donor Phone Number:</label>
            <input
              type="tel"
              name="donorPhone"
              placeholder="Enter phone number"
              value={formData.donorPhone}
              onChange={handleChange}
              required
            />

            {/* Food Type */}
            <label>Food Type:</label>
            <input
              type="text"
              name="foodType"
              placeholder="E.g. Rice, Chapati, Curry"
              value={formData.foodType}
              onChange={handleChange}
              required
            />

            {/* Food Quantity */}
            <label>Food Quantity (approx. serves):</label>
            <input
              type="number"
              name="foodQuantity"
              placeholder="E.g. 10"
              value={formData.foodQuantity}
              onChange={handleChange}
              required
            />

            {/* Food Address */}
            <label>Address of the Food</label>
            <input
              type="test"
              name="address"
              placeholder="E.g. 11/A , north street"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit Donation</button>
          </form>
          
        </div>  

        
        <div className="donor-quote">
          <h3>“The food you share today becomes someone’s hope for tomorrow.”</h3>
          <p>Every meal you donate fights hunger and spreads kindness 💛</p>
          <button className="back-btn" onClick={handleBack}>
            ← Back
          </button>
        </div>
    </div>
  );
}

export default DonorPage;