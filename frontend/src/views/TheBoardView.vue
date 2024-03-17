<script setup>
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue"
</script>

<template>
  <TheHeadingNavbar :light="true" />
  <div class="space"></div>
  <div class="container text-center mt-3 min-vh-100">
    <router-view></router-view>
  </div>
</template>

<style>
mark.sky {
  background: linear-gradient(to top, #54fff9 20%, transparent 30%);
}

.space {
  width: 100%;
  height: 100px;
}
</style>
