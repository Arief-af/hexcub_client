<template>
  <section class="w-screen h-screen dark:bg-[#262626] bg-[#FFF] flex">
    <section
      class="z-20 hidden w-[93px] bg-primary md:flex items-center flex-col gap-5 pt-[29px] h-full md:relative fixed left-0"
    >
      <div class="w-full h-[300px] mt-[44px]"></div>
      <div class="flex flex-col gap-3">
        <div
          v-if="!isAdmin"
          :class="route == '/profile' ? 'bg-primary' : 'bg-white' "
           @click="$router.push('/profile')"
          class="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center shadow"
        >
           <svg :class="route == '/profile' ? 'fill-white' : 'fill-primary'" class=" w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"/></svg>
        </div>
        <div
          v-if="!isAdmin"
          :class="route == '/courses' ? 'bg-primary' : 'bg-white'"
           @click="$router.push('/courses')"
          class="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center shadow"
        >
          <svg :class="route == '/courses' ? 'fill-white' : 'fill-primary'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z"/><path d="M8 6h9v2H8z"/></svg>
        </div>
        <div
          v-else
          :class="route == '/courses/admin' ? 'bg-primary' : 'bg-white'"
           @click="$router.push('/courses/admin')"
          class="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center shadow"
        >
        <svg :class="route == '/courses/admin' ? 'fill-white' : 'fill-primary'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z"/><path d="M8 6h9v2H8z"/></svg>
        </div>
        <div
          v-if="!isAdmin"
          :class="route == '/puzzle' ? 'bg-primary' : 'bg-white'"
           @click="$router.push('/puzzle')"
          class="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center shadow"
        >
          <svg :class="route == '/puzzle' ? 'fill-white' : 'fill-primary'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"/><circle cx="8" cy="8" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="16" cy="16" r="1.5"/></svg>
        </div>
        <div
          v-if="!isAdmin"
          :class="route == '/google_meet' ? 'bg-primary' : 'bg-white'"
           @click="$router.push('/google_meet')"
          class="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center shadow"
        >
        <svg :class="route == '/google_meet' ? 'fill-white' : 'fill-primary'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 7c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-3.333L22 17V7l-4 3.333V7zm-1.998 10H4V7h12l.001 4.999L16 12l.001.001.001 4.999z"/></svg>
        </div>
        <div
          v-else
          :class="route == '/google_meet/admin' ? 'bg-primary' : 'bg-white'"
           @click="$router.push('/google_meet/admin')"
          class="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center shadow"
        >
          <svg :class="route == '/google_meet/admin' ? 'fill-white' : 'fill-primary'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 7c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-3.333L22 17V7l-4 3.333V7zm-1.998 10H4V7h12l.001 4.999L16 12l.001.001.001 4.999z"/></svg>
        </div>
        <div
          v-if="isAdmin"
          :class="route == '/contact/admin' ? 'bg-primary' : 'bg-white'"
           @click="$router.push('/contact/admin')"
          class="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center shadow"
        >
          <svg :class="route == '/contact/admin' ? 'fill-white' : 'fill-primary'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.766L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.234V16H4V4h16v12z"/><circle cx="15" cy="10" r="2"/><circle cx="9" cy="10" r="2"/></svg>
        </div>
      </div>
    </section>
    <Transition name="side">
      <section
        v-if="useSidebarStore().sidebar"
        class="z-10 ml-0 sm:w-[457px] w-full dark:bg-[#1E2925] sidebar-bg bg-[#FBF5F2] px-[30px] pt-[29px] h-full md:relative fixed left-0"
      >
        <DashboardHeader />

        <DashboardMenu />
      </section>
    </Transition>
    <main
      :class="useSidebarStore().sidebar ? 'md:block hidden' : 'ml-0'"
      class="px-10 md:px-[62px] w-full md:w-[calc(100%-93px)] h-full overflow-auto"
    >
      <header class="flex gap-4 justify-between items-center h-[114px]">
        <section class="flex gap-5 w-full items-center">
          <div
            v-if="!useSidebarStore().sidebar"
            @click="useSidebarStore().toggle()"
            class="w-[53px] h-[53px] dark:bg-[#1D1D1D] cursor-pointer bg-white rounded-full flex justify-center items-center"
          >
            <img
              src="@/components/layouts/dashboard/icons/open-sidebar.svg"
              alt="icon"
            />
          </div>
          <Logo class="md:block hidden" />
        </section>
        <!-- <DropdownMenu>
          <DropdownMenuTrigger
            class="bg-primary hover:bg-[#0C3E7C] text-white w-full max-w-[126px] px-2 py-2 rounded block sm:hidden"
            >Hallo, User!</DropdownMenuTrigger
          >
          <DropdownMenuContent>
            <Button
              @click="toggleDarkMode"
              class="dark:bg-[#1D1D1D] hover:dark:bg-[#353535] text-white bg-primary hover:bg-[#0C3E7C]"
            >
              <span class="dark:text-white">{{
                useDarkModeStore().darkMode ? "Light Mode ☀" : "Dark Mode 🌙"
              }}</span>
            </Button>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Signout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> -->
        <section class="flex gap-2">
          <Button
            @click="toggleDarkMode"
            class="dark:bg-primary bg-primary hover:bg-primary hover:dark:bg-primary dark:text-[#1D1D1D] text-white"
          >
            <svg class="fill-white dark:fill-[#1D1D1D]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.4 2.096a10.08 10.08 0 0 0-8.937 3.331A10.054 10.054 0 0 0 2.096 13.4c.53 3.894 3.458 7.207 7.285 8.246a9.982 9.982 0 0 0 2.618.354l.142-.001a3.001 3.001 0 0 0 2.516-1.426 2.989 2.989 0 0 0 .153-2.879l-.199-.416a1.919 1.919 0 0 1 .094-1.912 2.004 2.004 0 0 1 2.576-.755l.412.197c.412.198.85.299 1.301.299A3.022 3.022 0 0 0 22 12.14a9.935 9.935 0 0 0-.353-2.76c-1.04-3.826-4.353-6.754-8.247-7.284zm5.158 10.909-.412-.197c-1.828-.878-4.07-.198-5.135 1.494-.738 1.176-.813 2.576-.204 3.842l.199.416a.983.983 0 0 1-.051.961.992.992 0 0 1-.844.479h-.112a8.061 8.061 0 0 1-2.095-.283c-3.063-.831-5.403-3.479-5.826-6.586-.321-2.355.352-4.623 1.893-6.389a8.002 8.002 0 0 1 7.16-2.664c3.107.423 5.755 2.764 6.586 5.826.198.73.293 1.474.282 2.207-.012.807-.845 1.183-1.441.894z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="7.5" cy="10.5" r="1.5"/><circle cx="10.5" cy="7.5" r="1.5"/><circle cx="14.5" cy="7.5" r="1.5"/></svg>
          </Button>

          <Button
            @click="logout"
            class="dark:bg-primary px-10 bg-primary hover:bg-primary hover:dark:bg-primary dark:text-[#1D1D1D] text-white"
          >
            <span class="">Logout</span>
          </Button>
        </section>
      </header>
      <div class="h-[85%] w-full overflow-auto">
        <slot />
      </div>
      <ChatBot />
    </main>
  </section>
