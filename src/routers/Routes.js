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
    role: "admin",
    children: [
      {
        path: "/admin",
        component: () => <Redirect to="/admin/dashboard" />,
        exact: true,
        role: "admin"
      },
      {
        path: "/admin/dashboard",
        component: lazy(() => import("../pages/Admin/Dashboard")),
        exact: true,
        role: "admin"
      },
      {
        path: "/admin/users/create",
        exact: true,
        component: lazy(() => import("../pages/Admin/Users/create")),
        role: "admin"
      },
      {
        path: "/admin/users/edit/:userId",
        exact: true,
        component: lazy(() => import("../pages/Admin/Users/edit")),
        role: "admin"
      },
      {
        path: "/admin/users",
        exact: true,
        component: lazy(() => import("../pages/Admin/Users/index")),
        role: "admin"
      },
      {
        path: "/admin/posts/create",
        exact: true,
        component: lazy(() => import("../pages/Admin/Posts/create")),
        role: "admin"
      },
      {
        path: "/admin/posts/edit/:postId",
        exact: true,
        component: lazy(() => import("../pages/Admin/Posts/edit")),
        role: "admin"
      },
      {
        path: "/admin/posts",
        exact: true,
        component: lazy(() => import("../pages/Admin/Posts/index")),
        role: "admin"
      },
      {
        path: "/admin/messages",
        exact: true,
        component: lazy(() => import("../pages/Admin/Messages/index")),
        role: "admin"
      },
      {
        path: "",
        component: lazy(() => import("../pages/403/index"))
      }
    ]
  },
  {
    path: "/",
    layout: BasicLayout,
    role: "",
    children: [
      {
        path: "/tags",
        exact: true,
        component: lazy(() => import("../pages/Tags/index")),
        role: "user"
      },
      {
        path: "/user/:userId",
        exact: true,
        component: lazy(() => import("../pages/Profile/index")),
        role: "user"
      },
      {
        path: "/login",
        exact: true,
        component: lazy(() => import("../pages/Login/index")),
        role: "user"
      },
      {
        path: "/register",
        exact: true,
        component: lazy(() => import("../pages/Register/index")),
        role: "user"
      },
      {
        path: "/blog/:id",
        exact: true,
        component: lazy(() => import("../pages/Blog/BlogPost")),
        role: "user"
      },
      {
        path: "/blog",
        exact: true,
        component: lazy(() => import("../pages/Blog/index")),
        role: "user"
      },
      {
        path: "/about",
        exact: true,
        component: lazy(() => import("../pages/About/index")),
        role: "user"
      },
      {
        path: "/contact",
        exact: true,
        component: lazy(() => import("../pages/Contact/index")),
        role: "user"
      },
      {
        path: "/",
        exact: true,
        component: lazy(() => import("../pages/Home/index")),
        role: "user"
      },
      {
        path: "",
        component: lazy(() => import("../pages/404/index"))
      }
    ]
  }
];
