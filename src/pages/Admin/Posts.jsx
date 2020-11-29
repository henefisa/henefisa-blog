import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Table from "../../components/Table";
import moment from "moment";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "Desciption",
    dataIndex: "desciption",
    key: "desciption"
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content"
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: data => moment.unix(data.createdAt.seconds).format("ll")
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: data => data.tags.map(tag => <span key={tag}>{tag}</span>)
  },
  {
    title: "Manage",
    key: "manage",
    className: "w-1/10",
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

export default function Posts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMount = true;
    (async () => {
      const data = (await firebase.firestore().collection("posts").get()).docs.map(dt => ({
        key: dt.id,
        ...dt.data()
      }));
      console.log(data);
      isMount && setData(data);
    })();
    return () => {
      isMount = false;
    };
  }, []);

  return (
    <div className="p-3 container mx-auto">
      <Table columns={columns} dataSource={data} heading="Posts" />
    </div>
  );
}
