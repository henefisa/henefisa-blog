import React from "react";
import styled from "styled-components";
import Slider from "../components/Silder/index";
import { Layout, Content, Sider, Container } from "../components/Layout/index";
import Post from "../components/Post/index";
import SmallPost from "../components/Post/Small";
import TagList from "../components/Tags/index";
import Box from "../components/Box";
import Avatar from "../components/Avatar";
import { Categories, Category } from "../components/Category";

const Section = styled.section`
  padding-top: 100px;
`;

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
`;

export default function Home() {
  return (
    <>
      <Slider />
      <Container>
        <Section>
          <TagList />
        </Section>
        <Section>
          <Layout>
            <Content style={{ paddingRight: "25px" }}>
              <Post />
              <Post />
              <Post />
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
                  <Category>
                    <span>Art</span>
                    <span>12</span>
                  </Category>
                  <Category>
                    <span>Fashion</span>
                    <span>15</span>
                  </Category>
                  <Category>
                    <span>Lifestyle</span>
                    <span>17</span>
                  </Category>
                  <Category>
                    <span>Nature</span>
                    <span>11</span>
                  </Category>
                </Categories>
              </SidebarBox>
              <SidebarBox>
                <h6 className="title">Popular posts</h6>
                <SmallPost />
                <SmallPost />
                <SmallPost />
              </SidebarBox>
            </Sider>
          </Layout>
        </Section>
      </Container>
    </>
  );
}
