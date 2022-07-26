export const routes = [
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    isHidden: true,
    meta: {
      title: "Login",
    },
  },
  {
    name: "404",
    path: "/404",
    component: () => import("@/views/error-pages/404.vue"),
    isHidden: true,
    meta: {
      title: "404",
    },
  },
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
          icon: "mdi:table",
          access: "a",
        },
      },
      {
        name: "Unocss",
        path: "unocss",
        component: () => import("@/views/unocss/index.vue"),
        meta: {
          title: "unocss",
          access: "b",
        },
      },
      {
        name: "Table",
        path: "table",
        component: () => import("@/views/table/index.vue"),
        meta: {
          title: "table",
          icon: "mdi:table",
          access: "c",
        },
      },
    ],
  },
];
