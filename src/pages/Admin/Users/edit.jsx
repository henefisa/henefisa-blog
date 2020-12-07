import { Button, Card } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import UserForm from "../../../forms/User";
import { ArrowLeftOutlined } from "@ant-design/icons";
import firebase from "firebase";

function EditUser() {
  const { userId } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    type: "edit",
    user: null,
    id: ""
  });

  useEffect(() => {
    (async () => {
      const data = await firebase.firestore().collection("users").doc(userId).get();
      setData({ type: "edit", user: data.data(), id: userId });
    })();
  }, [userId]);

  return (
    <Card style={{ maxWidth: 500, margin: "40px auto" }}>
      <Button
        onClick={() => history.goBack()}
        type="link"
        icon={<ArrowLeftOutlined />}
        style={{ display: "flex", alignItems: "center", paddingLeft: 0 }}
      >
        Go Back
      </Button>
      <UserForm data={data} />
    </Card>
  );
}

export default memo(EditUser);
