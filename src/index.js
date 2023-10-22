import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./authProvider";
import { SessionIDProvider } from "./sessionIdProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SessionIDProvider>
          <App />
        </SessionIDProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
