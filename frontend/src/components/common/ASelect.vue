<script setup>
import { ref } from "vue";
defineProps({ selectOption: Array });
const emit = defineEmits(["onKeySelect"]);

const key = ref("");

const onSelect = () => {
    // console.log(key.value + "선택!!!");
    emit("onKeySelect", key.value);
};
</script>

<template>
    <a-select v-model:value=key :options="selectOption" style="width: 120px" @change="onSelect"></a-select>
</template>

<style scoped></style>
