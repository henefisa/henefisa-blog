import { Button, Card } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import PostForm from "../../../forms/Post";
import firebase from "firebase";
import { ArrowLeftOutlined } from "@ant-design/icons";

function EditUser() {
  const [data, setData] = useState({
    type: "edit",
    data: null,
    id: ""
  });
  const history = useHistory();
  const { postId } = useParams();

  useEffect(() => {
    (async () => {
      const data = await firebase.firestore().collection("posts").doc(postId).get();
      setData({ type: "edit", post: data.data(), id: postId });
    })();
  }, [postId]);

  return (
    <Card style={{ maxWidth: 600, margin: "40px auto", padding: "0 15px" }}>
      <Button
        onClick={() => history.goBack()}
        type="link"
        icon={<ArrowLeftOutlined />}
        style={{ display: "flex", alignItems: "center", paddingLeft: 0 }}
      >
        Go Back
      </Button>
      <PostForm data={data} />
    </Card>
  );
}

export default memo(EditUser);
