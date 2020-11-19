import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .avatar-wrapper {
    ${({ size }) => {
      switch (size) {
        case "small":
          return `
          width: 24px;
          height: 24px;`;
        case "medium":
          return `
            width: 50px;
            height: 50px;`;
        case "large":
          return `
            width: 100px;
            height: 100px;`;
        default:
          return;
      }
    }}
    ${({ center }) => center && `margin-left: auto; margin-right: auto;`}
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .avatar {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }

  .name {
    font-size: 1.25rem;
    font-weight: 400;
    text-align: center;
    margin: 20px 0;
  }
`;

export default function Avatar({ src, alt, size = "small", center, name }) {
  return (
    <Wrapper size={size} center={center}>
      <div className="avatar-wrapper">
        <img src={src} alt={alt} className="avatar" />
      </div>
      <h5 className="name">{name}</h5>
    </Wrapper>
  );
}
