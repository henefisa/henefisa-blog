import React, { useEffect, useState } from "react";
import { Card, Divider, Skeleton, Typography, List, notification, Modal, Button, Space, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import firebase from "firebase";
import { Editor } from "@tinymce/tinymce-react";
import { useAuth } from "../../../context/Auth";

export default function Threads() {
  const { name } = useParams();
  const [data, setData] = useState({ name: "", posts: [], categoryRef: null });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
  const [user] = useAuth();

  useEffect(() => {
    let isMount = true;
    (async () => {
      try {
        setLoading(true);
        firebase
          .firestore()
          .collection("forums_threads")
          .doc(name)
          .onSnapshot(dt => isMount && setData(dt.data()));
      } catch (error) {
        notification.error({ message: error.toString() });
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      isMount = false;
    };
  }, [name]);

  const onEditorChange = content => {
    setContent(content);
  };

  const handleCreatePost = async values => {
    try {
      setLoading(true);
      const data = {
        name: values.title,
        author: user.data.firstName + " " + user.data.lastName,
        authorRef: user.ref,
        content,
        createdAt: firebase.firestore.Timestamp.now(),
        replies: []
      };
      //create post
      const res = await firebase.firestore().collection("forums_posts").add(data);
      await firebase
        .firestore()
        .collection("forums_threads")
        .doc(name)
        .update({
          posts: firebase.firestore.FieldValue.arrayUnion({ repliesCount: 0, title: values.title, postKey: res.id })
        });
      notification.success({ message: "Success!" });
      setVisible(false);
    } catch (error) {
      notification.error({ message: error.toString() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Skeleton loading={loading} active />
        <Space style={{ float: "right" }}>
          <Button onClick={() => setVisible(true)}>Create Post</Button>
        </Space>
        {!loading && (
          <>
            <Divider orientation="left">{data?.name}</Divider>
            <List
              dataSource={data?.posts}
              bordered
              renderItem={item => (
                <List.Item key={item.postKey}>
                  <Link to={`/admin/forums/categories/${name}/${item.postKey}`}>
                    <Typography.Text>{item.title}</Typography.Text>
                  </Link>
                </List.Item>
              )}
            />
          </>
        )}
      </Card>
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)} destroyOnClose>
        <Card>
          <Form onFinish={handleCreatePost}>
            <Form.Item
              label="Title"
              labelCol={{ span: 24 }}
              name="title"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input />
            </Form.Item>
            <Editor
              onEditorChange={onEditorChange}
              apiKey="davs32c4wf30584psf5idrb5oy0cyz9x6beobu56o2hskebn"
              value={content}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist autolink lists link charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount"
                ],
                toolbar: `undo redo | formatselect | bold italic forecolor backcolor removeformat xhtmlxtras | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help`
              }}
            />
            <Button htmlType="submit" style={{ float: "right", marginTop: 10 }}>
              Submit
            </Button>
          </Form>
        </Card>
      </Modal>
    </div>
  );
}
