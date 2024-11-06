import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/home/index.vue";
import PuzzlePage from "../pages/puzzle/index.vue";
import PuzzleGamePage from "../pages/puzzle/game.vue";
import GoogleMeetPage from "../pages/google_meet/index.vue";
import LandingPage from "../pages/landingPage/index.vue";
// test
const routes = [
  {
    path: "/app",
    name: "home",
    component: HomePage,
    meta: {
      requiresAuth: true,
      requirePasien: true,
      title: "ZQDevs - Home",
    },
  },
  {
    path: "/",
    name: "landingPage",
    component: LandingPage,
    meta: {
      requiresAuth: true,
      requirePasien: true,
      title: "ZQDevs - Home",
    },
  },
  {
    path: "/puzzle",
    name: "puzzle",
    component: PuzzlePage,
    meta: {
      requiresAuth: true,
      requirePasien: true,
      title: "ZQDevs - Home",
    },
  },
  {
    path: "/puzzle/play",
    name: "game",
    component: PuzzleGamePage,
    meta: {
      requiresAuth: true,
      requirePasien: true,
      title: "ZQDevs - Home",
    },
  },
  {
    path: "/google_meet",
    name: "google_meet",
    component: GoogleMeetPage,
    meta: {
      requiresAuth: true,
      requirePasien: true,
      title: "ZQDevs - Home",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

// router.beforeEach((to, from, next) => {
//   document.title = `RS MOBILE ${to.meta.title} | RS - By ZQDevs`;
//   const authStore = useAuthStore();
//   const isAuthenticated = authStore.isLoggedIn;
//   const userRole = authStore.user?.role?.name || "";

//   console.log(isAuthenticated, userRole);

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // If route requires authentication
//     if (isAuthenticated) {
//       // User is authenticated
//       if (to.matched.some((record) => record.meta.requirePasien)) {
//         // Route requires "pasien" role
//         if (userRole === "pasien") {
//           next(); // User has the correct role
//         } else {
//           next("/permission_denied"); // Redirect to a different page instead of looping to "/login"
//         }
//       } else {
//         next(); // Proceed to route
//       }
//     } else {
//       next("/login"); // User is not authenticated, redirect to login
//     }
//   } else {
//     // Route does not require authentication
//     if (isAuthenticated) {
//       // If authenticated, check the role
//       if (userRole === "pasien") {
//         next("/app"); // Redirect to the appropriate page if already authenticated
//       } else if (userRole === "admin") {
//         next("/permission_denied"); // Redirect "pasien" user to their dashboard
//       } else if (userRole === "dokter") {
//         next("/permission_denied"); // Redirect "pasien" user to their dashboard
//       } else {
//         next(); // Allow access to non-auth routes
//       }
//     } else {
//       next(); // Allow access to non-auth routes
//     }
//   }
// });

export default router;
