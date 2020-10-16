import React from 'react';
import "./Navbar.css"
function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <a href="#">
          Shopping 
        </a>
      </div>
      <div className="navbar__admin">
        <a href="#">
          Admin
        </a>
      </div>
    </div>
  );
}

export default Navbar
