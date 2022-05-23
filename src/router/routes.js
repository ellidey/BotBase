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
    component: () => import("../views/botbase/dashboard/index.vue"),
  },
  {
    path: "/bots",
    name: "bots",
    meta: {
      title: "Bots",
      authRequired: true,
    },
    component: () => import("../views/botbase/bots/index.vue"),
  },
  {
    path: "/bots/edit",
    name: "edit_bot",
    meta: {
      title: "Bots",
      authRequired: true,
    },
    component: () => import("../views/botbase/bots/edit.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    meta: {
      title: "settings",
      authRequired: true,
    },
    component: () => import("../views/botbase/settings/index.vue"),
  },
  {
    path: "/users",
    name: "users",
    meta: {
      title: "users",
      authRequired: true,
    },
    component: () => import("../views/botbase/users/index.vue"),
  },
  {
    path: "/monitorings/bots",
    name: "monitorings-bots",
    meta: {
      title: "bots",
      authRequired: true,
    },
    component: () => import("../views/monitorings/bots/index.vue"),
  },
  {
    path: "/monitorings/bots/edit/:id",
    name: "monitorings-bots-edit",
    meta: {
      title: "bots",
      authRequired: true,
    },
    component: () => import("../views/monitorings/bots/edit.vue"),
  },
  {
    path: "/monitorings/bots/create",
    name: "monitorings-bots-create",
    meta: {
      title: "bots",
      authRequired: true,
    },
    component: () => import("../views/monitorings/bots/create.vue"),
  },

  { path: "/:catchAll(.*)", component: import("../views/errors/404-basic.vue") }
];