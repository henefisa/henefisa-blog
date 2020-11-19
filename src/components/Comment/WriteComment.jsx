import React from "react";
import styled from "styled-components";

const WriteCommentContainer = styled.div`
  text-align: center;
  .comment {
    margin-bottom: 50px;
    font-weight: 600;
    font-size: 1.5rem;
  }

  .comment-form {
    .form-item {
      width: 100%;
      color: var(--secondary-color);
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.1);
      margin-bottom: 1rem;
      padding: 15px 20px;
      box-shadow: none;
      font: 300 16px "Open Sans", sans-serif;
      &.form-textarea {
        height: 140px;
        margin: 0 8px 16px;
        min-width: calc(100% - 16px);
        min-height: 70px;
      }
    }
    .form-row {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      & > div {
        flex: 0 0 50%;
        padding: 0 8px;
      }
    }
    .form-button {
      background: #e5e8eb;
      border: 0;
      padding: 16px 42px;
      color: #131517;
      overflow: hidden;
      transition: ease-out 0.12s;
      font: 400 13px "Poppins", sans-serif;
      letter-spacing: 1px;
      text-transform: uppercase;
      float: right;
      margin-right: 8px;
      &:not(.disabled):hover {
        background-color: #dde0e3;
      }
      &:not(.disabled) {
        cursor: pointer;
      }
    }
  }
`;

export default function WriteComment() {
  return (
    <WriteCommentContainer>
      <h4 className="comment">Write comment</h4>
      <form className="comment-form">
        <div className="form-row">
          <div>
            <input type="text" name="name" placeholder="Name" className="form-item" />
          </div>
          <div>
            <input type="email" name="email" placeholder="Email" className="form-item" />
          </div>
        </div>
        <div className="form-row">
          <textarea name="message" className="form-item form-textarea"></textarea>
        </div>
        <button className="form-button">Post comment</button>
      </form>
    </WriteCommentContainer>
  );
}
