export const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: {
      name: "Dashboard",
    },
    children: [
      {
        name: "Dashboard",
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "Dashboard",
        },
      },
      {
        name: "Unocss",
        path: "unocss",
        component: () => import("@/views/unocss/index.vue"),
        meta: {
          title: "unocss",
        },
      },
    ],
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    isHidden: true,
    meta: {
      title: "Login",
    },
  },
];
