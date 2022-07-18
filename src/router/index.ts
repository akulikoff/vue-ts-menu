import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/menu",
    name: "menu",
    component: () => import("../components/Menu.vue")
  },
  {
    path: "/dish/:id",
    name: "dish-details",
    component: () => import("../components/DishDetails.vue")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/AddDish.vue")
  }
];
const router = new VueRouter({
 // mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;