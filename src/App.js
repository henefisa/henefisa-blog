import React, { useEffect, useState } from "react";
import MainRouter from "./routers";
import { AuthContext } from "./context/Auth";
import "./App.css";
import firebase from "firebase";

function App() {
  const [user, setUser] = useState({
    data: {},
    ref: null,
    id: ""
  });

  useEffect(() => {
    const cleanup = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .where("email", "==", user.email)
          .onSnapshot(snapshot => {
            const user = snapshot.docs[0];
            setUser({ data: user.data(), ref: user.ref, id: user.id });
          });
      } else {
        setUser({ data: {}, ref: null });
      }
      return () => cleanup();
    });
  }, []);
  return (
    <AuthContext.Provider value={[user, setUser]}>
      <MainRouter />
    </AuthContext.Provider>
  );
}

export default App;
