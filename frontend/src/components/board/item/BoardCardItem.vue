<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
    article: Object
})
console.log(props.article)

const getImg = () => {
    return "http://localhost/board/display?today=" + props.article.fileInfo.saveFolder + '&savefile=' + props.article.fileInfo.saveFile;
}

const onView = () => {
    router.push({ name: 'article-view', params: { articleno: props.article.articleNo } });
}
</script>

<template>
    <div class="card" @click="onView">
        <img v-if="props.article.fileInfo" class="card-img-top" :src="getImg()" alt="Card image" />
        <img v-else class="card-img-top" src="@/assets/img/no/noimage.jpg" alt="Card image" />
        <div class="card-body">
            <h4 class="card-title">{{ props.article.subject }}</h4>
            <p class="card-text">{{ props.article.userName }}</p>
        </div>
    </div>
</template>

<style scoped>
img {
    width: 100%;
    height: 230px;
    object-fit: cover;
}

.card>img {}
</style>
