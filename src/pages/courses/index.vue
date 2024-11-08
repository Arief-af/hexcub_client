<template>
  <DashboardLayout>
    <section>
      <h4 class="text-xl font-bold text-primary">Perkembangan Belajar Kamu!</h4>
      <div class="flex gap-5 mt-5 flex-wrap">
        <Progress
          @click="$router.push(`/courses/${item.video_id}`)"
          class="md:w-[calc(50%-20px)] w-full cursor-pointer"
          v-for="item in dataProgress"
          :title="item.video.title"
          :persentage="calculatePercentage(item.video.duration, item.status)"
        />
      </div>
      <div class="flex w-full justify-end">
        <TailwindPagination
          class="mt-5 flex-wrap"
          :data="paginationProgress"
          @pagination-change-page="fetchProgress"
          :item-classes="[
            'bg-secondary',
            'dark:bg-[#1D1D1D]',
            'dark:text-white',
            'dark:border-none',
          ]"
          :active-classes="[
            'bg-primary',
            'text-white',
            'dark:text-white',
            'border-secondary',
            'dark:border-none',
          ]"
        >
          <template #prev-nav>
            <box-icon class="dark:fill-white" name="chevron-left"></box-icon>
          </template>
          <template #next-nav>
            <box-icon class="dark:fill-white" name="chevron-right"></box-icon>
          </template>
        </TailwindPagination>
      </div>
    </section>

    <Section class="mt-10">
      <h4 class="text-xl font-bold text-primary mb-5">Semua Materi</h4>

      <div class="flex justify-end">
        <div class="flex gap-2 dark:bg-[#1D1D1D] rounded-full px-5 py-1 mb-5">
          <FormInput v-model="search" placeholder="Cari materi"></FormInput>
          <Button
            @click="fetchData()"
            v-model="search"
            class="mt-2 bg-primary dark:bg-primary rounded-full hover:bg-primary dark:hover:bg-primary"
          >
            <box-icon name="search-alt" class="fill-white z-50"></box-icon>
          </Button>
        </div>
      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
        <Course
          v-for="item in data"
          :key="item.id"
          class="md:w-full w-full"
          :title="item.title"
          :id="item.id"
          :duration="item.duration"
          @click="$router.push(`/courses/${item.id}`)"
        />
      </div>
      <div class="flex w-full justify-end">
        <TailwindPagination
          class="mt-5 flex-wrap"
          :data="pagination"
          @pagination-change-page="fetchData"
          :item-classes="[
            'bg-secondary',
            'dark:bg-[#1D1D1D]',
            'dark:text-white',
            'dark:border-none',
          ]"
          :active-classes="[
            'bg-primary',
            'text-white',
            'dark:text-white',
            'border-secondary',
            'dark:border-none',
          ]"
        >
          <template #prev-nav>
            <box-icon class="dark:fill-white" name="chevron-left"></box-icon>
          </template>
          <template #next-nav>
            <box-icon class="dark:fill-white" name="chevron-right"></box-icon>
          </template>
        </TailwindPagination>
      </div>
    </Section>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layouts/dashboard/index.vue";
import { Button } from "@/components/ui/button/index.js";
import Course from "@/components/course/index.vue";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import Progress from "@/components/progress/index.vue";
const router = useRouter();
const goTo = (path) => {
  router.push({ path: path });
};

import { useLoading } from "vue-loading-overlay";
import { useVideoStore } from "../../stores/videoStore";

const $loading = useLoading({});
const videoStore = useVideoStore();
let data = ref([]);
let search = ref("");
const pagination = ref({});
const getFullUrl = (url) => {
  return import.meta.env.VITE_API_URI + "/" + url;
};
const fetchData = async (page = 1) => {
  const loader = $loading.show({});
  try {
    const resp = await videoStore.getData(page, search.value);
    console.log(resp.data.data);
    pagination.value = resp.data.data;
    data.value = resp.data.data.data.map((item) => ({
      id: item.id,
      file: getFullUrl(item.file),
      title: item.title,
      duration: item.duration,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (error) {
    console.log(error);
  } finally {
    loader.hide();
  }
};

let paginationProgress = ref([]);
let dataProgress = ref([]);
const fetchProgress = async (page = 1) => {
  const loader = $loading.show({});
  try {
    const resp = await videoStore.getVideoUser(page);
    paginationProgress.value = resp.data.data;
    dataProgress.value = resp.data.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loader.hide();
  }
};

function calculatePercentage(total, value) {
  if (total === 0) return 0; // Prevent division by zero
  const percentage = (value / total) * 100;
  if (percentage > 100) return 100;
  return percentage.toFixed(2); // Return with 2 decimal places
}

const addVideoUser = async (id) => {
  const loader = $loading.show({});
  try {
    const paylod = {
      video_id: id,
    }
    const resp = await videoStore.addVideoUser(paylod);
    console.log(resp.data.data);
    await fetchProgress();
  } catch (error) {
    console.log(error);
  } finally {
    loader.hide();
  }
}
onMounted(async () => {
  await fetchData();
  await fetchProgress();
});
</script>

<style lang="scss" scoped></style>
