import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h2>Select a Generator</h2>
      <div className="generator-options">
        <Link to="/letter-generator" className="generator-card">
          Letter Generator
        </Link>
        <div className="generator-card coming-soon">
          AI  Generator (Coming Soon)
        </div>
      </div>
    </div>
  );
};

export default Home;
