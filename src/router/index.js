import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/home/index.vue";
import PuzzlePage from "../pages/puzzle/index.vue";
import PuzzleGamePage from "../pages/puzzle/game.vue";
import GoogleMeetPage from "../pages/google_meet/index.vue";
import GoogleMeetAdminPage from "../pages/google_meet/create.vue";
import LandingPage from "../pages/landingPage/index.vue";
import LoginPage from "../pages/auth/login.vue";
import VerifPage from "../pages/auth/verif.vue";
import ForgotPassword from "../pages/auth/forgot-password.vue";
import ResetPassword from "../pages/auth/reset-password.vue";
import RegisterPage from "../pages/auth/register.vue";
import unauthorizedPage from "@/pages/auth/unauthorized.vue";
import coursePage from "@/pages/courses/index.vue";
import courseShowPage from "@/pages/courses/show.vue";
import courseEditPage from "@/pages/courses/edit.vue";
import courseAdminPage from "@/pages/courses/indexAdmin.vue";
import constractionPage from "@/pages/auth/constraction.vue";
import Profile from "@/pages/profile/index.vue";
import ContactPage from "@/pages/contact/indexAdmin.vue";
// admin

import MateriPage from "@/pages/courses/create.vue";
import { useAuthStore } from "../stores/authStore";
const routes = [
  {
    path: "/courses/create",
    name: "coursesCreate",
    component: MateriPage,
    meta: {
      requiredAuth: true,
      requiredAdmin: true,
      requiredMentor: false,
      title: "Buat Materi",
    },
  },
  {
    path: "/courses/:id",
    name: "coursesShow",
    component: courseShowPage,
    meta: {
      requiredAuth: true,
      requiredAdmin: false,
      requiredMentor: false,
      title: "Materi",
    },
  },
  {
    path: "/courses/:id/edit",
    name: "coursesEdit",
    component: courseEditPage,
    meta: {
      requiredAuth: true,
      requiredAdmin: true,
      requiredMentor: false,
      title: "Edit Materi",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiredAuth: true,
      requiredAdmin: false,
      requiredMentor: false,
      title: "Profile",
    },
  },
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
      requiredAuth: true,
      requiredAdmin: false,
      requiredMentor: false,
      title: "Courses",
    },
  },
  {
    path: "/courses/admin",
    name: "/courses/admin",
    component: courseAdminPage,
    meta: {
      requiredAuth: true,
      requiredAdmin: true,
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
      requiredAuth: true,
      title: "ZQDevs - Home",
    },
  },
  {
    path: "/",
    name: "landingPage",
    component: LandingPage,
    meta: {
      requiredAuth: false,
      requirePasien: false,
      title: "ZQDevs - Home",
    },
  },
  {
    path: "/puzzle",
    name: "puzzle",
    component: PuzzlePage,
    meta: {
      requiredAuth: true,
      title: "ZQDevs - Home",
    },
  },
  {
    path: "/puzzle/play",
    name: "game",
    component: PuzzleGamePage,
    meta: {
      requiredAuth: true,
      requirePasien: true,
      title: "ZQDevs - Home",
    },
  },
  {
    path: "/google_meet",
    name: "google_meet",
    component: GoogleMeetPage,
    meta: {
      requiredAuth: true,
      requirePasien: true,
      title: "ZQDevs - Home",
    },
  },
  {
    path: "/google_meet/admin",
    name: "google_meet/admin",
    component: GoogleMeetAdminPage,
    meta: {
      requiredAuth: true,
      requiredAdmin: true,
      requirePasien: true,
      title: "ZQDevs - Home",
    },
  },
  {
    path: "/contact/admin",
    name: "contact/admin",
    component: ContactPage,
    meta: {
      requiredAuth: true,
      requiredAdmin: true,
      requirePasien: true,
      title: "Contact",
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Cek jika pengguna sudah login
  if (authStore.isLoggedIn) {
    const userRole = authStore.user?.role?.toLowerCase() || 'defaultRole';;

    // Jika pengguna sudah login dan mencoba mengakses halaman login, arahkan ke halaman yang sesuai
    if (to.path === '/login' || to.path === '/register') {
      // Redirect berdasarkan peran
      if (userRole === 'admin') {
        return next({ path: '/courses/admin' }); // Redirect ke Learning Camp untuk admin atau mentor
      } else {
        return next({ path: '/courses' }); // Redirect ke profile untuk peserta biasa
      }
    }
  }

  // Cek jika rute memerlukan autentikasi
  if (to.meta.requiredAuth) {
    // Jika pengguna tidak terautentikasi, arahkan ke halaman login
    if (!authStore.isLoggedIn) {
      return next({ path: '/login' }); // Ganti dengan rute halaman login Anda
    }

    // Cek peran pengguna
    const userRole = authStore.user?.role ? authStore.user.role.toLowerCase() : ''; // Atur ke string kosong jika null
    // console.log(userRole);

    // Tambahkan logika untuk memeriksa akses untuk admin dan mentor
    const isAdmin = userRole === 'admin';

    // Cek apakah rute memerlukan admin dan mentor
    if (to.meta.requiredAdmin && to.meta.requiredMentor) {
      if (!isAdmin && !isMentor) {
        return next({ path: '/unauthorized' }); // Ganti dengan rute halaman tidak berwenang Anda
      }
    } else if (to.meta.requiredAdmin && !isAdmin) {
      return next({ path: '/unauthorized' }); // Ganti dengan rute halaman tidak berwenang Anda
    } else if (to.meta.requiredMentor && !isMentor) {
      return next({ path: '/unauthorized' }); // Ganti dengan rute halaman tidak berwenang Anda
    }
  }

  // Izinkan akses ke rute
  next();
});

export default router;
