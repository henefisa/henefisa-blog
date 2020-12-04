import React, { memo } from "react";
import { Button, Card } from "antd";
import UserForm from "../../../forms/User";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

function CreateUser() {
  const history = useHistory();
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
      <UserForm data={{ type: "new", user: {} }} />
    </Card>
  );
}

export default memo(CreateUser);
