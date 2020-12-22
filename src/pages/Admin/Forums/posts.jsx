import { Card, Divider, Skeleton } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import NotFoundPage from "../../404";
import Replies from "../../../components/Replies";
import { unix } from "moment";
import WriteReply from "../../../components/WriteReply";

export default function Posts() {
  const { name, postId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(data);
  useEffect(() => {
    let isMount = true;
    (async () => {
      try {
        setLoading(true);
        const thread = await firebase.firestore().collection("forums_threads").doc(name).get();
        if (!thread.exists) throw new Error("");

        const post = await firebase.firestore().collection("forums_posts").doc(postId).get();
        if (!post.exists) throw new Error("");

        isMount && setData({ postRef: post.ref, threadRef: thread.ref, ...post.data() });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      isMount = false;
    };
  }, [postId, name]);

  const reloadReplies = useCallback(newReply => {
    setData(prevState => ({ ...prevState, replies: [...prevState.replies, newReply] }));
  }, []);

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <div style={{ padding: 20 }}>
      <Card>
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
            <WriteReply postRef={data?.postRef} reload={reloadReplies} />
          </>
        )}
      </Card>
    </div>
  );
}
