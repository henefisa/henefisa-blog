import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import getAuthor from "../../utils/getAuthor";
import moment from "moment";
import { Link } from "react-router-dom";

const CommentContainer = styled.div`
  text-align: center;
  max-height: 500px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: block;
    width: 5px;
    background: #ddd;
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
  }
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
  .comment-message {
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

function CommentItem({ time, author, message }) {
  return (
    <CommentBox>
      <div className="comment-user-avatar">
        <i className="fas fa-user"></i>
      </div>
      <div className="comment-message">
        <span className="comment-time">{time}</span>
        <h6>{author}</h6>
        <p>{message}</p>
      </div>
    </CommentBox>
  );
}

export default function Comment({ commentsRef }) {
  const [comments, setComments] = useState([]);
  const getComments = useCallback(
    () =>
      commentsRef.onSnapshot(doc => {
        (async () => {
          const data = doc.data();
          const listAuthor = await Promise.all(data.listComments.map(comment => getAuthor(comment.authorRef)));
          data.listComments = data.listComments.map((comment, index) => ({ ...comment, author: listAuthor[index] }));
          setComments(data);
        })();
      }),
    [commentsRef]
  );

  useEffect(() => {
    const unsubscribe = getComments();
    return () => unsubscribe();
  }, [getComments]);

  return (
    <div>
      <h4 style={{ marginBottom: 50, fontWeight: 600, fontSize: "1.5rem", textAlign: "center" }}>Comments</h4>
      <CommentContainer>
        {comments?.listComments?.map((comment, index) => {
          return (
            <CommentItem
              key={index}
              time={moment.unix(comment.createdAt.seconds).fromNow()}
              author={
                <Link style={{ cursor: "pointer" }} to={`/users/${comment.author.id}`}>
                  {comment.author.firstName + " " + comment.author.lastName}
                </Link>
              }
              message={comment.message}
            />
          );
        })}
      </CommentContainer>
    </div>
  );
}
