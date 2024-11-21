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
            <svg
              class="dark:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
              />
            </svg>
          </template>
          <template #next-nav>
            <svg
              class="dark:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
              />
            </svg>
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
            <svg
              class="fill-white z-50"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
              />
              <path
                d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"
              />
            </svg>
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
            <svg
              class="dark:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
              />
            </svg>
          </template>
          <template #next-nav>
            <svg
              class="dark:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
              />
            </svg>
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
    };
    const resp = await videoStore.addVideoUser(paylod);
    console.log(resp.data.data);
    await fetchProgress();
  } catch (error) {
    console.log(error);
  } finally {
    loader.hide();
  }
};
onMounted(async () => {
  await fetchData();
  await fetchProgress();
});
</script>

<style lang="scss" scoped></style>
