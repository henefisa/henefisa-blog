import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Input, Modal, notification, Popconfirm, Space, Table } from "antd";
import firebase from "firebase";
import moment from "moment";

export default function Messages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const id = useRef(null);
  const handleDeleteMessage = async id => {
    setLoading(true);
    try {
      await firebase.firestore().collection("messages").doc(id).delete();
      notification.success({ message: "Message deleted!" });
    } catch (err) {
      console.log(err);
      notification.error({ message: "Something went wrong. Please try again!" });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message"
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: data => <span>{moment.unix(data.seconds).format("ll")}</span>
    },
    {
      title: "Manage",
      key: "manage",
      render: data => (
        <Space>
          <Button
            onClick={() => {
              setVisible(true);
              id.current = data.key;
            }}
          >
            Reply
          </Button>
          <Popconfirm title="Are you sure to delete this message?" onConfirm={() => handleDeleteMessage(data.key)}>
            <Button danger loading={loading}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const handleFinish = values => {
    //need firebase admin
    console.log(id, values);
    setVisible(false);
  };

  useEffect(() => {
    let isMount = true;
    (async () => {
      firebase
        .firestore()
        .collection("messages")
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(dt => ({
            key: dt.id,
            ...dt.data()
          }));
          isMount && setData(data);
        });
    })();
    return () => {
      isMount = false;
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h1 style={{ fontSize: 24 }}>Message</h1>
        </div>
        <Table columns={columns} dataSource={data} style={{ fontWeight: 600, overflow: "auto" }} />
      </Card>
      <Modal title="Reply" footer={null} onCancel={() => setVisible(false)} visible={visible} destroyOnClose>
        <Form onFinish={handleFinish}>
          <Form.Item
            label="Your reply message"
            labelCol={{ span: 24 }}
            name="replyMessage"
            rules={[{ required: true, message: "Your reply is required!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Button htmlType="submit">Reply</Button>
        </Form>
      </Modal>
    </div>
  );
}
