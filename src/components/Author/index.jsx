import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";

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

  .description {
    font-size: 0.9375rem;
    color: var(--secondary-color);
  }
`;

export default function Author({ author }) {
  return (
    <AuthorWrapper>
      <div className="author">
        <Avatar src={author.avatar} name={author.firstName + " " + author.lastName} size="large" center />
        <p className="description">{author.description}</p>
      </div>
    </AuthorWrapper>
  );
}
