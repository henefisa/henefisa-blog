import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "../components/Loading";

export default function RouterComponent({ route }) {
  return (
    <route.layout>
      {route.children ? (
        <Suspense fallback={<Loading />}>
          <Switch>
            {route.children.map((child, index) => (
              <Route key={index} exact={child.exact} path={child.path} component={child.component} />
            ))}
          </Switch>
        </Suspense>
      ) : (
        <route.component />
      )}
    </route.layout>
  );
}
