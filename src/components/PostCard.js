import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMapMarkerAlt,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import ShowMoreText from "react-show-more-text";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/PostCard.css";
import Reply from "../components/Reply";

import { Link, useLocation } from "react-router-dom";

export default function PostCard(props) {
  const {
    name,
    title,
    description,
    imagePostUrl,
    createdAt,
    comments,
    like,
    address,
    avatarUrl,
    need,
    id_post,
    id_user,
    fetchData,
  } = props;

  const [commentContent, setCommetContent] = useState("");
  const [isShowReply, setIsShowReply] = useState(false);
  const [keyNow, setKeyNow] = useState(-1);
  let location = useLocation();

  //Redux
  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const dispatch = useDispatch();

  //Handle Noti comment
  const handleNotiComment = () => {
    const mapIdUserCommented = comments.map((comment) => {
      return comment.id_user_comment;
    });
    const filterIdDuplicates = [...new Set(mapIdUserCommented)];
    const noti = {
      id_user: id_user,
      id_post: id_post,
      content_noti: "Commented",
      id_user_comment: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      isRead: false,
      id_user_commented: filterIdDuplicates,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/notis/comment", noti)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Handle Noti like
  const handleNotiLike = () => {
    const noti = {
      id_user: id_user,
      id_post: id_post,
      content_noti: "Love ❤",
      isRead: false,
      id_user_like: mapStateToProps._id || CheckLoggedIn.dataUser._id,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/notis/like", noti)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Value comment
  const handleValueComment = (event) => {
    const value = event.target.value;
    setCommetContent(value);
  };
  // Submit comment
  const handleSubmitComment = (event) => {
    event.preventDefault();
    const date = new Date();
    const commentPost = {
      id_user_comment: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      content: commentContent,
      id_post: id_post,
      time_comment: date,
      isShowReply: false,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/posts/comments", commentPost)
      .then((res) => {
        setCommetContent("");
        handleNotiComment();
        return fetchData();
      });
  };
  // Like
  const handleLike = () => {
    const like = {
      id_user_liked: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      id_post: id_post,
    };

    axios
      .post("https://tc9y3.sse.codesandbox.io/posts/like", like)
      .then((res) => {
        console.log(res.data);
        handleNotiLike();
        return fetchData();
      });
  };
  // Unlike
  const handleUnLike = () => {
    const Unlike = {
      id_user_liked: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      id_post: id_post,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/posts/unlike", Unlike)
      .then((res) => {
        console.log(res.data);
        return fetchData();
      });
  };

  // Filter user Logged in liked
  const arrIdUserLiked = like.filter(function (userLiked) {
    if (
      userLiked.id_user_liked === mapStateToProps._id ||
      (CheckLoggedIn.dataUser._id === userLiked.id_user_liked &&
        userLiked.id_post === id_post)
    ) {
      return true;
    } else {
      return false;
    }
  });

  // handleExchange
  const handleExchange = () => {
    if (
      id_user === mapStateToProps._id ||
      id_user === CheckLoggedIn.dataUser._id
    ) {
      toast.error("This is your product, you idiot 🤣");
      return;
    }

    const id = { id_product: id_post, id_user_product: id_user, name: name };
    dispatch({ type: "EXCHANGE", id: id });
  };

  // handle Reply
  const handleReply = (comment, key) => {
    setIsShowReply(!isShowReply);
    setKeyNow(key);
  };
  return (
    <div className="container-cardPost">
      <div>
        <ToastContainer />
        <div className="avatar-name">
          <div
            className="avatar-postcard"
            style={{
              backgroundImage: `url(${avatarUrl})`,
            }}
          ></div>

          <div className="conten-comment">
            <span className="name-post">{name}</span>
            <div className="moment">
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              <Moment fromNow>{createdAt}</Moment>
            </div>
          </div>
        </div>
        <div className="address">
          <div className="icon-address">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <span>{address}</span>
        </div>

        <h3 className="tile-post">{title}</h3>
        <div className="main-post">
          <div className="description-post">
            <ShowMoreText
              lines={4}
              more="Show more"
              less="Show less"
              anchorClass=""
              expanded={false}
              width={280}
            >
              {description}
            </ShowMoreText>
            <div className="need-item">
              <span>Need:</span>

              {need.map((item, key) => {
                return (
                  <div className="icon-need" key={key}>
                    <FontAwesomeIcon icon={faSeedling} /> <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="image-post">
            <img src={imagePostUrl} alt="" className="img-post" />
          </div>
        </div>
        <div className="conunt-like">
          <span>
            <img
              src="https://cdn.glitch.com/01654afb-2edf-4d94-955a-e0046da0d025%2Fheart%20(3).png?v=1591217736855"
              alt=""
            />
            {like.length}
          </span>

          <span>{comments.length} People commented</span>
        </div>
        <div className="action">
          <div className="icon-like">
            {arrIdUserLiked.length ? (
              <img
                src="https://cdn.glitch.com/01654afb-2edf-4d94-955a-e0046da0d025%2Fheart%20(3).png?v=1591217736855"
                alt=""
                onClick={handleUnLike}
              />
            ) : (
              <img
                src="https://cdn.glitch.com/01654afb-2edf-4d94-955a-e0046da0d025%2Fthumbnails%2Fheart%20(10).png?1591217727346"
                alt=""
                onClick={handleLike}
              />
            )}
            <span>Like</span>
          </div>
          <div className="icon">
            <i className="far fa-comments"></i>
            <span>Comment</span>
          </div>
          <div className="icon" onClick={handleExchange}>
            <i className="fas fa-exchange-alt"></i>
            <span>Exchange</span>
          </div>
        </div>

        <div className="container-comment">
          {comments.map((comment, key) => {
            return (
              <div key={key}>
                <div className="content-comment">
                  <div
                    className="avatar-comment"
                    style={{
                      backgroundImage: `url(${comment.avatarUrl})`,
                    }}
                  ></div>

                  <div className="main-comment">
                    <b> {comment.name} </b> {comment.content}
                  </div>
                </div>
                <div className="reply">
                  <button
                    onClick={() => {
                      return handleReply(comment, key);
                    }}
                  >
                    Reply
                  </button>
                  <span>
                    <Moment fromNow>{comment.time_comment}</Moment>
                  </span>
                  <span
                    className="count-reply"
                    onClick={() => {
                      return handleReply(comment, key);
                    }}
                  >
                    {" "}
                    <b>{comment.replys.length}</b> Reply{" "}
                  </span>
                </div>
                {/* Reply comment */}
                {isShowReply === true && key === keyNow ? (
                  <Reply
                    id_post={id_post}
                    id_comment={comment._id}
                    replys={comment.replys}
                    id_user_comment={comment.id_user_comment}
                    fetchData={fetchData}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="form-comment">
          <div
            className="avatar-from-comment"
            style={{
              backgroundImage: `url(${
                mapStateToProps.avatarUrl || CheckLoggedIn.dataUser.avatarUrl
              })`,
            }}
          ></div>
          <form onSubmit={handleSubmitComment}>
            <input
              type="text"
              onChange={handleValueComment}
              value={commentContent}
              placeholder="Type your comment"
            />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
