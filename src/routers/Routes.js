// import { lazy } from "react";
// import BasicLayout from "../layouts/BasicLayout";

import { lazy } from "react";
import { Redirect } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import BasicLayout from "../layouts/BasicLayout";

export const routes = [
  {
    path: "/admin",
    layout: AdminLayout,
    children: [
      {
        path: "/admin",
        component: () => <Redirect to="/admin/dashboard" />,
        exact: true
      },
      {
        path: "/admin/dashboard",
        component: lazy(() => import("../pages/Admin/Dashboard")),
        exact: true
      },
      {
        path: "/admin/users",
        exact: true,
        component: lazy(() => import("../pages/Admin/Users"))
      },
      {
        path: "/admin/posts",
        exact: true,
        component: lazy(() => import("../pages/Admin/Posts"))
      }
    ]
  },
  {
    path: "/",
    layout: BasicLayout,
    children: [
      {
        path: "/tags",
        exact: true,
        component: lazy(() => import("../pages/Tags/index"))
      },
      {
        path: "/user/:userId",
        exact: true,
        component: lazy(() => import("../pages/Profile/index"))
      },
      {
        path: "/login",
        exact: true,
        component: lazy(() => import("../pages/Login/index"))
      },
      {
        path: "/register",
        exact: true,
        component: lazy(() => import("../pages/Register/index"))
      },
      {
        path: "/blog/:id",
        exact: true,
        component: lazy(() => import("../pages/Blog/BlogPost"))
      },
      {
        path: "/blog",
        exact: true,
        component: lazy(() => import("../pages/Blog/index"))
      },
      {
        path: "/",
        exact: true,
        component: lazy(() => import("../pages/Home/index"))
      }
    ]
  }
];
