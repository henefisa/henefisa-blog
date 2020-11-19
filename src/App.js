import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog/index";
import TransparentHeaderLayout from "./layouts/TransparentHeaderLayout";
import BlogPost from "./pages/Blog/BlogPost";
import "./App.css";

function App() {
  return (
    <>
      <TransparentHeaderLayout>
        <BrowserRouter>
          <Switch>
            <Route path="/blog/:id" component={BlogPost} />
            <Route path="/blog" component={Blog} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </TransparentHeaderLayout>
    </>
  );
}

export default App;
