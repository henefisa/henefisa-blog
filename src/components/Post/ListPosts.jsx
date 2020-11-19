import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase";
import Post from ".";
import Pagination from "../Pagination";

const limit = 5;

function nextPage(last) {
  return firebase.firestore().collection("posts").orderBy("createdAt", "desc").startAfter(last).limit(limit);
}

function prevPage(first) {
  return firebase.firestore().collection("posts").orderBy("createdAt", "desc").endBefore(first).limit(limit);
}

async function getSize() {
  return await firebase
    .firestore()
    .collection("posts")
    .get()
    .then(snapshot => snapshot.size);
}

export default function ListPost() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const total = useRef(0);
  const last = useRef(null);
  const first = useRef(null);
  const lastPage = useRef(page);
  const handleChange = p => {
    lastPage.current = page;
    setPage(p);
  };

  useEffect(() => {
    if (!last.current) return;
    if (page > lastPage.current) {
      nextPage(last.current)
        .get()
        .then(snapshot => {
          const data = [];
          snapshot.docs.forEach(doc => data.push({ id: doc.id, data: doc.data() }));
          last.current = snapshot.docs[snapshot.docs.length - 1];
          first.current = snapshot.docs[0];
          setPosts(data);
        });
    } else if (page < lastPage.current) {
      prevPage(first.current)
        .get()
        .then(snapshot => {
          const data = [];
          snapshot.docs.forEach(doc => data.push({ id: doc.id, data: doc.data() }));
          last.current = snapshot.docs[snapshot.docs.length - 1];
          first.current = snapshot.docs[0];
          setPosts(data);
        });
    }
  }, [page]);

  useEffect(() => {
    (async () => {
      total.current = await getSize();
    })();
    firebase
      .firestore()
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.docs.forEach(doc => data.push({ id: doc.id, data: doc.data() }));
        last.current = snapshot.docs[snapshot.docs.length - 1];
        first.current = snapshot.docs[0];
        setPosts(data);
      });
  }, []);

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          title={post.data.title}
          description={post.data.description}
          date={post.data.createdAt}
          tags={post.data.tags}
          id={post.id}
        />
      ))}
      <Pagination total={total.current} onChange={handleChange} pageSize={limit} />
    </div>
  );
}
