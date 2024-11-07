<template>
  <DashboardLayout>
    <section class="px-2">
      <h4 class="text-xl font-bold text-primary">Buat Materi</h4>
      <form @submit.prevent="onSubmit">
        <!-- Video preview section -->
        <div v-if="videoURL" class="w-full mt-3">
          <h5 class="text-lg font-semibold text-primary">Video Preview</h5>
          <video :src="getFullUrl(videoURL)" controls class="w-full mt-2 rounded-lg"></video>
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
          <Button type="submit" class="w-max py-3 mt-5">Perbarui Materi</Button>
        </div>
      </form>
    </section>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layouts/dashboard/index.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/button/index.vue";
import { useLoading } from "vue-loading-overlay";
import { useNotificationStore } from "../../stores/notification";
import { useVideoStore } from "../../stores/videoStore";
let formData = ref({ file: null });
const videoURL = ref(null); // Store video preview URL
const router = useRouter();

// Function to handle video file selection
const onFileSelected = (file) => {
  formData.value.file = file;
  if (file) {
    videoURL.value = URL.createObjectURL(file); // Generate video URL for preview
  } else {
    videoURL.value = null;
  }
};
const $loading = useLoading({});
const notificationStore = useNotificationStore();
const videoStore = useVideoStore();
let errors = ref({});

const onSubmit = async () => {
  const loader = $loading.show({});
  try {
    let dataForm = new FormData();
    if (videoURL.value != formData.value.file) {
      dataForm.append("file", formData.value.file);
    }
    if (formData.value.title) {
      dataForm.append("title", formData.value.title);
    }
    if (formData.value.duration) {
      dataForm.append("duration", formData.value.duration);
    }

    dataForm.append('_method', 'PUT');
    const resp = await videoStore.update(id, dataForm);
    errors.value = {};
    notificationStore.showNotification("Materi berhasil dibuat", 'success');
    router.push("/courses/admin");
  } catch (error) {
    console.log(error);
    
    // Handle case where error or error.response.data might be null/undefined
    const errorData = error?.response?.data;
    errors.value = errorData?.data || {};
    console.log(errors.value);
    notificationStore.showNotification(errorData?.message || "An error occurred", 'error');
  } finally {
    loader?.hide?.(); // Ensure loader is not null before calling hide
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
}

const getFullUrl = (url) => {
  return import.meta.env.VITE_API_URI + "/" + url;
};

onMounted( async () => {
  await fetchData();
})
const goTo = (path) => {
  router.push({ path: path });
};
</script>

<style lang="scss" scoped></style>
