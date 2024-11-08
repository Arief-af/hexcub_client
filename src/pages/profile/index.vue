<template>
  <DefaultLayout>
    <main class="mt-10">
      <div class="flex flex-col items-center flex-wrap justify-center gap-5">
        <div class="w-max flex items-center flex-col">
          <div class="text-xl font-bold text-primary mb-5">Profile</div>
          <img
            v-if="formData.imagePreview || authStore.user?.image"
            :src="
              formData.imagePreview || getBackendFullURL(authStore.user?.image)
            "
            class="object-cover rounded-full w-[272px] h-[272px]"
            alt="profile"
          />
          <img
            v-else
            :src="ProfileDefault"
            class="object-cover rounded-full w-[272px] h-[272px]"
            alt="profile"
          />

          <Button class="py-4 mt-5" @click="openFilePicker"
            >Select Image</Button
          >

          <!-- <FormInputFile class="w-[113px]" v-model="formData.image" type="file" /> -->
          <input
            type="file"
            accept="image/*"
            ref="fileInput"
            @change="selectImage"
            class="hidden"
          />
        </div>
        <div class="w-full px-2 md:w-2/3">
          <form @submit.prevent="updateProfile">
            <div class="w-full block gap-3">
              <div class="w-full">
                <FormInput
                  v-model="formData.name"
                  :marginBottom="true"
                  placeholder="Nama"
                  class="w-full mt-2"
                >
                  <template #label
                    ><span class="text-primary">Nama</span></template
                  >
                </FormInput>
              </div>
              <div class="w-full">
                <FormInput
                  v-model="formData.email"
                  :marginBottom="true"
                  placeholder="Email"
                  class="w-full mt-2"
                >
                  <template #label
                    ><span class="text-primary">Email</span></template
                  >
                </FormInput>
              </div>
            </div>
            <div class="w-full md:flex block gap-3">
              <div class="w-full">
                <FormInput
                  v-model="formData.phone_number"
                  :marginBottom="true"
                  placeholder="No Telp"
                  class="w-full mt-2"
                >
                  <template #label
                    ><span class="text-primary">No Telp</span></template
                  >
                </FormInput>
              </div>
            </div>

            <div class="flex gap-2 justify-center mt-4">
              <Button type="submit" class="py-2">Perbarui</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import DefaultLayout from "@/layouts/dashboard/index.vue";
import Button from "@/components/button/index.vue";
import { ref } from "vue";
import ProfileDefault from "@/assets/images/profileDefault.png";
const authStore = useAuthStore();

const formData = ref({});
formData.value = authStore.user;
// Function to select image and preview it
const selectImage = (e: Event) => {
const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    formData.value.image = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      formData.value.imagePreview = reader.result;
    };
  }
};

import { useLoading } from "vue-loading-overlay";
import { useNotificationStore } from "@/stores/notification";
import { onMounted } from "vue";
const $loading = useLoading({});
const notificationStore = useNotificationStore();
const user_id = authStore.user.id;
function isEmpty(obj) {
    if (obj === null || obj === undefined) return false;
    return Object.keys(obj).length === 0;
}
const updateProfile = async () => {
  const loader = $loading.show({});
  try {
    const dataForm = new FormData();
    if (formData.value.name) {
      dataForm.append("name", formData.value.name);
    }
    if (formData.value.email) {
      dataForm.append("email", formData.value.email);
    }
    if (formData.value.phone_number) {
      dataForm.append("phone_number", formData.value.phone_number);
    }
    if (formData.value.password) {
      dataForm.append("password", formData.value.password);
    }
    if (isEmpty(formData.value.image)) {
      dataForm.append("image", formData.value.image);
    }
    if (formData.value.password_confirmation) {
      dataForm.append(
        "password_confirmation",
        formData.value.password_confirmation
      );
    }

    dataForm.append("_method", "PUT");
    const resp = await authStore.updateProfile(dataForm);
    if (formData.value.password && formData.value.password_confirmation) {
      formData.value.password = "";
      formData.value.password_confirmation = "";
      authStore.logout();
    }
    notificationStore.showNotification(resp?.data?.message, "success");
    if (resp?.data?.message == "Update berhasil, silakan cek email Anda untuk verifikasi."){
      authStore.clearState();
    }
  } catch (error) {
    console.log(error);
    
    notificationStore.showNotification(error?.response?.data?.message, "error");
  } finally {
    loader.hide();
  }
};

// Function to trigger the file input programmatically
const openFilePicker = () => {
  (fileInput.value as HTMLInputElement).click();
};

const fileInput = ref<HTMLInputElement | null>(null);

const getBackendFullURL = (img) => {
  return import.meta.env.VITE_API_URI + "/" + img;
};

</script>
