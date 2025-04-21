import React from "react";
import { Link } from "react-router-dom";
import "animate.css";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container animate__animated animate__fadeIn">
      <h1 className="home-title animate__animated animate__fadeInDown">
        Welcome to Letter Generator
      </h1>
      <p className="home-subtitle animate__animated animate__fadeInUp">
        Create professional letters in minutes
      </p>
      
      <div className="generator-grid animate__animated animate__fadeInUp">
        <Link to="/letter-generator" className="generator-card">
          <div className="card-icon">📝</div>
          <h3>Letter Generator</h3>
          <p>Create custom letters with ease</p>
        </Link>
        
        <div className="generator-card coming-soon">
          <div className="card-icon">🤖</div>
          <h3>AI Generator</h3>
          <p>Coming Soon</p>
          <span className="coming-soon-badge">Soon</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
