import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "../components/Silder/index";
import { Layout, Content, Sider, Container, Section } from "../components/Layout/index";
import SmallPost from "../components/Post/Small";
import TagList from "../components/Tags/index";
import Box from "../components/Box";
import Avatar from "../components/Avatar";
import { Categories, Category } from "../components/Category";
import firebase from "firebase";
import ListPost from "../components/Post/ListPosts";

const SidebarBox = styled(Box)`
  border: 1px solid #e3e6e9;
  border-radius: 2px;
  margin-bottom: 20px;
  text-align: center;
  .title {
    font-size: 0.875rem;
    font-weight: 400;
    text-align: center;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 30px;
  }

  p {
    font-size: 15px;
    color: var(--secondary-color);
  }

  .tags {
    text-align: left;
    li {
      color: var(--secondary-color);
      margin: 0 3px 6px 0;
      display: inline-block;
      background: #eff2f5;
      padding: 5px 10px;
      font-size: 14px;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        background: #e5e8eb;
        color: #131517;
      }
    }
  }
`;

export default function Home() {
  const [tags, setTags] = useState([]);

  const getTags = useCallback(() => {
    firebase
      .firestore()
      .collection("tag")
      .orderBy("frequency", "desc")
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.docs.forEach(doc => data.push({ id: doc.id, data: doc.data() }));
        setTags(data);
      });
  }, []);

  useEffect(() => {
    getTags();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Slider />
      <Container>
        <Section style={{ paddingBottom: 0 }}>
          <TagList />
        </Section>
        <Section>
          <Layout>
            <Content style={{ paddingRight: "25px" }}>
              <ListPost />
            </Content>
            <Sider style={{ paddingLeft: "25px" }} boxWidth="355">
              <SidebarBox>
                <h6 className="title">About me</h6>
                <Avatar src="/blog-classic-avatar.jpg" size="large" center />
                <p>
                  Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </p>
              </SidebarBox>
              <SidebarBox>
                <h6 className="title">Categories</h6>
                <Categories>
                  {tags.map(tag => (
                    <Category key={tag.id}>
                      <span>{tag.data.name}</span>
                      <span>{tag.data.frequency}</span>
                    </Category>
                  ))}
                </Categories>
              </SidebarBox>
              <SidebarBox>
                <h6 className="title">Popular posts</h6>
                <SmallPost />
                <SmallPost />
                <SmallPost />
              </SidebarBox>
              <SidebarBox>
                <h6 className="title">Tags</h6>
                <ul className="tags">
                  {tags.map(tag => (
                    <li key={tag.id}>{tag.data.name}</li>
                  ))}
                </ul>
              </SidebarBox>
            </Sider>
          </Layout>
        </Section>
      </Container>
    </>
  );
}
