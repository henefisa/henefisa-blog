import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { useForm } from "antd/lib/form/Form";

export default function Register() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const handleFinish = async values => {
    setLoading(true);
    try {
      const { firstName, lastName, email, password } = values;
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase
        .firestore()
        .collection("users")
        .add({
          firstName,
          lastName,
          email,
          role: ["user"]
        });
      history.push("/");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          notification.error({ message: "Email is used by another account!" });
          form.setFields([
            {
              name: "email",
              errors: ["Email is used by another account!"]
            }
          ]);
          break;
        default:
          notification.error({ message: "Something went wrong. please try again!" });
          console.log(err);
          break;
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Row justify="center" style={{ padding: "50px 0" }}>
      <Col span={24} sm={12} md={8}>
        <Card title="Register">
          <Form onFinish={handleFinish} form={form}>
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
            <Form.Item
              label="First Name"
              name="firstName"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "First name is required!" }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Last name is required!" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <Button htmlType="submit" loading={loading}>
                Register
              </Button>
              <Button type="link">
                <Link to="/login">Already have an account? Login now</Link>
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
