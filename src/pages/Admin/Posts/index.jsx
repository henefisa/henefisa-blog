import React, { memo, useEffect, useState } from "react";
import firebase from "firebase";
import moment from "moment";
import { Button, Card, notification, Popconfirm, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";

function Posts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDeletePost = async id => {
    setLoading(true);
    try {
      const ref = firebase.firestore().collection("posts").doc(id);
      const data = (await ref.get()).data();
      const tagsRef = firebase.firestore().collection("tags");
      data.commentsRef.delete();
      Promise.all(
        data?.tags?.map(async tag => {
          const ref = (await tagsRef.where("name", "==", tag).get()).docs[0]?.ref;
          ref?.update({ frequency: firebase.firestore.FieldValue.increment(-1) });
        })
      );
      ref.delete();
      notification.success({ message: "Deleted!" });
    } catch (err) {
      console.log(err);
      notification.error({ message: "Something went wrong. Please try again!" });
    } finally {
      setLoading(false);
    }
  };

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
            style={{ wordBreak: "break-word", maxWidth: 500, maxHeight: 500, overflow: "auto" }}
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
        tags?.map((tag, index) => {
          const tagElement = <Tag>{tag}</Tag>;
          return (
            <span key={index} style={{ display: "inline-block" }}>
              {tagElement}
            </span>
          );
        })
    },
    {
      title: "Manage",
      key: "manage",
      render: data => (
        <Space>
          <Button>
            <Link to={`/admin/posts/edit/${data.key}`}>Edit</Link>
          </Button>
          <Popconfirm onConfirm={() => handleDeletePost(data.key)} title="Are you sure to delete this post?">
            <Button danger loading={loading}>
              Delete
            </Button>
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
          <Button>
            <Link to="/admin/posts/create">Create Post</Link>
          </Button>
        </div>
        <Table columns={columns} dataSource={data} style={{ fontWeight: 600, overflow: "auto" }} />
      </Card>
    </div>
  );
}

export default memo(Posts);
