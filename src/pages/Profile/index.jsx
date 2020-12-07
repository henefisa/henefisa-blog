import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useAuth } from "../../context/Auth";
import { Button, Card, Col, Form, Input, notification, Row, Spin } from "antd";

export default function Profile() {
  const { userId } = useParams();
  const [user] = useAuth();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    data: {},
    id: ""
  });

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot(doc => setUserData({ id: doc.id, data: doc.data() }));
  }, [userId]);

  const handleFinish = async values => {
    try {
      if (user.id !== userData.id) throw new Error("Invalid user id!");
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          ...values
        });
      notification.success({ message: "Updated profile!" });
    } catch (err) {
      notification.error({ message: "Something went wrong. Please try again!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ margin: "50px auto", maxWidth: 500 }}>
      {!userData.id && (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      )}
      {userData.id && <h1 style={{ textAlign: "center" }}>{userData.data.firstName + " " + userData.data.lastName}</h1>}
      <Row>
        <Col span={24}>
          {userData.id && (
            <Form
              initialValues={{ firstName: userData.data.firstName, lastName: userData.data.lastName }}
              onFinish={handleFinish}
            >
              <Form.Item
                label="First name"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "First name is required!" }]}
                name="firstName"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last name"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Last name is required!" }]}
                name="lastName"
              >
                <Input />
              </Form.Item>
              {user.id === userData.id && (
                <Button loading={loading} style={{ float: "right" }} htmlType="submit">
                  Save
                </Button>
              )}
            </Form>
          )}
        </Col>
      </Row>
    </Card>
  );
}
