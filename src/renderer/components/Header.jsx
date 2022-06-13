import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

// import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Santanu</span>
        </div>
        <div className="topRight">
          <Link className="home" to="/">
            Home
          </Link>
          <Link className="home" to="/about">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}
