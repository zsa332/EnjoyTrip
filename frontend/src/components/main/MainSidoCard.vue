<script setup>
import { ref } from 'vue';
import ImageCard from "@/components/common/ImageCard.vue";
import { listArea } from "@/api/attraction";


const sidoList = ref(null);

const getSidoList = () => {
    listArea(
        0,
        ({ data }) => {
            let sidos = [];
            data.forEach((sido) => {
                sidos.push({ title: sido.sidoName, sidoCode: sido.sidoCode, image: sido.sidoImg, info: '정보...' });
            });
            sidoList.value = sidos;
        },
        (err) => {
            console.log(err);
        }
    );
};
getSidoList();
</script>

<template>
    <div class="row" id="card-wrapper">
        <div class="text-center mb-5" height="200px">
            <h2 class="font-weight-bold">어디로 여행을 떠나시나요?</h2>
            <hr>
        </div>
        <div v-for="sido in sidoList" class="col-sm-5 col-xl-3 ">
            <ImageCard :card="sido" />
        </div>
    </div>
</template>

<style scoped>
#card-wrapper {
    margin: auto 10%;
}

.space {
    width: 100%;
    height: 200px;
}
</style>