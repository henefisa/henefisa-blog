import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 200px;
  background-color: #f2f5f8;
  .name {
    text-align: center;
    line-height: 200px;
    font-family: "Playfair Display", serif;
    font-weight: 600;
    font-size: 1.75rem;
  }
`;

export default function Banner() {
  return (
    <Wrapper>
      <h2 className="name">henefisa blog</h2>
    </Wrapper>
  );
}
