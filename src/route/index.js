import { createRouter, createWebHistory } from "vue-router";
import { createGuard } from "./guard";
import { routes } from "./routes";

export const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app) {
  createGuard(router);
  app.use(router);
}
