import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Button, Card, Popconfirm, Space, Table } from "antd";
import { Link } from "react-router-dom";

export default function Users() {
  const [data, setData] = useState([]);

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
      render: data => {
        if (data.key === "admin") return null;
        return (
          <Space>
            <Button>
              <Link to={`/admin/users/edit/${data.key}`}>Edit</Link>
            </Button>
            <Popconfirm onConfirm={() => handleDeleteUser(data.key)} title="Are you sure to delete this user?">
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        );
      }
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
          <Button>
            <Link to="/admin/users/create">Create User</Link>
          </Button>
        </div>
        <Table columns={columns} dataSource={data} style={{ fontWeight: 600, overflow: "auto" }} sticky />
      </Card>
    </div>
  );
}
