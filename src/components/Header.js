import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">Letter Likho</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/letter-generator">Letter Generator</Link>
      </nav>
    </header>
  );
};

export default Header;