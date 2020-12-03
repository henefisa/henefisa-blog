import React from "react";
import styled from "styled-components";
import firebase from "firebase";
import { useAuth } from "../../context/Auth";

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
        margin-bottom: 16px;
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

export default function WriteComment({ commentsRef }) {
  const [user] = useAuth();
  const handleSubmit = (values, { resetForm }) => {
    const data = {
      authorRef: user.ref,
      message: values.message,
      createdAt: firebase.firestore.Timestamp.now()
    };
    commentsRef &&
      commentsRef.update({
        listComments: firebase.firestore.FieldValue.arrayUnion(data),
        total: firebase.firestore.FieldValue.increment(1)
      });
    resetForm();
  };

  return (
    <WriteCommentContainer>
      <h4 className="comment">Write comment</h4>
    </WriteCommentContainer>
  );
}
