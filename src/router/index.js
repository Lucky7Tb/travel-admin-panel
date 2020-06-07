import Vue from "vue";
import VueRouter from "vue-router";
import secureLocalStorage from "secure-ls";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const LocalStorage = new secureLocalStorage();

const storage = LocalStorage.get("AdminData");

const routes = [
  // App Route
  {
    path: "",
    component: () => import("@/layout/AppLayout.vue"),
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("@/views/pages/app/Dashboard.vue")
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/pages/app/About.vue")
      },
      {
        path: "/destination",
        name: "destination",
        component: () =>
          import("@/views/pages/app/master-data/destination/Index.vue")
      },
      {
        path: "/destination-create",
        name: "destination-create",
        component: () =>
          import("@/views/pages/app/master-data/destination/Create.vue")
      },
      {
        path: "/destination/:id",
        name: "destination-update",
        component: () =>
          import("@/views/pages/app/master-data/destination/Update.vue")
      },
      {
        path: "/tourpackage",
        name: "tourpackage",
        component: () =>
          import("@/views/pages/app/master-data/tour-package/Index.vue")
      },
      {
        path: "/tourpackage-create",
        name: "tourpackage-create",
        component: () =>
          import("@/views/pages/app/master-data/tour-package/Create.vue")
      },
      {
        path: "/tourpackage/:id",
        name: "tourpackage-update",
        component: () =>
          import("@/views/pages/app/master-data/tour-package/Update.vue")
      },
      {
        path: "/tourpackageschedule",
        name: "tourpackageschedule",
        component: () =>
          import("@/views/pages/app/master-data/tour-package-schedule/Index.vue")
      },
      {
        path: "/tourpackageschedule-create",
        name: "tourpackageschedule-create",
        component: () =>
          import("@/views/pages/app/master-data/tour-package-schedule/Create.vue")
      },
      {
        path: "/tourpackageschedule/:id",
        name: "tourpackageschedule-update",
        component: () =>
          import("@/views/pages/app/master-data/tour-package-schedule/Update.vue")
      }
    ]
  },
  // Auth Route
  {
    path: "",
    component: () => import("@/layout/AuthLayout.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/pages/auth/Login.vue")
      }
    ]
  },
  // Error Route
  {
    path: "*",
    component: () => import("@/views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  hash: false,
  routes
});

function isLogin() {
  let token = JSON.parse(storage);
  return storage && token.token != null;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isLogin()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