</template>

<script setup>
import ChatBot from "@/components/chatbot/index.vue";

import DashboardHeader from "@/components/layouts/dashboard/sidebar/header/index.vue";
import DashboardMenu from "@/components/layouts/dashboard/sidebar/menu/index.vue";
import { Button } from "@/components/ui/button";
import { useDarkModeStore } from "@/stores/darkmode";
import { useSidebarStore } from "@/stores/sidebar";
import Logo from "@/components/logo/index.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import { useNotificationStore } from "../../stores/notification";
import { ref } from "vue";
function toggleDarkMode() {
  useDarkModeStore().toggle();
}
// current route 
const route = useRouter().currentRoute.value.fullPath

const logout = () => {
  useAuthStore().logout();
  useNotificationStore().showNotification("Logout berhasil", 'success');
}

const isAdmin = ref(useAuthStore().user.role === "admin");
</script>

<style lang="scss" scoped></style>

<style scoped>
.side-enter-active,
.side-leave-active {
  transition: opacity 0.2s ease-in, transform 0.1s ease-in;
}

.side-enter-from,
.side-leave-to {
  opacity: 0;
  transform: translateX(-20px); /* Start slightly above */
}

.side-enter-to,
.side-leave-from {
  transform: translateX(0); /* Ends in the normal position */
  opacity: 1;
}
</style>
