import React, { useEffect, useState } from "react";
import { Card, Col, Row, Skeleton, Statistic } from "antd";
import firebase from "firebase";

const queries = ["forums_categories", "forums_threads", "forums_posts"];
const names = ["Categories", "Threads", "Posts"];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Forums() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMount = true;

    (async () => {
      setLoading(true);
      const promises = queries.map(async path => (await firebase.firestore().collection(path).get()).size);
      const data = await Promise.all(promises);
      isMount && setData(data);
      isMount && setLoading(false);
    })();

    return () => {
      isMount = false;
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Skeleton active loading={loading} />
        <Row gutter={[16, 16]}>
          {data.map((dt, index) => {
            return (
              <Col span={24} md={12} lg={8} key={index}>
                <Card style={{ background: "#eee" }}>
                  <Statistic
                    title={capitalizeFirstLetter(names[index])}
                    value={dt}
                    valueStyle={{ color: "#3f8600" }}
                    style={{ fontSize: 24 }}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
}
