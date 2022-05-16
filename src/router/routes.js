// import store from "@/state/store";

export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/login.vue"),
    meta:  { title: "Login" },
  },
  {
    path: "/",
    name: "default",
    meta: {
      title: "Dashboard",
      authRequired: true,
    },
    component: () => import("../views/panel/dashboard/index.vue"),
  },
  {
    path: "/bots",
    name: "bots",
    meta: {
      title: "Bots",
      authRequired: true,
    },
    component: () => import("../views/panel/bots/index.vue"),
  },
  {
    path: "/bots/edit",
    name: "edit_bot",
    meta: {
      title: "Bots",
      authRequired: true,
    },
    component: () => import("../views/panel/bots/edit.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    meta: {
      title: "settings",
      authRequired: true,
    },
    component: () => import("../views/panel/settings/index.vue"),
  },
  {
    path: "/users",
    name: "users",
    meta: {
      title: "users",
      authRequired: true,
    },
    component: () => import("../views/panel/users/index.vue"),
  },

  { path: "/:catchAll(.*)", component: import("../views/errors/404-basic.vue") }
];