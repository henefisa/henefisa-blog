import React from "react";
import Banner from "../../components/Banner/index";
import { Section } from "../../components/Layout";
import Pagination from "../../components/Pagination";
import Post from "../../components/Post";

export default function Blog() {
  return (
    <>
      <Banner />
      <Section>
        <Post />
        <Post />
        <Post />
        <Pagination total={30} />
      </Section>
    </>
  );
}
