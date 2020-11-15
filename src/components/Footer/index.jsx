import React from "react";
import styled from "styled-components";
import { Container } from "../Layout";

const MainFooter = styled.footer`
  background: var(--primary-color);
  height: 250px;
  color: #fff;
  display: flex;
  align-items: center;
`;

export default function Footer() {
  return (
    <MainFooter>
      <Container>
        <h1>Henefisa</h1>
      </Container>
    </MainFooter>
  );
}
