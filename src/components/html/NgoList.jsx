import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/NgoList.css";

const NgoList = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/ngos`)
        setNgos(res.data);
      } catch (err) {
        console.error("Failed to fetch NGOs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNgos();
  }, []);

  if (loading) return <p>Loading NGOs...</p>;

  return (
    <div className="ngo-container">
      <h2 className="ngo-title">🏢 Registered NGOs</h2>

      <table className="ngo-table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>NGO Name</th>
            <th>Location</th>
            <th>Contact</th>
          </tr>
        </thead>

        <tbody>
          {ngos.map((ngo, index) => (
            <tr key={ngo.id}>
              <td>{index + 1}</td>
              <td>{ngo.name}</td>
              <td>{ngo.location}</td>
              <td>{ngo.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NgoList;
