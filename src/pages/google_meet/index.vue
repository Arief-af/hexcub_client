<template>
  <DashboardLayout>
    <header class="text-2xl font-bold text-primary">Google Meet</header>
    <main
      v-if="loading"
      class="bg-primary text-white px-10 xl:px-40 rounded-3xl h-[431px] mt-5 flex items-center animate-pulse"
    >
      <section>
        <span class="text-[26px] h-6 bg-gray-200 rounded w-1/4"></span> <br />
        <span
          class="font-bold text-[26px] h-6 bg-gray-200 rounded w-1/2"
        ></span>
        <br />
        <span class="text-[20px] h-6 bg-gray-200 rounded w-1/3"></span>
      </section>
    </main>
    <main
      v-else
      class="bg-primary text-white px-10 xl:px-40 rounded-3xl h-[431px] mt-5 flex items-center"
    >
      <section>
        <span class="text-[26px]">{{ data?.date }} <br /></span>
        <span class="font-bold text-[26px]">{{ data?.title }}</span> <br />
        <span class="text-[20px]">Bersama kak {{ data?.instructor }} </span>
      </section>
    </main>
    <div class="text-center mt-5">
      <Button
        v-if="!loading"
        @click="openNewTab(data?.url)"
        class="px-16 dark:bg-[#449072] dark:text-white dark:hover:bg-primary dark:hover:text-white bg-[#449072] text-white hover:bg-primary hover:text-white"
        >Join</Button
      >
    </div>
  </DashboardLayout>
</template>

<script setup>
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/layouts/dashboard/index.vue";
import { Button } from "@/components/ui/button";
import { useMeetStore } from "@/stores/meets";
import { onMounted, ref } from "vue";
const meetsStore = useMeetStore();
const data = ref([]);
let loading = ref(true);
const fetchData = async () => {
  try {
    const resp = await meetsStore.getData();
    data.value = resp.data.data;
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};

const openNewTab = (url) => {
  window.open(url, "_blank");
};
onMounted(async () => {
  await fetchData();
});
</script>

<style lang="scss" scoped></style>
