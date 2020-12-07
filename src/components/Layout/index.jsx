import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex: auto;
  flex-direction: ${props => (props.hasSider ? "row" : "column")};
`;

export function Layout({ children, className }) {
  let hasSider = false;
  React.Children.forEach(children, child => (child.type.displayName === Sider.displayName ? (hasSider = true) : null));
  return <Wrapper hasSider={hasSider} className={className}>{children}</Wrapper>;
}

Layout.displayName = "Layout-Wrapper";

export const Sider = styled.aside`
  flex: 0 0 ${props => props.boxWidth || "200"}px;
  width: ${props => props.boxWidth || "200"}px;
  max-width: ${props => props.boxWidth || "200"}px;
  min-width: ${props => props.boxWidth || "200"}px;
`;

Sider.displayName = "Layout-Sider";

export const Content = styled.main`
  flex: auto;
`;

Content.displayName = "Layout-Content";

export const Header = styled.header`
  flex: 0 0 auto;
`;

Header.displayName = "Layout-Header";

export const Footer = styled.footer`
  flex: 0 0 auto;
`;

Footer.displayName = "Layout-Footer";

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }

  ${({ flex }) =>
    flex &&
    `
    display: flex;
    justify-content: ${flex.justify || ""};
    align-items: ${flex.align || ""};
    flex-wrap: ${flex.wrap || ""};
  `}
`;

export const Section = styled.section`
  padding: 100px 0;
`;
