import React, { useEffect, useState } from "react";
import firebase from "firebase";

function Box({ name, count }) {
  return (
    <div className="p-10 mx-auto w-full max-w-sm text-center shadow-lg rounded bg-green-600">
      <h2 className="text-3xl text-gray-50 capitalize">{name}</h2>
      <p className="text-3xl text-yellow-200 mt-3">{count}</p>
    </div>
  );
}

const collections = ["users", "posts", "tag"];

export default function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    let isMount = true;
    (async () => {
      const data = (
        await Promise.all(collections.map(collection => firebase.firestore().collection(collection).get()))
      ).map((dt, idx) => ({ [collections[idx]]: dt.docs.length }));
      isMount && setData(data);
    })();
    return () => {
      isMount = false;
    };
  }, []);

  return (
    <div className="p-3 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map(dt => {
          const [key, count] = Object.entries(dt)[0];
          return <Box name={key} key={key} count={count} />;
        })}
      </div>
    </div>
  );
}
