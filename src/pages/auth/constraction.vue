<template>
  <AuthLayout>
    <section class="md:w-[70%] w-full h-screen flex flex-col justify-center p-10 relative md:p-0">
      <div @click="$router.push('/')" class="absolute right-0 p-10 md:p-0 top-10 text-primary cursor-pointer">< Halaman Utama</div>

        <div class="text-xl font-bold text-primary mb-2">Page 404</div>
           Page is under construction.
        <Button @click="$router.go(-1)" class="w-full py-3 mt-4">Back</Button>
    </section>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/index.vue";
import Button from "@/components/button/index.vue";
</script>

<style lang="scss" scoped></style>
