import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTimes,
  faBell,
  faHome,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ExchangeIcon from "../images/047-exchange.png";

export default function Nav() {
  const mapStateToProps = useSelector((state) => state.logIn);
  return (
    <nav className="container-nav">
      <div className="container-bar">
        <div className="LogoPage">
          <img src={ExchangeIcon} alt="" />
          <span>Second Life</span>
        </div>
        <div className="icon-nav">
          <Link className="icon-home" to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <div className="icon-noti">
            <div className="dot-noti" />
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="icon-help">
            <FontAwesomeIcon icon={faQuestionCircle} />{" "}
          </div>
        </div>
        {mapStateToProps.isAuth ? (
          <Link className="nav-link" to="/profile">
            <div>{mapStateToProps.dataUser.name}</div>
            <div>
              {" "}
              <img
                src={mapStateToProps.dataUser.avatarUrl}
                className="img-avatar"
              />{" "}
            </div>
          </Link>
        ) : (
          <div className="container-list">
            <Link className="nav-link" to="/users/login">
              Login
            </Link>
            <Link className="nav-link" to="/users/create">
              Users
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}