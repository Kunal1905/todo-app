import React from 'react'
import "./Navbar.css"
import { FiCheckSquare, FiHome, FiList } from "react-icons/fi"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <FiCheckSquare className="brand-icon" />
        <span className="brand-text">TaskMaster</span>
      </div>
      <ul className="nav-links">
        <li className="nav-item">
          <FiHome className="nav-icon" />
          <span>Home</span>
        </li>
        <li className="nav-item">
          <FiList className="nav-icon" />
          <span>My Tasks</span>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
