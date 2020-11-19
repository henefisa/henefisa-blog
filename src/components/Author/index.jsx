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

export default function Author() {
  return (
    <AuthorWrapper>
      <div className="author">
        <Avatar src="/blog-classic-avatar.jpg" name="Caroline Williams" size="large" center/>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
      </div>
    </AuthorWrapper>
  );
}
