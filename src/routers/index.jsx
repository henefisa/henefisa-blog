import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import RouterComponent from "./RouterComponent";
import Loading from "../components/Loading/index";
import { routes } from "./Routes";

export default function MainRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {routes.map((route, index) =>
          route.layout ? (
            <Route path={route.path} component={() => <RouterComponent route={route} />} key={index} />
          ) : (
            <Route path={route.path} component={route.component} key={index} />
          )
        )}
      </Switch>
    </Suspense>
  );
}
