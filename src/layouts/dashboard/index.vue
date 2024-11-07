<template>
  <section class="w-screen h-screen dark:bg-[#262626] bg-[#FFF] flex">
    <section
      class="z-20 hidden w-[93px] bg-primary md:flex items-center flex-col gap-5 justify-center pt-[29px] h-full md:relative fixed left-0"
    >
      <div class="mt-24 flex flex-col gap-3">
        <div
          :class="route == '/profile' ? 'bg-primary' : 'bg-white' "
           @click="$router.push('/profile')"
          class="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center shadow"
        >
          <box-icon :class="route == '/profile' ? 'fill-white' : 'fill-primary'" class=" w-8 h-8" name="user"></box-icon>
        </div>
        <div
          :class="route == '/courses' ? 'bg-primary' : 'bg-white'"
           @click="$router.push('/courses')"
          class="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center shadow"
        >
          <box-icon name="book" :class="route == '/courses' ? 'fill-white' : 'fill-primary'" class=""></box-icon>
        </div>
        <div
          :class="route == '/puzzle' ? 'bg-primary' : 'bg-white'"
           @click="$router.push('/puzzle')"
          class="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center shadow"
        >
          <box-icon name="dice-3" :class="route == '/puzzle' ? 'fill-white' : 'fill-primary'" class=""></box-icon>
        </div>
        <div
          :class="route == '/google_meet' ? 'bg-primary' : 'bg-white'"
           @click="$router.push('/google_meet')"
          class="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center shadow"
        >
          <box-icon name="video" :class="route == '/google_meet' ? 'fill-white' : 'fill-primary'" class=""></box-icon>
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
        <DropdownMenu>
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
        </DropdownMenu>
        <section class="sm:flex gap-2 hidden">
          <Button
            @click="toggleDarkMode"
            class="dark:bg-primary bg-primary hover:bg-primary hover:dark:bg-primary dark:text-[#1D1D1D] text-white"
          >
            <box-icon
              class="fill-white dark:fill-[#1D1D1D]"
              name="palette"
            ></box-icon>
          </Button>

          <Button
            class="dark:bg-primary bg-primary hover:bg-primary hover:dark:bg-primary dark:text-[#1D1D1D] text-white"
          >
            <box-icon
              class="fill-white dark:fill-[#1D1D1D]"
              name="bell"
            ></box-icon>
          </Button>

          <Button
            @click="toggleDarkMode"
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
function toggleDarkMode() {
  useDarkModeStore().toggle();
}
// current route 
const route = useRouter().currentRoute.value.fullPath
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
