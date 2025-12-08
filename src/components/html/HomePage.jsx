import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";
import foodImage from "../../assets/image.png";

const HomePage = () => {
    const navigate = useNavigate();
  return (
    <div className="homepage">
      


      <nav className="navbar">
  <div className="brand">SavePlate</div>

  <div className="nav-links">
    <button onClick={() => navigate("/login")}>Login</button>
    <a href="#about">About Us</a>
    <a href="#services">Our Services</a>
    <a href="#contact">Contact</a>
  </div>
</nav>


      
      <section className="hero">
        <div className="overlay">
          <h1>From Surplus To Sustenance</h1>
          <p>Connecting generosity with hunger relief</p>
        </div>
      </section>

      
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>
          <strong>SavePlate</strong> is a food rescue initiative committed to
          saving surplus edible food and redistributing it to those in need.
          Every year, tons of food are wasted while millions go hungry. Our
          platform bridges this gap by connecting donors, volunteers, and NGOs
          to make sure no meal goes to waste.
        </p>
      </section>

      
      <section id="services" className="services">
        <h2>Our Services</h2>
        <div className="service-box">
                 
            <img src={foodImage} alt="Food donation drive" />


          <div className="service-text">
            <h3>Food Collection & Delivery</h3>
            <p>
              We collect excess food from restaurants, events, and homes, ensure
              quality and hygiene, and distribute it through local NGOs. Every
              rescued meal helps reduce hunger, waste, and carbon emissions.
            </p>
          </div>
        </div>
      </section>

      
      <section className="why">
        <h2>Why Choose Us</h2>
        <p>
          Our mission is simple — ensure that every surplus meal finds a plate.
          SavePlate operates with transparency, compassion, and efficiency,
          ensuring every contribution truly counts.
        </p>
        <div className="why-gallery">
          <div className="why-item">
            <img
              src="https://cimages.milaap.org/milaap/image/upload/c_fill,g_faces,h_315,w_420/v1601462795/production/images/campaign/216196/IMG-20200918-WA0011_onjlmn_1601462799.jpg"
              alt="Volunteers serving food"
            />
            <h4>Volunteers</h4>
          </div>
          <div className="why-item">
            <img
              src="https://static3.bigstockphoto.com/8/4/3/large1500/348289498.jpg"
              alt="Food distribution"
            />
            <h4>Food Distribution</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <p>📞 9622050430</p>
          <p>✉ saveplate@gmail.com</p>
        </div>
        <p className="footer-note">
          © 2025 SavePlate — Rescuing Food, Restoring Hope.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;