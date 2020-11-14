import React from "react";
import styled from "styled-components";

const PostContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
  .post-image {
    height: 50px;
    flex: 0 0 80px;
    img {
      max-width: 100%;
      height: auto;
      object-fit: cover;
      object-position: center;
    }
  }

  .post-content {
    text-align: left;
    margin-left: 10px;
    flex: auto;
    text-overflow: ellipsis;
    overflow: hidden;
    .post-title {
      font-size: 1rem;
      font-weight: 400;
      color: var(--secondary-color);

      transition: 0.3s ease-out;
      &:hover {
        color: var(--primary-color);
      }
    }

    .post-date {
      font-size: 0.875rem;
      color: var(--secondary-color);
    }
  }
`;

export default function Small() {
  return (
    <PostContainer>
      <div className="post-image">
        <img src="/blog-minimal-post-1.jpg" alt="Post" />
      </div>
      <div className="post-content">
        <h6 className="post-title">Street art wall</h6>
        <span className="post-date">Feb 15, 2018</span>
      </div>
    </PostContainer>
  );
}
