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
          <h4 class="text-xl font-bold text-primary mb-4">Detail Video</h4>
          <div
            :key="index"
            @click="playVideoAtMinute(item.time)"
            class="bg-primary mb-2 p-2 rounded-xl text-white"
            v-for="(item, index) in data.video_details"
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
          <Button @click="saveProgress" outline :hover="false" class="p-2"
            >Simpan Progress</Button
          >
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
    console.log(error);
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
const playVideoAtMinute = (time) => {
  if (videoElement.value) {
    const timeInSeconds = time * 60; // Convert minutes to seconds
    console.log("Requested time in seconds:", timeInSeconds);

    // Pause the video, set currentTime, and then play
    videoElement.value.pause(); // Pause if the video is playing
    videoElement.value.currentTime = timeInSeconds; // Set currentTime to requested value

    // Listen for the seeked event to ensure currentTime has been set before playing
    videoElement.value.addEventListener('seeked', () => {
      console.log(`Video seeked to: ${videoElement.value.currentTime}`);
      videoElement.value.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    });
  } else {
    console.error("Video element not found");
  }
};// Function to save progress
const saveProgress = async () => {
  const loader = $loading.show({});
  try {
    const payload = {
      video_id: id,
      status: progressMinutes.value, // Store progress in minutes
    };
    const resp = await videoStore.addVideoUser(payload);
    console.log(resp.data.data);
  } catch (error) {
    console.log(error);
  } finally {
    loader.hide();
  }
};

onMounted(async () => {
  await fetchData();
});
</script>

<style lang="scss" scoped></style>
