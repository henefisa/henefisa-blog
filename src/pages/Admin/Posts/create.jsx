import React, { memo } from "react";
import { Button, Card } from "antd";
import PostForm from "../../../forms/Post";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

function CreatePost() {
  const history = useHistory();
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
      <PostForm data={{ type: "new", post: {} }} />
    </Card>
  );
}

export default memo(CreatePost);
