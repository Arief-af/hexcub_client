<template>
  <DashboardLayout>
    <section>
      <h4 class="text-xl font-bold text-primary">Perkembangan Belajar Kamu!</h4>
      <div class="flex gap-5 mt-5 flex-wrap">
        <div
          class="w-[calc(70%-10px)] p-5 dark:bg-[#1E2925] bg-[#FBF5F2] sidebar-bg rounded-3xl overflow-hidden"
        >
          <div class="w-full">
            <video
              :src="getFullUrl(data.file)"
              controls
              class="w-full rounded-lg"
              ref="videoElement"
              @timeupdate="handleTimeUpdate"
            ></video>
          </div>
        </div>

        <div
          class="w-[calc(30%-10px)] p-10 bg-[#FBF5F2] rounded-3xl overflow-hidden"
        >
          <h4 class="text-xl font-bold text-primary mb-4">Video Lainnya</h4>
          <div
            :key="index"
            @click="refreshPage(item.id)"
            :class="item.id == $route.params.id ? 'bg-primary text-white' : 'border border-primary text-primary' " 
            class="mb-2 p-2 rounded-xl cursor-pointer"
            v-for="(item, index) in dataVideo"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <section>
        <div
          class="bg-primary mt-5 rounded-full py-5 flex justify-between items-center px-10"
        >
          <h4 class="text-xl font-bold text-white">{{ data.title }}</h4>
          <Button @click="saveProgress" outline :hover="false" class="p-2">
            Simpan Progress
          </Button>
        </div>
      </section>
    </section>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layouts/dashboard/index.vue";
import Button from "@/components/button/index.vue";
import { computed, onMounted, ref } from "vue";
import { useLoading } from "vue-loading-overlay";
import { useVideoStore } from "../../stores/videoStore";
import { useRouter } from "vue-router";
import { useNotificationStore } from "../../stores/notification";

const $loading = useLoading({});
const videoStore = useVideoStore();
let data = ref([]);
const progressMinutes = ref(0); // Store progress in minutes
const videoElement = ref(null);
const router = useRouter();
const id = router.currentRoute.value.params.id;

const getFullUrl = (url) => {
  return import.meta.env.VITE_API_URI + "/" + url;
};

// Function to fetch video data
const fetchData = async () => {
  const loader = $loading.show({});
  try {
    const resp = await videoStore.show(id);
    data.value = resp.data.data;
  } catch (error) {
    // console.log(error);
  } finally {
    loader.hide();
  }
};

let dataVideo = ref([]);
let paginationVideo = ref([]);
const fetchDataVideo = async (page = 1) => {
  const loader = $loading.show({});
  try {
    const resp = await videoStore.getData(page);
    // console.log(resp.data.data);
    paginationVideo.value = resp.data.data;
    dataVideo.value = resp.data.data.data.map((item) => ({
      id: item.id,
      file: getFullUrl(item.file),
      title: item.title,
      duration: item.duration,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (error) {
    // console.log(error);
  } finally {
    loader.hide();
  }
};

// Function to handle time update and store current progress in minutes
const handleTimeUpdate = () => {
  if (videoElement.value) {
    const currentTimeInSeconds = videoElement.value.currentTime;
    const currentTimeInMinutes = (currentTimeInSeconds / 60).toFixed(2); // Convert seconds to minutes
    progressMinutes.value = currentTimeInMinutes;
  }
};

const notificationStore = useNotificationStore();
// Function to save progress
const saveProgress = async () => {
  const loader = $loading.show({});
  try {
    const payload = {
      video_id: router.currentRoute.value.params.id,
      status: progressMinutes.value, // Store progress in minutes
    };
    const resp = await videoStore.addVideoUser(payload);
    notificationStore.showNotification("Progress Kamu Tersimpan 👍", "success");
  } catch (error) {
    // console.log(error);
  } finally {
    loader.hide();
  }
};

const refreshPage = async (id) => {
  router.push('/courses/' + id);
  await fetchData();
};

onMounted(async () => {
  await fetchData();
  await fetchDataVideo();
});
</script>

<style lang="scss" scoped></style>
