<template>
  <AuthLayout>
    <section class="md:w-[70%] w-full h-screen flex flex-col justify-center p-10 relative md:p-0">
      <div @click="$router.push('/')" class="absolute right-0 p-10 md:p-0 top-10 text-primary cursor-pointer">< Halaman Utama</div>

      <div class="text-3xl text-start mt-5 mb-5 font-bold text-primary">
        Login
      </div>
      <div
        class="text-primary"
      >
        Belum punya akun? <span class="cursor-pointer font-bold" @click="$router.push('/register')">Klik Di sini</span>
      </div>
      <form @submit.prevent="onSubmit">
        <FormInput
          v-model="formData.email"
          :marginBottom="true"
          placeholder="email"
          class="w-full mt-5"
        >
          <template #label><span class="text-primary">email</span></template>
          <template #error><span class="text-red-500">{{ errors?.email?.[0] }}</span></template>
        </FormInput>
        <FormInput
          v-model="formData.password"
          :marginBottom="true"
          type="password"
          placeholder="Password"
          class="w-full mt-5"
        >
          <template #label
            ><span class="text-primary">Password</span></template
          >
          <template #error><span class="text-red-500">{{ errors?.password?.[0] }}</span></template>
        </FormInput>
        <div class="justify-between gap-4 flex items-center text-primary">
          <span @click="$router.push('/forgot-password')" class="cursor-pointer text-primary text-sm font-medium">Forget Password?</span>
        </div>
        <div class="flex justify-end">
          <Button type="submit" class="w-max py-3 mt-5">Login</Button>
        </div>
      </form>

      
    </section>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/index.vue";
import Button from "@/components/button/index.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "vue-router";
import { ref } from "vue";

import { useLoading } from "vue-loading-overlay";
import { useAuthStore } from "../../stores/authStore";
import { useNotificationStore } from "../../stores/notification";
const notificationStore = useNotificationStore();
const $loading = useLoading({});
const authStore = useAuthStore();
const router = useRouter();

const errors = ref({});
const formData = ref({});
const onSubmit = async () => {
  const loader = $loading.show({});
  try {
    const resp = await authStore.login(formData.value);
    notificationStore.showNotification(resp?.data?.message, "success");
    const role = authStore.user.role?.toLowerCase();
    if (role === "admin") {
      router.push("/courses/create");
    }else{
      router.push("/courses");
    }
  } catch (error) {
    // Handle case where error or error.response.data might be null/undefined
    const errorData = error?.response?.data;
    errors.value = errorData?.data || {};
    notificationStore.showNotification(errorData?.message || "Password atau email salah", "error");
  } finally {
    loader?.hide?.(); // Ensure loader is not null before calling hide
  }
};
</script>

<style lang="scss" scoped></style>
