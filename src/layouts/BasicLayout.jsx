import React from "react";
import Header from "../components/Header/index";
import { Layout, Header as LayoutHeader, Footer as LayoutFooter, Content } from "../components/Layout/index";
import Footer from "../components/Footer/index";

export default function BasicLayout({ children }) {
  return (
    <Layout>
      <LayoutHeader>
        <Header />
      </LayoutHeader>
      <Content style={{ minHeight: "calc(100vh - 330px)" }}>{children}</Content>
      <LayoutFooter>
        <Footer />
      </LayoutFooter>
    </Layout>
  );
}
