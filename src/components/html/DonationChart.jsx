import React, { useEffect, useState } from "react";
import "../css/DonationChart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const DonationChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDonationTrend();
  }, []);

  const fetchDonationTrend = async () => {
    try {
      // const res = await fetch("http://localhost:5000/admin/donation-trend");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/donation-trend`);

      const result = await res.json();

      // Format data into Mon, Tue, Wed...
      const formatted = result
      .filter(item => item.date) // prevent crashes
      .map((item) => ({
        day: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }), 
        donations: item.donations,
      }));


      setData(formatted);
    } catch (err) {
      console.error("Error fetching donation trend:", err);
    }
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">Weekly Donation Trends</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="donations" fill="#ed9d1bff" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationChart;
