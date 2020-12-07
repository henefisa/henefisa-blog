import React from "react";
import { useLocation } from "react-router-dom";
import { Section } from "../../components/Layout";
import ListPost from "../../components/Post/ListPosts";

export default function Tags() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  return (
    <Section>
      <ListPost filter={query.get("filter")} />
    </Section>
  );
}
