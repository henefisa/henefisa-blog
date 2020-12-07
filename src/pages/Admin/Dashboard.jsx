import React, { useEffect, useState } from "react";
import TagCloud from "../../components/TagCloud/index";
import firebase from "firebase";
import { Card, Col, Row, Statistic } from "antd";

const collections = ["users", "posts", "tags"];

async function getTags() {
  return (await firebase.firestore().collection("tags").get()).docs.map(tag => {
    const data = tag.data();
    return {
      text: data.name,
      value: data.frequency
    };
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let isMount = true;
    (async () => {
      const data = (
        await Promise.all(collections.map(collection => firebase.firestore().collection(collection).get()))
      ).map((dt, idx) => ({ [collections[idx]]: dt.docs.length }));
      const tags = await getTags();
      isMount && setData(data);
      isMount && setTags(tags);
    })();
    return () => {
      isMount = false;
    };
  }, []);

  return (
    <Card style={{ margin: 15 }}>
      <Row gutter={[16, 16]}>
        {data.map(dt => {
          const [key, count] = Object.entries(dt)[0];
          return (
            <Col span={24} md={12} lg={8} key={key}>
              <Card style={{ background: "#eee" }}>
                <Statistic
                  title={capitalizeFirstLetter(key)}
                  value={count}
                  valueStyle={{ color: "#3f8600" }}
                  style={{ fontSize: 24 }}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
      <div>
        <h1 style={{ margin: "20px 30px", fontSize: 24 }}>Tags</h1>
        <TagCloud data={tags} />
      </div>
    </Card>
  );
}
