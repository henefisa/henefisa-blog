import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase";
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css';
export const firebaseConfig = {
  apiKey: "AIzaSyDye_pFD-_cOmjlUUoKEkw4_CBU_JarYzg",
  authDomain: "henefisa-blog.firebaseapp.com",
  databaseURL: "https://henefisa-blog.firebaseio.com",
  projectId: "henefisa-blog",
  storageBucket: "henefisa-blog.appspot.com",
  messagingSenderId: "141816023065",
  appId: "1:141816023065:web:f3ec134462a1cb29c8c288",
  measurementId: "G-D15R1MV8E6"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
