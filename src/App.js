import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog/index";
import BasicLayout from "./layouts/BasicLayout";
import BlogPost from "./pages/Blog/BlogPost";
import "./App.css";

function App() {
  return (
    <>
      <BasicLayout>
        <BrowserRouter>
          <Switch>
            <Route path="/blog/:id" component={BlogPost} />
            <Route path="/blog" component={Blog} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </BasicLayout>
    </>
  );
}

export default App;
