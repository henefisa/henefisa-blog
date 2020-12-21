import React, { useEffect, useState } from "react";
import { Card, Divider, List, Skeleton, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import NotFoundPage from "../404/index";
import firebase from "firebase";

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

export default function Threads() {
  const { name } = useParams();
  const [data, setData] = useState({ name: "", posts: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMount = true;
    (async () => {
      try {
        setLoading(true);
        const data = await firebase.firestore().collection("forums_threads").doc(name).get();
        if (!data.exists) {
          throw new Error("");
        }
        isMount && setData(data.data());
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      isMount = false;
    };
  }, [name]);

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <Card style={{ maxWidth: 1200, margin: "40px auto" }}>
      <Skeleton loading={loading} active />
      {!loading && (
        <>
          <Divider orientation="left">{data?.name}</Divider>
          <List
            dataSource={data?.posts}
            bordered
            renderItem={item => (
              <List.Item key={item.postKey}>
                <Thread>
                  <Link to={`/forums/${name}/${item.postKey}`}>
                    <Typography.Text>{item.title}</Typography.Text>
                  </Link>
                  <div className="stats">
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
      )}
    </Card>
  );
}
