import React from "react";
import { Link } from "react-router-dom";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-content-item">
          <Link to="/" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faHistory}></FontAwesomeIcon>
            &emsp; History
          </Link>
        </div>
        <div className="sidebar-content-item">
          <Link to="/product" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
            &emsp; Product
          </Link>
        </div>
        <div className="sidebar-content-item">
          <Link to="/user" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            &emsp; User
          </Link>
        </div>
      </div>
    </div>
  );
};
