<template>
  <div>
    <ul>
      <li class="cursor-pointer" v-for="(item, index) in data" :key="index">
        <section>
          <div
            @click="toggleActive(index)"
            :class="route == item.path ? 'bg-primary text-white dark:bg-[#1D1D1D]' : 'text-primary'"
            class="relative border border-primary z-20 py-[10px] mb-5 flex gap-2 justify-between items-center px-[42px] rounded-full  hover:bg-primary hover:text-white"
          >
            <section class="flex items-center gap-[20.29px]">
              <div class="text-[16px] font-bold ">{{ item.name }}</div>
            </section>
            <section v-if="item.subItem">
              <img
                src="@/components/layouts/dashboard/icons/subitem.svg"
                alt="icon"
              />
            </section>
          </div>
          <Transition>
            <div v-if="item.active" class="relative z-10 mb-2">
              <div
                v-for="subItem in item.subItem"
                :key="subItem.name"
                class="py-[6px] ml-[30px] h-[40px] flex items-center gap-[20.29px] border-l-2 border-[#898989]"
              >
                <div
                  class="w-[17.6px] h-[17.6px] flex items-center justify-center rounded-full"
                >
                </div>
                <div class="text-[16px] w-full">{{ subItem.name }}</div>
              </div>
            </div>
          </Transition>
        </section>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import dashboardIcon from "@/components/layouts/dashboard/icons/dashboard.svg";
import dashboardDarkIcon from "@/components/layouts/dashboard/icons/dashboard.svg";
import { useRouter } from "vue-router";
const route = useRouter().currentRoute.value.fullPath;
console.log(route);

// Data array
const data = ref([
  {
    name: "My Profile",
    icon: dashboardIcon,
    icon: dashboardDarkIcon,
    active: false,
    path: "/profile",
  },
  {
    name: "My Courses",
    icon: dashboardIcon,
    active: false,
    path: "/courses",
  },
  {
    name: "Puzzle Game",
    icon: dashboardIcon,
    icon: dashboardDarkIcon,
    active: false,
    path: "/puzzle",
  },
  {
    name: "Google Meet",
    icon: dashboardIcon,
    icon: dashboardDarkIcon,
    active: false,
    path: "/puzzle/play",
  },
]);

const router = useRouter();
// Function to toggle item.active state
const toggleActive = (index) => {
  if (data.value[index].subItem) {
    data.value[index].active = !data.value[index].active;
  } else {
    router.push({ path: data.value[index].path });
  }
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in, transform 0.1s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-20px); /* Start slightly above */
}

.v-enter-to,
.v-leave-from {
  transform: translateY(0); /* Ends in the normal position */
  opacity: 1;
}
</style>
