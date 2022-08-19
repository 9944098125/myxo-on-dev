import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";
import setAuthToken from "./Utils/SetAuthToken";
import BaseRoutes from "./Routing/routes";

function App() {
  //setting auth token in headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <BaseRoutes />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
