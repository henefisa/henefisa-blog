import React from "react";
import styled from "styled-components";
import HoverBox from "../HoverBox/index";
import { Container } from "../Layout/index";

const Item = styled.div`
  flex: 0 1 345px;
  height: 220px;
`;

const Title = styled.h6`
  font-size: 0.875rem;
  font-weight: 300;
  padding: 10px 16px;
  background-color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const { Content } = HoverBox;

export default function Tags() {
  return (
    <Container flex={{ justify: "space-between", align: "center", wrap: "wrap" }}>
      <Item>
        <HoverBox url="/blog-minimal-post-1.jpg">
          <Content center>
            <Title>Fashion</Title>
          </Content>
        </HoverBox>
      </Item>
      <Item>
        <HoverBox url="/blog-minimal-post-2.jpg">
          <Content center>
            <Title>Lifestyle</Title>
          </Content>
        </HoverBox>
      </Item>
      <Item>
        <HoverBox url="/blog-minimal-post-1.jpg">
          <Content center>
            <Title>Travel</Title>
          </Content>
        </HoverBox>
      </Item>
    </Container>
  );
}
