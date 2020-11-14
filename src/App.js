import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import BasicLayout from "./layouts/BasicLayout.jsx";
import "./App.css";

function App() {
  return (
    <>
      <BasicLayout>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </BasicLayout>
    </>
  );
}

export default App;
