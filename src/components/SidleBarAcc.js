import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../styles/SidleBarAcc.css";
import { ReactComponent as ProFileImg } from "../images/profile.svg";

export default function SidleBarAcc(props) {
  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const UpdateUser = useSelector((state) => state.UpdateUser);

  const { avatarUrl, name } = props;

  return (
    <div className="container-silde-bar">
      <div className="acc-sidle">
        <div
          className="avata-sidle"
          style={{
            backgroundImage: `url(${
              avatarUrl ||
              UpdateUser.avatarUrl ||
              mapStateToProps.avatarUrl ||
              CheckLoggedIn.dataUser.avatarUrl
            })`,
          }}
        ></div>
        <div className="edit-acc">
          <span className="name-acc">
            {name ||
              UpdateUser.name ||
              mapStateToProps.name ||
              CheckLoggedIn.dataUser.name}
          </span>
          <Link
            to={
              mapStateToProps._id
                ? "/users/info/" + mapStateToProps._id
                : "/users/info/" + CheckLoggedIn.dataUser._id
            }
          >
            <span className="icon-edit">
              <i className="fas fa-pen"></i>
              <span>Edit your account</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="list-icon">
        <Link
          to={
            mapStateToProps._id
              ? "/users/info/" + mapStateToProps._id
              : "/users/info/" + CheckLoggedIn.dataUser._id
          }
        >
          <div className="icon-user">
            <div className="wap-user">
              <i className="fas fa-user"></i>
            </div>
            <span id="span-your-acc-sildbar">Your account</span>
          </div>
        </Link>
        <Link to="/profile">
          <div className="icon-lists">
            <div className="warp-list">
              <i className="fas fa-list-ul"></i>
            </div>
            <span id="span-list-tran-sildebar">Your List Transactions</span>
          </div>
        </Link>
      </div>
      <div>
        <ProFileImg style={{ width: 220, height: 450 }} />
      </div>
    </div>
  );
}
