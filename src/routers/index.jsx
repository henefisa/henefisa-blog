import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// import RouterComponent from "./RouterComponent";
import Loading from "../components/Loading/index";
import BasicLayout from "../layouts/BasicLayout";
// import { routes } from "./Routes";

export default function MainRouter() {
  return (
    <BasicLayout>
      <Suspense fallback={<Loading />}>
        <Switch>
          {/* {routes.map((route, index) =>
            route.layout ? (
              <Route path={route.path} component={() => <RouterComponent route={route} />} key={index} />
            ) : (
              <Route path={route.path} component={route.component} key={index} />
            )
          )} */}
          <Route path="/login" component={lazy(() => import("../pages/Login/index"))} exact />
          <Route path="/register" component={lazy(() => import("../pages/Register/index"))} exact />
          <Route path="/blog/:id" component={lazy(() => import("../pages/Blog/BlogPost"))} exact />
          <Route path="/blog" component={lazy(() => import("../pages/Blog/index"))} exact />
          <Route path="/" component={lazy(() => import("../pages/Home/index"))} exact />
        </Switch>
      </Suspense>
    </BasicLayout>
  );
}
