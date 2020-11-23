import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HoverBox from "../HoverBox/index";
import { Container } from "../Layout/index";
import firebase from "firebase";

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
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let isMount = true;
    firebase
      .firestore()
      .collection("tag")
      .orderBy("frequency", "desc")
      .limit(3)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.docs.forEach(doc => data.push({ id: doc.id, data: doc.data() }));
        isMount && setTags(data);
      });
    return () => {
      isMount = false;
    };
  }, []);

  return (
    <Container flex={{ justify: "space-between", align: "center", wrap: "wrap" }}>
      {tags.map((tag, index) => (
        <Item key={index}>
          <HoverBox url={`https://picsum.photos/345/220?random=${index}`}>
            <Content center>
              <Title>{tag.data.name}</Title>
            </Content>
          </HoverBox>
        </Item>
      ))}
    </Container>
  );
}
