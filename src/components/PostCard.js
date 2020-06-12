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

import "../styles/PostCard.css";
import Reply from "../components/Reply";

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

  //Redux
  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const dispatch = useDispatch();

  //Handle Noti comment
  const handleNotiComment = () => {
    const noti = {
      id_user: id_user,
      id_post: id_post,
      content_noti: "commented",
      id_user_comment: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      isRead: false,
    };
    if (noti.id_user_comment === noti.id_user) {
      return;
    }
    axios
      .post("https://tc9y3.sse.codesandbox.io/notis/comment", noti)
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
    return userLiked.id_user_liked === mapStateToProps._id || CheckLoggedIn._id;
  });
  // handleExchange
  const handleExchange = () => {
    const id = { id_product: id_post, id_user_product: id_user };
    dispatch({ type: "EXCHANGE", id: id });
  };
  // handle Reply
  const handleReply = () => {
    setIsShowReply(!isShowReply);
  };

  return (
    <div className="container-cardPost">
      <div>
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
          <div className="icon">
            <i className="fas fa-exchange-alt" onClick={handleExchange}></i>
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
                  <button onClick={handleReply}>Reply</button>
                  <span>
                    <Moment fromNow>{comment.time_comment}</Moment>
                  </span>
                  <span className="count-reply" onClick={handleReply}>
                    {" "}
                    <b>{comment.replys.length}</b> Reply{" "}
                  </span>
                </div>
                {/* Reply comment */}
                {isShowReply === true ? (
                  <Reply
                    id_post={id_post}
                    id_comment={comment._id}
                    replys={comment.replys}
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
