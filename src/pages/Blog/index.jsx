import React from "react";
import Banner from "../../components/Banner/index";
import { Container, Section } from "../../components/Layout";
import ListPost from "../../components/Post/ListPosts";

export default function Blog() {
  return (
    <>
      <Banner />
      <Container>
        <Section>
          <ListPost />
        </Section>
      </Container>
    </>
  );
}
