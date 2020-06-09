import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import FormPost from "../components/FormPost";
import PostCard from "../components/PostCard";
import "../styles/Home.css";
import FormTrans from "../components/FormTrans";
import Nav from "../components/Nav";
import NoData from "../images/nodata.png";
import Login from "../images/login2.png";

export default function Home(props) {
  const [isPost, setIsPost] = useState(false);
  const [dataPost, setDataPost] = useState([]);

  const mapStateToProps = useSelector((state) => state.logIn);
  const mapStateToPropsExchange = useSelector((state) => state.Exchange);

  // Open and lose model
  const hanldeClickPost = () => {
    setIsPost(!isPost);
  };
  const handleClose = () => {
    setIsPost(!isPost);
  };
  // Animation
  const face = useSpring({
    visibility: isPost ? "visible" : "hidden",
    opacity: isPost ? 1 : 0,
  });

  //Get full data from mongoBD
  const fetchData = async () => {
    const response = await axios.get(
      "https://tc9y3.sse.codesandbox.io/posts/items/"
    );
    setDataPost(response.data);
  };
  useEffect(() => {
    fetchData(dataPost);
  }, []);
  console.log(dataPost);
  // Filter post of user
  const postOfUser = dataPost.filter((data) => {
    return data.idUserPost === mapStateToProps.dataUser._id;
  });
  const dataUser = mapStateToProps.dataUser;
  return (
    <div>
      <Nav />
      <div className="contaiter-home">
        <Row id="row">
          <Col span={15} id="colPost">
            <div className="clickToPost">
              <div className="title-form-post">
                <img src={mapStateToProps.dataUser.avatarUrl} />
                <h2>Let's show me </h2>
              </div>
              <div className="inputAndIconPost">
                <input onClick={hanldeClickPost} />
                <button>
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
            </div>
            <animated.div style={face} className="container-fixed">
              <div className="icon-time">
                <FontAwesomeIcon icon={faTimes} onClick={handleClose} />
              </div>
              <FormPost />
            </animated.div>
            {/* Post exchange */}
            {mapStateToPropsExchange.isShowExchange ? (
              <FormTrans postOfUser={postOfUser} />
            ) : null}
            {/* Car post */}
            {dataPost.map((data) => {
              return (
                <PostCard
                  name={data.name}
                  title={data.title}
                  description={data.description}
                  imagePostUrl={data.imagePostUrl}
                  createdAt={data.createdAt}
                  comments={data.comment}
                  like={data.like}
                  address={data.address}
                  avatarUrl={data.avatarUrl}
                  need={data.need}
                  id_post={data.id_post}
                  id_user={data.id_user}
                  fetchData={fetchData}
                />
              );
            })}
          </Col>
          <Col span={9}>
            {dataUser.isAuth === true ? (
              <div className="container-accout">
                <div className="account-fixed">
                  <div className="img-acc">
                    <div className="img-color">
                      <img src={dataUser.avatarUrl} />
                    </div>
                    <span>{dataUser.name}</span>
                  </div>
                </div>

                <div className="email-fixed">
                  <h3>Your info</h3>
                  <span>
                    <i className="fas fa-envelope icon-mail"> </i>
                    <span>{dataUser.email}</span>
                  </span>
                  <span>
                    <i className="fas fa-user-clock icon-user-clock"></i>
                    <span>
                      <Moment fromNow>{dataUser.createdAt}</Moment>
                    </span>
                  </span>
                </div>
                <div className="acc-transaction">
                  <h3> Your Transactions</h3>
                </div>
              </div>
            ) : (
              <div className="nodata">
                <div className="fixed-login">
                  <img src={Login} />
                  <h1>Login Now</h1>
                  <div>
                    <Link to="/users/login">
                      <button>Login</button>
                    </Link>
                    <Link to="/users/login">
                      <button>Sign up</button>
                    </Link>
                  </div>
                </div>
                <img src={NoData} />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
