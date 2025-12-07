import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import StatCard from "./StatCard";
import DonationChart from "./DonationChart";
import DonorList from "./DonorList";
import NgoList from "./NgoList";
import DonationList from "./DonationList";

import { 
  People, 
  Restaurant, 
  EmojiFoodBeverage, 
  Assessment 
} from "@mui/icons-material";

const AdminDashboard = () => {
  const [page, setPage] = useState("overview");

  // Dashboard stats from backend
  const [stats, setStats] = useState({
    totalFood: 0,
    totalDonors: 0,
    totalNgos: 0,
    totalDonations: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // const res = await fetch("http://localhost:5000/admin/stats");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/stats`);
      const data = await res.json();

      setStats({
        totalFood: data.totalFood || 0,
        totalDonors: data.totalDonors || 0,
        totalNgos: data.totalNgos || 0,
        totalDonations: data.totalDonations || 0,
      });
    } catch (error) {
      console.log("Failed to fetch dashboard stats:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setPage={setPage} />

      <div style={{ marginLeft: "240px", padding: "30px", width: "100%" }}>
        
        {/* OVERVIEW PAGE */}
        {page === "overview" && (
          <>
            <h1 style={{ color: "#f6ad55", marginBottom: "25px" }}>
              📊 Dashboard Overview
            </h1>

            {/* Stats Cards */}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <StatCard 
                title="Total Food Rescued" 
                value={`${stats.totalFood} Qnty`} 
                icon={<EmojiFoodBeverage />} 
              />
              <StatCard 
                title="Total Donors" 
                value={stats.totalDonors} 
                icon={<Restaurant />} 
              />
              <StatCard 
                title="Total NGOs" 
                value={stats.totalNgos} 
                icon={<People />} 
              />
              <StatCard 
                title="Total Donations" 
                value={stats.totalDonations} 
                icon={<Assessment />} 
              />
            </div>

            {/* Chart Section */}
            <h2 style={{ marginTop: "40px", color: "#f6ad55" }}>
              📅 Weekly Donation Trends
            </h2>
            <DonationChart />
          </>
        )}

        {/* INNER PAGES */}
        {page === "donors" && <DonorList />}
        {page === "ngos" && <NgoList />}
        {page === "donations" && <DonationList />}
      </div>
    </div>
  );
};

export default AdminDashboard;
