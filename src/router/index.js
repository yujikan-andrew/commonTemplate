import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import Layout from "@/layout";

const routers = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    hidden: true
  },
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/home/index"),
        name: "home",
        meta: { 
          title: "首页", 
          icon: "gongzuotai",
        },
      },
    ],
  },
  {
    path: "/index",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/index/index"),
        name: "index",
        meta: { 
          title: "功能页", 
          icon: "juese",
        },
      },
    ],
  },
  { path: "*", redirect: "/home", hidden: true },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routers,
  });

const router = createRouter();


export default router;
