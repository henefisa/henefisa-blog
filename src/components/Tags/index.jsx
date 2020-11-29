import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import HoverBox from "../HoverBox/index";
// import { Container } from "../Layout/index";
import firebase from "firebase";
import { Link } from "react-router-dom";

// const Item = styled.div`
//   flex: 0 1 345px;
//   height: 220px;
// `;

// const Title = styled.h6`
//   font-size: 0.875rem;
//   font-weight: 300;
//   padding: 10px 16px;
//   background-color: #fff;
//   letter-spacing: 1px;
//   text-transform: uppercase;
// `;

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
    <div className="flex justify-center md:justify-between align-center flex-wrap md:space-x-7">
      {tags.map((tag, index) => (
        <div key={index} className="w-full mb-5 h-40 md:flex-1 ">
          <HoverBox url={`https://picsum.photos/345/220?random=${index}`}>
            <Content center>
              <h6 className="bg-white p-2 uppercase font-grey-400">
                <Link to={`/tags?filter=${tag.data.name}`}>{tag.data.name}</Link>
              </h6>
            </Content>
          </HoverBox>
        </div>
      ))}
    </div>
  );
}
