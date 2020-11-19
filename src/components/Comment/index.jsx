import React from "react";
import styled from "styled-components";

const CommentContainer = styled.div`
  text-align: center;
  .comment {
    margin-bottom: 50px;
    font-weight: 600;
    font-size: 1.5rem;
  }
`;

const CommentBox = styled.div`
  margin-bottom: 30px;
  padding-left: 80px;
  position: relative;
  text-align: left;
  .comment-user-avatar {
    width: 60px;
    height: 60px;
    background: #eff2f5;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
  }
  .comment-content {
    position: relative;
    .comment-time {
      position: absolute;
      top: 0;
      right: 0;
      text-align: right;
      color: #aaa;
      font-style: italic;
      font-size: 14px;
    }
    h6 {
      font-size: 1rem;
      margin-bottom: 10px;
      font-weight: 400;
    }

    p {
      font-size: 0.9375rem;
      color: var(--secondary-color);
    }
  }
`;

function CommentItem({ time, author, content }) {
  return (
    <CommentBox>
      <div className="comment-user-avatar">
        <i className="fas fa-user"></i>
      </div>
      <div className="comment-content">
        <span className="comment-time">{time}</span>
        <h6>{author}</h6>
        <p>{content}</p>
      </div>
    </CommentBox>
  );
}

export default function Comment() {
  return (
    <CommentContainer>
      <h4 className="comment">Comments</h4>
      <CommentItem
        time="2 hours ago"
        author="John Smith"
        content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
      />
      <CommentItem
        time="2 hours ago"
        author="John Smith"
        content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
      />
      <CommentItem
        time="2 hours ago"
        author="John Smith"
        content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
      />
    </CommentContainer>
  );
}
