<script setup>
import TheHeadingNavbar from '@/components/layout/TheHeadingNavbar.vue';

</script>

<template>
    <TheHeadingNavbar :light="true" />
<div class="space"></div>
<div class="container min-vh-100">
    <!-- <div class="row border">
            <div class="col-md-3 order-md-1 mb-4 d-flex justify-content-end border">
                <ul class="navbar-nav mb-2 me-lg-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'mypage-modify' }" class="nav-link">내 정보 수정하기</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="" class="nav-link">내 여행 계획</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :to="" class="nav-link">내 여행 계획</router-link>
                    </li>
                </ul>
                </div>
                <div class="col-md-8 order-md-2 border">
                
                </div>
            </div> -->
        <router-view></router-view>
    </div>
</template>

<style scoped>
.space {
    width: 100%;
    height: 200px;
}
</style>