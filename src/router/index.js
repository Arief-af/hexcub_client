import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/home/index.vue";
import PuzzlePage from "../pages/puzzle/index.vue";
import PuzzleGamePage from "../pages/puzzle/game.vue";
import GoogleMeetPage from "../pages/google_meet/index.vue";
import LandingPage from "../pages/landingPage/index.vue";
import LoginPage from "../pages/auth/login.vue";
import VerifPage from "../pages/auth/verif.vue";
import ForgotPassword from "../pages/auth/forgot-password.vue";
import ResetPassword from "../pages/auth/reset-password.vue";
import RegisterPage from "../pages/auth/register.vue";
import unauthorizedPage from "@/pages/auth/unauthorized.vue";
import coursePage from "@/pages/courses/index.vue";
import constractionPage from "@/pages/auth/constraction.vue";
// test
const routes = [
  {
    path: "/unauthorized",
    name: "/unauthorized",
    component: unauthorizedPage,
    meta: {
      requiredAuth: false,
      requiredAdmin: false,
      requiredMentor: false,
      title: "Unauthorized",
    },
  },
  {
    path: "/courses",
    name: "/courses",
    component: coursePage,
    meta: {
      requiredAuth: false,
      requiredAdmin: false,
      requiredMentor: false,
      title: "Courses",
    },
  },
  {
    path: "/constraction",
    name: "/constraction",
    component: constractionPage,
    meta: {
      requiredAuth: false,
      requiredAdmin: false,
      requiredMentor: false,
      title: "constraction",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      requiredAuth: false,
      requiredAdmin: false,
      requiredMentor: false,
      title: "Login",
    },
  },
  {
    path: "/verify-email",
    name: "verify-email",
    component: VerifPage,
    meta: {
      requiredAuth: false,
      requiredAdmin: false,
      requiredMentor: false,
      title: "verif",
    },
  },
  {
    path: "/forgot-password",
    name: "forgot password",
    component: ForgotPassword,
    meta: {
      requiredAuth: false,
      requiredAdmin: false,
      requiredMentor: false,
      title: "forgot password",
    },
  },
  {
    path: "/reset-password",
    name: "reset password",
    component: ResetPassword,
    meta: {
      requiredAuth: false,
      requiredAdmin: false,
      requiredMentor: false,
      title: "reset password",
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: {
      requiredAuth: false,
      requiredAdmin: false,
      requiredMentor: false,
      title: "Register",
    },
  },
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
