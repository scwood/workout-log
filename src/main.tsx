import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import "./main.css";
import { App } from "./components/App";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBYwaTqcUzMbf2X13Q2y0KhQKi2gSXP4bk",
  authDomain: "workout-log-9e0e6.firebaseapp.com",
  projectId: "workout-log-9e0e6",
  storageBucket: "workout-log-9e0e6.appspot.com",
  messagingSenderId: "922535398142",
  appId: "1:922535398142:web:9cc99956ea03fdedbf33af",
  measurementId: "G-H8MH0K1235",
});

getAuth(firebaseApp);
getFirestore(firebaseApp);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
