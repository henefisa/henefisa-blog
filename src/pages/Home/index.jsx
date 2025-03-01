import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "../../components/Silder/index";
import { Layout, Content, Sider, Container, Section } from "../../components/Layout/index";
// import SmallPost from "../../components/Post/Small";
import TagList from "../../components/Tags/index";
import Box from "../../components/Box";
import Avatar from "react-avatar";
import { Categories, Category } from "../../components/Category";
import firebase from "firebase";
import ListPost from "../../components/Post/ListPosts";
import { Link } from "react-router-dom";

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

const RestyleContainer = styled(Container)`
  .home-sider {
    display: none;
  }
  @media screen and (min-width: 992px) {
    .home-sider {
      display: block;
    }
    .home-content {
      padding-right: 25px;
    }
  }
`;

export default function Home() {
  const [tags, setTags] = useState([]);
  const [adminInfo, setAdminInfo] = useState({});
  const getTags = useCallback(isMount => {
    firebase
      .firestore()
      .collection("tags")
      .orderBy("frequency", "desc")
      .where("frequency", ">", 0)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.docs.forEach(doc => data.push({ id: doc.id, data: doc.data() }));
        isMount && setTags(data);
      });
  }, []);

  const getAdminInfo = useCallback(isMount => {
    firebase
      .firestore()
      .collection("users")
      .doc("admin")
      .get()
      .then(doc => {
        isMount && setAdminInfo(doc.data());
      });
  }, []);

  useEffect(() => {
    let isMount = true;
    getTags(isMount);
    getAdminInfo(isMount);
    return () => {
      isMount = false;
    };
  }, [getTags, getAdminInfo]);

  return (
    <>
      <Slider />
      <RestyleContainer>
        <Section style={{ paddingBottom: 0 }}>
          <TagList />
        </Section>
        <Section>
          <Layout>
            <Content className="home-content">
              <ListPost />
            </Content>
            <Sider style={{ paddingLeft: "25px" }} boxWidth="355" className="home-sider">
              <SidebarBox>
                <h6 className="title">About me</h6>
                {adminInfo.avatar && <Avatar src={adminInfo.avatar} size={100} round style={{ marginBottom: 10 }} />}
                <p>{adminInfo.description}</p>
              </SidebarBox>
              <SidebarBox>
                <h6 className="title">Categories</h6>
                <Categories>
                  {tags.map(tag => (
                    <Category key={tag.id}>
                      <Link
                        to={`/tags?filter=${tag.data.name}`}
                        style={{ color: "var(--secondary-color)", fontWeight: 400 }}
                      >
                        <span>{tag.data.name}</span>
                        <span>{tag.data.frequency}</span>
                      </Link>
                    </Category>
                  ))}
                </Categories>
              </SidebarBox>
              {/* <SidebarBox>
                <h6 className="title">Popular posts</h6>
                <SmallPost />
                <SmallPost />
                <SmallPost />
              </SidebarBox> */}
              <SidebarBox>
                <h6 className="title">Tags</h6>
                <ul className="tags">
                  {tags.map(tag => (
                    <li key={tag.id}>
                      <Link to={`/tags?filter=${tag.data.name}`} style={{ color: "var(--secondary-color)" }}>
                        {tag.data.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </SidebarBox>
            </Sider>
          </Layout>
        </Section>
      </RestyleContainer>
    </>
  );
}
