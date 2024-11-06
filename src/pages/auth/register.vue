<template>
  <AuthLayout>
    <form @submit.prevent="onSubmit" class="md:w-[70%] w-full h-screen flex flex-col justify-center p-10 relative md:p-0">
      <div @click="$router.push('/')" class="absolute right-0 p-10 md:p-0 top-10 text-primary cursor-pointer">< Halaman Utama</div>
      <div class="text-3xl text-start mt-5 mb-5 font-bold text-primary">
        Register
      </div>
      <div
        class="text-primary"
      >
        Sudah punya akun? <span class="cursor-pointer font-bold" @click="$router.push('/login')">Klik Di sini</span>
      </div>
      <FormInput v-model="formData.name" placeholder="Nama Lengkap" class="w-full mt-5">
        <template #label><span class="text-primary">Name Lengkap</span></template>
        <template #error><span class="text-red-500">{{ errors?.name?.[0] }}</span></template>
      </FormInput>
      <div class="w-full flex gap-5">
        <section class="w-full">
          <FormInput v-model="formData.email" type="text" placeholder="Email" class="w-full">
            <template #label><span class="text-primary">Email</span></template>
            <template #error><span class="text-red-500">{{ errors?.email?.[0] }}</span></template>
          </FormInput>
        </section>
      </div>
      
      <div class="w-full flex gap-5">
        <section class="w-full">
          <FormInput v-model="formData.phone_number" type="text" placeholder="no telp" class="w-full">
            <template #label><span class="text-primary">No Telp</span></template>
            <template #error><span class="text-red-500">{{ errors?.phone_number?.[0] }}</span></template>
          </FormInput>
        </section>
      </div>

      <div class="w-full gap-5">
        <section class="w-full">
          <FormInput v-model="formData.password" type="text" placeholder="Password" class="w-full">
            <template #label
              ><span class="text-primary">Password</span></template
            >
            <template #error><span class="text-red-500">{{ errors?.password?.[0] }}</span></template>
          </FormInput>
        </section>
        <section class="w-full">
          <FormInput
            v-model="formData.password_confirmation"
            type="text"
            placeholder="Konfirmasi Password"
            class="w-full"
          >
            <template #label
              ><span class="text-primary">Konfirmasi Password</span></template
            >
          </FormInput>
        </section>
      </div>
      <div class="flex justify-end">
        <Button type="submit" class="w-max py-3 mt-5">Register</Button>
      </div>
    </form>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/index.vue";
import Button from "@/components/button/index.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "../../stores/authStore";
import { ref } from "vue";
import { useLoading } from "vue-loading-overlay";
import { useNotificationStore } from "../../stores/notification";
import { useRouter } from "vue-router";
const notificationStore = useNotificationStore();

const $loading = useLoading({});
const formData = ref({});
const authStore = useAuthStore();
const router = useRouter();
const errors = ref({});const onSubmit = async () => {
  const loader = $loading.show({});
  try {
    const resp = await authStore.register(formData.value);
    errors.value = {};
    notificationStore.showNotification("Register berhasil, silakan lakukan verifikasi akun", 'success');
    router.push("/login");
  } catch (error) {
    // Handle case where error or error.response.data might be null/undefined
    const errorData = error?.response?.data;
    errors.value = errorData?.data || {};
    console.log(errors.value);
    notificationStore.showNotification(errorData?.message || "An error occurred", 'error');
  } finally {
    loader?.hide?.(); // Ensure loader is not null before calling hide
  }
}

</script>

<style lang="scss" scoped></style>
