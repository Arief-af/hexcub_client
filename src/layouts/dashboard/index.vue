<template>
  <section class="w-screen h-screen dark:bg-[#262626] bg-[#FFF] flex">
    <section
      class="z-20 sm:w-[93px] bg-primary flex items-center px-[30px] pt-[29px] h-full md:relative fixed left-0"
    >
      tes
    </section>
    <Transition name="side">
      <section
        v-if="useSidebarStore().sidebar"
        class="z-10 ml-[93px] md:ml-0 sm:w-[457px] w-full dark:bg-[#1E2925] sidebar-bg bg-[#FBF5F2] px-[30px] pt-[29px] h-full md:relative fixed left-0"
      >
        <DashboardHeader />

        <footer class="absolute bottom-0">tes</footer>
        <DashboardMenu />
      </section>
    </Transition>
    <main :class="useSidebarStore().sidebar ? '' : 'ml-[93px] md:ml-0'" class="px-4 md:px-[62px] w-screen h-full overflow-auto">
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
          <Logo />
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
        <section class="sm:block hidden">
          <Button
            @click="toggleDarkMode"
            class="dark:bg-[#1D1D1D] bg-primary hover:bg-primary hover:dark:bg-[#353535] text-white"
          >
            <span class="dark:text-white">{{
              useDarkModeStore().darkMode ? "Light Mode ☀" : "Dark Mode 🌙"
            }}</span>
          </Button>
        </section>
      </header>
      <div class="h-[85%] w-full overflow-auto">
        <slot />
      </div>
    </main>
  </section>
</template>

<script setup>
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
function toggleDarkMode() {
  useDarkModeStore().toggle();
}
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
