import React from "react";
import { Layout, Header as LayoutHeader, Footer as LayoutFooter, Content } from "../components/Layout/index";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";
import styled from "styled-components";

const TransparentHeader = styled(Header)`
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #000;
`;

export default function TransparentHeaderLayout({ children }) {
  return (
    <Layout>
      <LayoutHeader>
        <TransparentHeader />
      </LayoutHeader>
      <Layout>
        <Content>{children}</Content>
      </Layout>
      <LayoutFooter>
        <Footer />
      </LayoutFooter>
    </Layout>
  );
}
