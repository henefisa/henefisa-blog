import React, { useState } from "react";
import firebase from "firebase";
import { firebaseConfig } from "../index";
import { Button, Form, Input, message } from "antd";
import { useHistory } from "react-router-dom";

let secondApp = null;

export default function UserForm({ data }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const onFinish = async values => {
    setLoading(true);
    try {
      if (data.type === "new") {
        if (!secondApp) secondApp = firebase.initializeApp(firebaseConfig, "secondary");
        const authUser = await secondApp.auth().createUserWithEmailAndPassword(values.email, values.password);
        await firebase.firestore().collection("users").doc(authUser.user.uid).set({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName
        });
        message.success("Create user success!");
        await secondApp.auth().signOut();
        history.push("/admin/users");
      } else if (data.type === "edit") {
        await firebase.firestore().collection("users").doc(data.id).update({
          firstName: values.firstName,
          lastName: values.lastName
        });
        message.success("Updated!");
        history.push("/admin/users");
      }
    } catch (err) {
      console.log(err.code);
      let error = "Something went wrong!";
      switch (err.code) {
        case "auth/email-already-in-use":
          error = "The email address is already in use by another account.";
          break;
        case "auth/weak-password":
          error = "Password should be at least 6 characters";
          break;
        default:
          message.error(error);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return data.user ? (
    <Form onFinish={onFinish} initialValues={{ firstName: data?.user?.firstName, lastName: data?.user?.lastName }}>
      {data.type === "new" && (
        <>
          <Form.Item label="Email" labelCol={{ span: 24 }} name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" labelCol={{ span: 24 }} name="password">
            <Input.Password placeholder="Password" />
          </Form.Item>
        </>
      )}
      <Form.Item label="First Name" labelCol={{ span: 24 }} name="firstName">
        <Input placeholder="Fist Name" />
      </Form.Item>
      <Form.Item label="Last Name" labelCol={{ span: 24 }} name="lastName">
        <Input placeholder="Last Name" />
      </Form.Item>
      <div style={{ textAlign: "right" }}>
        <Button htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </Form>
  ) : null;
}
