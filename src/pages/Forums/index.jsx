import React, { useEffect, useState } from "react";
import { Card, Divider, List, Typography, Skeleton } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import firebase from "firebase";
import NotFoundPage from "../404";
const Thread = styled.div`
  width: 100%;
  .stats {
    display: flex;
    dl {
      display: flex;
      margin: 0 10px 0 0;
      dt {
        margin: 0 5px 0 0;
      }
      dd {
        margin: 0;
      }
    }
  }
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default function Forums() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMount = true;
    (async () => {
      try {
        setLoading(true);
        const response = await firebase.firestore().collection("forums_categories").get();
        if (response.empty) {
          throw new Error("");
        }
        const data = response.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log(data);

        isMount && setData(data);
      } catch (error) {
        setError(true);
      } finally {
        isMount && setLoading(false);
      }
    })();
    return () => {
      isMount = false;
    };
  }, []);

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <Card style={{ maxWidth: 1200, margin: "40px auto" }}>
      <Skeleton loading={loading} active />
      {data.map(category => (
        <>
          <Divider orientation="left" style={{ fontSize: "1.125rem" }}>
            {category.name}
          </Divider>
          <List
            bordered
            dataSource={category.categories}
            renderItem={item => (
              <List.Item key={item.key}>
                <Thread>
                  <Link to={`/forums/${item.key}`}>
                    <Typography.Text strong style={{ fontSize: "1rem" }}>
                      {item.title}
                    </Typography.Text>
                  </Link>
                  <div className="stats">
                    <dl>
                      <dt>Threads</dt>
                      <dd>{item.threadsCount}</dd>
                    </dl>
                    <dl>
                      <dt>Replies</dt>
                      <dd>{item.repliesCount}</dd>
                    </dl>
                  </div>
                </Thread>
              </List.Item>
            )}
          />
        </>
      ))}
    </Card>
  );
}
