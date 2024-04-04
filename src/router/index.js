import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore, useAlertStore } from '@/stores';
import HomeView from "../views/HomeView.vue";


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    { path: "/", component: HomeView },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/formUser",
      name: "formUser",
      component: () => import("../views/AddUserView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/NewRegisterView.vue"),
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../views/CustomersView.vue"),
    },

    // catch all redirect to home page
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach(async (to) => {
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return "/login";
  }
});

