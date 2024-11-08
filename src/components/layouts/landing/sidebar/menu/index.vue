<template>
  <div>
    <ul class="mt-2">
      <li class="cursor-pointer" v-for="(item, index) in data" :key="index">
        <section>
          <div
            @click="scrollToId(item.path)"
            :class="{ 'bg-white dark:bg-[#1D1D1D]': item.active }"
            class="relative z-20 py-[6px] mb-2 flex gap-2 justify-between items-center px-[14px] rounded-md dark:text-[#828282] dark:hover:bg-[#1D1D1D] hover:bg-gray-200"
          >
            <section class="flex items-center gap-[20.29px]">
              <div class="text-[14px]">{{ item.name }}</div>
            </section>
            <section v-if="item.subItem">
              <img
                src="@/components/layouts/dashboard/icons/subitem.svg"
                alt="icon"
              />
            </section>
          </div>
          <Transition>
            <div
              v-if="item.active"
              @click="scrollToId(item.path)"
              class="relative z-10 dark:text-[#828282]"
            >
              <div
                v-for="subItem in item.subItem"
                :key="subItem.name"
                class="py-[6px] ml-[20px] px-[14px] h-[40px] flex items-center gap-[20.29px] border-l-2 border-[#898989]"
              >
                <div class="text-[12px] w-full">{{ subItem.name }}</div>
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
import { useSidebarStore } from "@/stores/sidebar";
import Button from "@/components/button/index.vue";
const sidebarStore = useSidebarStore();
const scrollToId = (id) => {
  sidebarStore.toggle();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
import { useDarkModeStore } from "@/stores/darkmode";

function toggleDarkMode() {
  useDarkModeStore().toggle();
}
// Data array
const data = ref([
  {
    name: "Halaman Utama",
    path: "halaman_utama",
    active: false,
  },
  {
    name: "Program Kita",
    path: "program_kita",
    active: false,
  },
  {
    name: "FAQ",
    path: "faq",
    active: false,
  },
  {
    name: "Contact Us",
    path: "contact",
    active: false,
  },
]);

// Function to toggle item.active state
const toggleActive = (index) => {
  if (data.value[index].subItem) {
    data.value[index].active = !data.value[index].active;
  } else {
    alert("haa");
  }
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.1s ease-in-out;
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
