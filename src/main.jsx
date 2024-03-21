import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EmployeeProvider } from "./context/EmployeeContext.jsx";
import { ClientProvider } from "./context/ClientContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <EmployeeProvider>
        <ClientProvider>
          <App />
        </ClientProvider>
      </EmployeeProvider>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
