import React, { useState } from "react";
import { Button, Card, Form, Input, notification } from "antd";
import firebase from "firebase";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleFinish = async values => {
    setLoading(true);
    try {
      const { email, message } = values;
      firebase
        .firestore()
        .collection("messages")
        .add({ email, message, createdAt: firebase.firestore.Timestamp.now() });
      notification.success({ message: "Your message has been sent!" });
    } catch (err) {
      console.log(err);
      notification.error({ message: "Something went wrong. Please try again!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Contact" style={{ maxWidth: 500, margin: "40px auto" }}>
      <Form onFinish={handleFinish}>
        <Form.Item
          label="Your email"
          labelCol={{ span: 24 }}
          rules={[
            { required: true, message: "Your email is required!" },
            { type: "email", message: "Invalid email address" }
          ]}
          name="email"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Your message"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: "Please enter your message!" }]}
          name="message"
        >
          <Input.TextArea />
        </Form.Item>
        <Button htmlType="submit" loading={loading}>
          Send
        </Button>
      </Form>
    </Card>
  );
}
