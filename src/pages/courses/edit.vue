<template>
  <DashboardLayout>
    <section class="px-2">
      <h4 class="text-xl font-bold text-primary">Buat Materi</h4>
      <form @submit.prevent="onSubmit">
        <!-- Video preview section -->
         {{ formData.file }} - {{ videoURL }}
        <div v-if="videoURL" class="w-full mt-3">
          <h5 class="text-lg font-semibold text-primary">Video Preview</h5>
          <video
            :src="getFullUrl(videoURL)"
            controls
            class="w-full mt-2 rounded-lg"
            @loadedmetadata="onVideoLoaded"
          ></video>
          <p v-if="totalDuration">
            Total Duration: {{ totalDuration }} seconds
          </p>
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
              formReadonly
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
        <h5 class="text-lg font-semibold text-primary">
          Time Stamps
          <Button type="button" @click="addTimeStamp" class="ml-5 p-2"
            >Add time stamp</Button
          >
        </h5>
        <section
          class="border border-primary p-5 rounded-2xl mt-16 relative"
          v-for="(item, index) in formData.video_details"
          :key="index"
        >
          <div class="absolute right-5 -top-8">
            <Button type="button" @click="deleteTimeStamp(index)" class="py-3"
              >Delete</Button
            >
          </div>
          <div class="w-full">
            <FormInput
              v-model="formData.video_details[index].title"
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
              v-model="formData.video_details[index].time"
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
          <div class="w-full hidden">
            <FormInput
              v-model="formData.video_details[index].id"
              :marginBottom="true"
              type="number"
              placeholder="ID"
              class="w-full mt-2"
            >
              <template #label>
                <span class="text-primary">ID*</span>
              </template>
            </FormInput>
          </div>
        </section>
        <div class="flex justify-end">
          <Button type="submit" class="w-max py-3 mt-5">Update Materi</Button>
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
import { onMounted } from "vue";
import { data } from "autoprefixer";

let formData = ref({ file: null, duration: 0, video_details: [] });
const videoURL = ref(null); // Store video preview URL
const totalDuration = ref(null); // Store total video duration
const router = useRouter();

const addTimeStamp = () => {
  formData.value.video_details.push({
    title: "",
    time: "",
  });
};

const deleteTimeStamp = (index) => {
  formData.value.video_details.splice(index, 1);
};
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
    if (formData.value.file != videoURL.value) {
      dataForm.append("file", formData.value.file);
    }
    if (formData.value.title) {
      dataForm.append("title", formData.value.title);
    }
    if (formData.value.duration) {
      dataForm.append("duration", formData.value.duration);
    }
    if (formData.value.video_details.length > 0) {
      for (let i = 0; i < formData.value.video_details.length; i++) {
        if (formData.value.video_details[i].id) {
          dataForm.append(
            `video_details[${i}][id]`,
            formData.value.video_details[i].id
          );
        }
        dataForm.append(
          `video_details[${i}][title]`,
          formData.value.video_details[i].title
        );
        dataForm.append(
          `video_details[${i}][time]`,
          formData.value.video_details[i].time
        );
      }
    }
    dataForm.append("_method", "PUT");
    const resp = await videoStore.update(id, dataForm);
    errors.value = {};
    notificationStore.showNotification("Materi berhasil diupdate", "success");
    router.push("/courses/admin");
  } catch (error) {
    console.log(error);

    const errorData = error?.response?.data;
    errors.value = errorData?.data || {};
    console.log(errors.value);
    notificationStore.showNotification(
      errorData?.message || "An error occurred",
      "error"
    );
  } finally {
    loader?.hide?.();
  }
};

const id = router.currentRoute.value.params.id;
const fetchData = async () => {
  const loader = $loading.show({});
  try {
    const resp = await videoStore.show(id);
    formData.value = resp.data.data;
    videoURL.value = resp.data.data.file;
  } catch (error) {
    console.log(error);
  } finally {
    loader?.hide?.(); // Ensure loader is not null before calling hide
  }
};

const getFullUrl = (url) => {
  // Check if URL is a Blob or URL object (for locally uploaded files), and if so, return it directly
  if (url instanceof Blob || url instanceof URL || url.startsWith("blob:")) {
    return url;
  }

  // Check if URL is undefined, null, or empty
  if (!url || typeof url !== "string") {
    console.warn("URL is undefined, empty, or not a string.");
    return null; // or return a default URL if needed
  }

  // Skip transformation if URL is already an absolute path or from server
  if (url.startsWith("http") || url.startsWith("/")) {
    return url;
  }

  // Remove the "files/" prefix from the URL
  const filename = url.replace(/^files\//, "");

  // Construct the full URL using the environment variable
  return `${import.meta.env.VITE_API_URI}/stream/${filename}`;
};


onMounted(async () => {
  await fetchData();
});
</script>

<style lang="scss" scoped></style>
