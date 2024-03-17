<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
    card: Object
})

const onPlan = () => {
    // 클릭시 계획 페이지로 이동하기(param으로 sidoCode 넘기기)
    router.push({name: 'attraction', state: {sidoCode: props.card.sidoCode}})
}
</script>

<template>
    <div class="card" @click="onPlan">
        <img class="card-img-top" :src="props.card.image" alt="Card image">
        <div class="card-body">
            <h4 class="card-title">{{ props.card.title }}</h4>
            <!-- <p class="card-text">{{ props.card.info }}</p> -->
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 100%;
    margin: 10px;
}

.img-wrapper {
    position: relative;
    width: 500px;
    height: 500px;
}

.card-img-top {
    width: 100%;
    height: 260px;
    object-fit: cover;
}

.card>img {}
</style>
