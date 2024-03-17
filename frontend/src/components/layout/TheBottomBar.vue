<script setup>
import logo from '@/assets/logo/logo.vue';
</script>

<template>
  <footer class="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <router-link :to="{ name: 'main' }" class="navbar-brand fw-bold">
        <logo :width="'100px'" :height="'70px'" />
      </router-link>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3">
        <router-link :to="{ name: 'main' }" class="text-body-secondary">Home</router-link>
      </li>
      <li class="ms-3"><a class="text-body-secondary" href="#">오시는길</a></li>
      <li class="ms-3"><a class="text-body-secondary" href="#">이용약관</a></li>
    </ul>
    <span class="mb-3 mb-md-0 text-body-secondary">©2023 SSAFY</span>
  </footer>
</template>

<style scoped></style>
