import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HoverBox from "../HoverBox";

const PostContainer = styled.article`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
  .post-overview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #7c7c7c;
    margin: 30px 0 10px;
    .tags {
      text-transform: uppercase;
      .tag {
        transition: 0.3s ease-in-out;
        margin-right: 5px;
      }
      .tag:hover {
        cursor: pointer;
        color: var(--primary-color);
      }
    }
  }
  .post-content {
    text-align: left;
    .title {
      color: var(--secondary-color);
      font-weight: 600;
      font-size: 1.25rem;
      margin-bottom: 10px;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: var(--primary-color);
      }
    }
    .description {
      color: var(--secondary-color);
      font-size: 0.9375rem;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .read_more-btn {
      margin-top: 20px;
      background: none;
      font-size: 0.9375rem;
      border: none;
      padding: 4px 0;
      text-transform: capitalize;
      position: relative;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      cursor: pointer;
      outline: none;
      &::before {
        content: "";
        display: block;
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
        height: 1px;
        background-color: var(--primary-color);
        transform: scaleX(0);
        transform-origin: left;
        transition: 0.3s ease-in-out;
      }
      &:hover {
        &::before {
          transform: scaleX(1);
          transform-origin: right;
        }
      }
    }
  }
`;

export default function Post({ overlayColor, title, date, description, id, tags = [], cover, ...rest }) {
  return (
    <PostContainer {...rest}>
      <HoverBox url={cover || "/blog-minimal-post-1.jpg"} boxHeight="450px" overlayColor={overlayColor} />
      <div className="post-overview">
        <div className="tags">
          {tags.map((tag, index) => (
            <span className="tag" key={index}>
              {tag}
            </span>
          ))}
        </div>
        <div className="dates">
          <span>{moment.unix(date?.seconds).format("ll")}</span>
        </div>
      </div>
      <div className="post-content">
        <h5 className="title">{title}</h5>
        <p className="description">{description}</p>
        <Link to={`/blog/${id}`} className="read_more-btn">
          Read more
        </Link>
      </div>
    </PostContainer>
  );
}
