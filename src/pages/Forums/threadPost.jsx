import { Card, Divider, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Replies from "../../components/Replies";
import WriteReply from "../../components/WriteReply";
import firebase from "firebase";
import { unix } from "moment";
import NotFoundPage from "../404";

export default function ThreadPost() {
  const { postId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMount = true;
    (async () => {
      try {
        setLoading(true);
        const response = await firebase.firestore().collection("forums_posts").doc(postId).get();
        console.log(response.data())
        if (!response.exists) {
          throw new Error("");
        }
        isMount && setData(response.data());
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      isMount = false;
    };
  }, [postId]);

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <Card style={{ maxWidth: 1200, margin: "40px auto" }}>
      <Skeleton loading={loading} active />
      {!loading && (
        <>
          <Divider orientation="left">{data?.name}</Divider>
          <Replies
            author={data?.author}
            content={data?.content}
            createdAt={unix(data?.createdAt?.seconds).format("ll")}
          />
          {data?.replies?.map((reply, index) => (
            <Replies
              key={index}
              author={reply.author}
              content={reply.content}
              createdAt={unix(reply.createdAt.seconds).format("ll")}
            />
          ))}
          <WriteReply />
        </>
      )}
    </Card>
  );
}
