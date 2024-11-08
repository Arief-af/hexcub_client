<template>
  <DashboardLayout>
    <header class="text-2xl font-bold text-primary">Google Meet</header>
    <main
      class="bg-primary text-white px-10 xl:px-40 rounded-3xl h-[431px] mt-5 flex items-center"
    >
      <section>
        <span class="text-[26px]">{{ data?.date }} <br /></span>
        <span class="font-bold text-[26px]">{{ data?.title }}</span> <br />
        <span class="text-[20px]">Bersama kak {{  data?.instructor }} </span>
      </section>
    </main>
    <div class="text-center mt-5">
      <Button
        @click="openNewTab(data?.url)"
        class="px-16 dark:bg-[#449072] dark:text-white dark:hover:bg-primary dark:hover:text-white bg-[#449072] text-white hover:bg-primary hover:text-white"
        >Join</Button
      >
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layouts/dashboard/index.vue";
import { Button } from "@/components/ui/button";
import { useMeetStore } from "@/stores/meets";
import { onMounted, ref } from "vue";
const meetsStore = useMeetStore();
const data = ref([]);
const fetchData = async () => {
  try {
    const resp = await meetsStore.getData();
    data.value = resp.data.data;
    console.log(data.value);
  } catch (error) {
    console.log(error);
  }
};

const openNewTab = (url) => {
  window.open(url, "_blank");
}
onMounted(async () => {
  await fetchData();
});
</script>

<style lang="scss" scoped></style>
