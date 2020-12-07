import React, { useEffect, useState } from "react";
import { Avatar, Card } from "antd";
import firebase from "firebase";

const { Meta } = Card;

export default function About() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    let isMount = true;
    (async () => {
      const data = await firebase.firestore().collection("users").doc("admin").get();
      isMount && setAdmin(data.data());
    })();
    return () => {
      isMount = false;
    };
  }, []);

  return (
    <Card style={{ maxWidth: 500, margin: "40px auto" }} cover={<img alt="cover" src={admin?.cover} />}>
      <Meta
        avatar={<Avatar size="large" src={admin?.avatar} />}
        title={admin?.firstName + " " + admin?.lastName}
        description={admin?.description}
      />
      <p style={{ marginTop: 10 }}>
        Hello, my name is Nghia. I am 20 years old. Glad to see you here! Please contact me if you have any question
        about this page.
      </p>
    </Card>
  );
}
