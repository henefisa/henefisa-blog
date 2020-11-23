import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Avatar from "react-avatar";

const AuthorWrapper = styled.div`
  padding: 100px 0;
  background-color: rgb(242, 245, 248);
  .author {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 585px;
    padding: 15px;
    margin: 0 auto;
    text-align: center;
  }

  .name {
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
  }

  .description {
    font-size: 0.9375rem;
    color: var(--secondary-color);
  }
`;

export default function Author({ author }) {
  const history = useHistory();
  return (
    <AuthorWrapper>
      <div className="author">
        <Avatar
          src={author.avatar}
          name={author.firstName + " " + author.lastName}
          size={100}
          round
          style={{ marginBottom: 10 }}
        />
        <h5 className="name" onClick={() => history.push(`/user/${author.id}`)}>
          {author.firstName + " " + author.lastName}
        </h5>
        <p className="description">{author.description}</p>
      </div>
    </AuthorWrapper>
  );
}
