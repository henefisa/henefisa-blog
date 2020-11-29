import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Table from "../../components/Table/index";

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
    className: "w-1/5",
    render: () => (
      <>
        <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
          Edit
        </button>
        <button className="px-5 py-2 ml-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none">
          Delete
        </button>
      </>
    )
  }
];

export default function User() {
  const [data, setData] = useState([]);

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
    <div className="p-3 container mx-auto">
      <Table columns={columns} dataSource={data} heading="Users" />
    </div>
  );
}
