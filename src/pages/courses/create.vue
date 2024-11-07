<template>
  <DashboardLayout>
    <section class="px-2">
      <h4 class="text-xl font-bold text-primary">Buat Materi</h4>
      <form @submit.prevent="onSubmit">
        <!-- Video preview section -->
        <div v-if="videoURL" class="w-full mt-3">
          <h5 class="text-lg font-semibold text-primary">Video Preview</h5>
          <video
            :src="videoURL"
            controls
            class="w-full mt-2 rounded-lg"
            @loadedmetadata="onVideoLoaded"
          ></video>
          <p v-if="totalDuration">Total Duration: {{ totalDuration }} seconds</p>
        </div>
        <div class="w-full block gap-3">
          <div class="w-full">
            <FormInput
              v-model="formData.title"
              :marginBottom="true"
              placeholder="Title"
              class="w-full mt-2"
            >
              <template #label>
                <span class="text-primary">Title*</span>
              </template>
            </FormInput>
          </div>
          <div class="w-full">
            <FormInput
              v-model="formData.duration"
              :marginBottom="true"
              type="number"
              placeholder="Duration (min)"
              class="w-full mt-2"
            >
              <template #label>
                <span class="text-primary">Duration (min)*</span>
              </template>
            </FormInput>
          </div>
          <div class="w-full">
            <FormInputFile
              v-model="formData.file"
              :marginBottom="true"
              placeholder="File (mp4)"
              class="w-full mt-2"
              @update:modelValue="onFileSelected"
            >
              <template #label>
                <span class="text-primary">File (mp4)*</span>
              </template>
            </FormInputFile>
          </div>
        </div>
        <div class="flex justify-end">
          <Button type="submit" class="w-max py-3 mt-5">Buat Materi</Button>
        </div>
      </form>
    </section>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layouts/dashboard/index.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/button/index.vue";
import { useLoading } from "vue-loading-overlay";
import { useNotificationStore } from "../../stores/notification";
import { useVideoStore } from "../../stores/videoStore";

let formData = ref({ file: null });
const videoURL = ref(null); // Store video preview URL
const totalDuration = ref(null); // Store total video duration
const router = useRouter();

// Function to handle video file selection
const onFileSelected = (file) => {
  formData.value.file = file;
  if (file) {
    videoURL.value = URL.createObjectURL(file); // Generate video URL for preview
  } else {
    videoURL.value = null;
    totalDuration.value = null;
  }
};

// Function to get video duration when metadata is loaded
const onVideoLoaded = (event) => {
  const videoElement = event.target;
  totalDuration.value = videoElement.duration; // Duration in seconds
  formData.value.duration = (totalDuration.value / 60).toFixed(2); // Store in minutes for form submission
};

const $loading = useLoading({});
const notificationStore = useNotificationStore();
const videoStore = useVideoStore();
let errors = ref({});

const onSubmit = async () => {
  const loader = $loading.show({});
  try {
    let dataForm = new FormData();
    if (formData.value.file) {
      dataForm.append("file", formData.value.file);
    }
    if (formData.value.title) {
      dataForm.append("title", formData.value.title);
    }
    if (formData.value.duration) {
      dataForm.append("duration", formData.value.duration);
    }
    const resp = await videoStore.post(dataForm);
    errors.value = {};
    notificationStore.showNotification("Materi berhasil dibuat", 'success');
    router.push("/courses/admin");
  } catch (error) {
    console.log(error);
    
    const errorData = error?.response?.data;
    errors.value = errorData?.data || {};
    console.log(errors.value);
    notificationStore.showNotification(errorData?.message || "An error occurred", 'error');
  } finally {
    loader?.hide?.();
  }
};

const goTo = (path) => {
  router.push({ path: path });
};
</script>

<style lang="scss" scoped></style>
