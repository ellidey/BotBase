import store from "@/state/store";

export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/login.vue"),
    meta:  { title: "Login",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
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
  {
    path: "/logout",
    name: "logout",
    meta: {
      title: "Logout", authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          store.dispatch("auth/logOut");
        } else {
          store.dispatch("authfack/logout");
        }
        const authRequiredOnPreviousRoute = routeFrom.matched.some((route) =>
          route.push("/login")
        );
        // Navigate back to previous page, or home as a fallback
        next(
          authRequiredOnPreviousRoute ? { name: "default" } : { ...routeFrom }
        );
      },
    },
    component: () => import("../views/auth/logout/basic")
  },
];