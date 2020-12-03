import React, { useEffect, useState } from "react";
import firebase from "firebase";
import moment from "moment";
import { Button, Card, Modal, Popconfirm, Space, Table, Tag } from "antd";
import { toast } from "react-toastify";
import PostForm from "../../forms/Post";

const defaultFormData = {
  type: "new",
  post: {}
};

export default function Posts() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [visible, setVisible] = useState(false);

  const handleDeletePost = id => {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => toast.success("Deleted!"));
  };

  const closeModal = () => setVisible(false);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Desciption",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: data => {
        return (
          <div
            style={{ wordBreak: "break-word", maxWidth: 500, overflow: "auto" }}
            dangerouslySetInnerHTML={{ __html: data }}
          />
        );
      }
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: data => moment.unix(data?.seconds).format("ll")
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: tags =>
        tags?.map(tag => {
          const tagElement = <Tag>{tag}</Tag>;
          return <span style={{ display: "inline-block" }}>{tagElement}</span>;
        })
    },
    {
      title: "Manage",
      key: "manage",
      render: data => (
        <Space>
          <Button
            onClick={() => {
              setVisible(true);
              setFormData({
                type: "edit",
                post: data
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm onConfirm={() => handleDeletePost(data.key)} title="Are you sure to delete this post?">
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  useEffect(() => {
    let isMount = true;
    (async () => {
      firebase
        .firestore()
        .collection("posts")
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
          <h1 style={{ fontSize: 24 }}>Posts</h1>
          <Button
            onClick={() => {
              setVisible(true);
              setFormData({ type: "new", post: {} });
            }}
          >
            Create Post
          </Button>
        </div>
        <Table columns={columns} dataSource={data} style={{ fontWeight: 600, overflow: "auto" }} />
      </Card>
      <Modal footer={null} visible={visible} onCancel={closeModal} destroyOnClose>
        <PostForm data={formData} closeModal={closeModal} />
      </Modal>
    </div>
  );
}
