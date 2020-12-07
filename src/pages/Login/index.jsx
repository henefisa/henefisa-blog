import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { Button, Card, Col, Form, Input, notification, Row } from "antd";

export default function Login() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleFinish = async values => {
    setLoading(true);
    const { email, password } = values;
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      notification.success({ message: "Welcome back!" });
      history.goBack();
    } catch (error) {
      if (error) {
        notification.error({ message: "Wrong email or password!" });
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Row justify="center" style={{ padding: "50px 0" }}>
      <Col span={24} sm={12} md={8}>
        <Card title="Login">
          <Form onFinish={handleFinish}>
            <Form.Item
              label="Email"
              labelCol={{ span: 24 }}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required!"
                },
                {
                  type: "email",
                  message: "Invalid email address!"
                }
              ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
              label="Password"
              labelCol={{ span: 24 }}
              name="password"
              rules={[
                { required: true, message: "Password is required!" },
                { min: 6, message: "Password is require more than 6 characters!" }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <Button htmlType="submit" loading={loading}>
                Login
              </Button>
              <Button type="link">
                <Link to="/register">Create an account!</Link>
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
