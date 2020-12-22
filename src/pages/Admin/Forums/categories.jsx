import React, { useEffect, useState } from "react";
import {
  Card,
  Divider,
  Skeleton,
  Typography,
  List,
  Button,
  Form,
  Input,
  notification,
  Modal,
  Select,
  Space
} from "antd";
import firebase from "firebase";
import { Link } from "react-router-dom";

export default function Categories() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [threadVisible, setThreadVisible] = useState(false);

  useEffect(() => {
    let isMount = true;
    (async () => {
      setLoading(true);
      firebase
        .firestore()
        .collection("forums_categories")
        .onSnapshot(snapshot => {
          const data = [];
          snapshot.docs.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
          isMount && setData(data);
        });

      isMount && setLoading(false);
    })();
    return () => {
      isMount = false;
    };
  }, []);

  const handleAddThread = async values => {
    try {
      setLoading(true);
      const path = values.threadName.toLowerCase().trim().split(" ").join("-");
      const response = await firebase.firestore().collection("forums_threads").doc(path).get();
      if (response.exists) {
        throw new Error("Thread is already exist!");
      }
      const categoryRef = (await firebase.firestore().collection("forums_categories").doc(values.category).get()).ref;

      await firebase.firestore().collection("forums_threads").doc(path).set({ name: values.threadName, categoryRef });
      await categoryRef.update({
        categories: firebase.firestore.FieldValue.arrayUnion({
          createdAt: firebase.firestore.Timestamp.now(),
          key: path,
          repliesCount: 0,
          threadCount: 1,
          title: values.threadName
        })
      });
      notification.success({ message: "Success!" });
      setThreadVisible(false);
    } catch (error) {
      notification.error({ message: error.toString() });
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async values => {
    try {
      setLoading(true);
      await firebase
        .firestore()
        .collection("forums_categories")
        .add({ name: values.categoryName, createdAt: firebase.firestore.Timestamp.now() });
      notification.success({ message: "Success!" });
    } catch (error) {
      notification.error({ message: error.toString() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Skeleton active loading={loading} />
        <Space style={{ float: "right" }}>
          <Button onClick={() => setVisible(true)}>Create Category</Button>
          <Button onClick={() => setThreadVisible(true)}>Create Thread</Button>
        </Space>
        {data.map(category => (
          <>
            <Divider orientation="left" style={{ fontSize: "1.125rem" }}>
              {category.name}
            </Divider>
            <List
              bordered
              dataSource={category.categories}
              renderItem={item => (
                <List.Item key={item.key}>
                  <div>
                    <Link to={`/admin/forums/categories/${item.key}`}>
                      <Typography.Text strong style={{ fontSize: "1rem" }}>
                        {item.title}
                      </Typography.Text>
                    </Link>
                  </div>
                </List.Item>
              )}
            />
          </>
        ))}
      </Card>
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)} destroyOnClose>
        <Form onFinish={handleFinish}>
          <Form.Item
            label="Category name"
            labelCol={{ span: 24 }}
            name="categoryName"
            rules={[{ required: true, message: "Category name is required!" }]}
          >
            <Input />
          </Form.Item>
          <Button htmlType="submit" loading={loading}>
            Sumbit
          </Button>
        </Form>
      </Modal>
      <Modal visible={threadVisible} footer={null} onCancel={() => setThreadVisible(false)} destroyOnClose>
        <Form onFinish={handleAddThread}>
          <Form.Item
            name="category"
            label="Category"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select>
              {data.map(category => (
                <Select.Option key={category.id}>{category.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Thread name"
            labelCol={{ span: 24 }}
            name="threadName"
            rules={[{ required: true, message: "Thread name is required" }]}
          >
            <Input />
          </Form.Item>
          <Button htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
