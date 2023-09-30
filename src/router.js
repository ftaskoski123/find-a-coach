import { createRouter, createWebHistory } from "vue-router";
import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import RequestsReceived from "./pages/requests/RequestsReceived.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import NotFound from "./pages/NotFound.vue";
import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList, meta: { title: "Coaches" } },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [{ path: "contact", component: ContactCoach }],
      meta: {
        title: "Contact Coach",
      },
    },
    {
      path: "/register",
      component: CoachRegistration,
      meta: { requiresAuth: true, title: "Register as a Coach" },
    },
    {
      path: "/requests",
      component: RequestsReceived,
      meta: { requiresAuth: true, title: "Requests Received" },
    },
    {
      path: "/auth",
      component: UserAuth,
      meta: { requiresUnauth: true, title: "Authentication" },
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});
router.beforeEach(function (to, _, next) {
  document.title = `${to.meta.title} | Find a Coach`;
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});
export default router;
