import React, { useEffect, useState } from "react";
import firebase from "firebase";
import User from "../../forms/User";
import { Button, Card, Modal, Popconfirm, Space, Table } from "antd";

const defaultFormData = {
  type: "",
  user: ""
};

export default function Users() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const handleDeleteUser = id => {
    console.log(id);
    //need firebase admin
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName"
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName"
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
                user: data
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm onConfirm={() => handleDeleteUser(data.key)} title="Are you sure to delete this user?">
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];
  useEffect(() => {
    let isMount = true;
    (async () => {
      const data = (await firebase.firestore().collection("users").get()).docs.map(dt => ({
        key: dt.id,
        ...dt.data()
      }));
      isMount && setData(data);
    })();

    return () => {
      isMount = false;
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h1 style={{ fontSize: 24 }}>Users</h1>
          <Button
            onClick={() => {
              setVisible(true);
              setFormData({ type: "new", user: {} });
            }}
          >
            Create User
          </Button>
        </div>
        <Table columns={columns} dataSource={data} style={{ fontWeight: 600, overflow: "auto" }} sticky />
      </Card>
      <Modal footer={null} visible={visible} onCancel={closeModal} destroyOnClose>
        <User data={formData} closeModal={closeModal} />
      </Modal>
    </div>
  );
}
