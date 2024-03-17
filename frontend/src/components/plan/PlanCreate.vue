<script setup>
import { reactive } from 'vue';

import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js"
import { createTripPlan } from "@/api/plan";

const emit = defineEmits(["changeMode"]);

const { userInfo } = storeToRefs(useMemberStore());
const userId = ref(userInfo.value.userId);
// const userId = ref(5);

const formState = reactive({
  title: ''
});

const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 12,
  },
};
const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};

const onFinish = values => {
  // console.log('Success:', {
  //   title: values["title"],
  //   userId: userId,
  //   startDate: values["date"][0],
  //   endDate: values["date"][1],
  //   startDate2: new Date(values["date"][0]).getTime(),
  //   endDate2: new Date(values["date"][1]).getTime(),
  // });
  createTripPlan(
    {
      title: values["title"],
      userId: userId.value,
      startDate: new Date(values["date"][0]).getTime(),
      endDate: new Date(values["date"][1]).getTime(),
    },
    ({ data }) => {
      emit('changeMode', 'attraction', data.planId, data.title);
      // router.push({ name: "attraction", state: { userId: data.userId, planId: data.planId, title: data.title } });
    },
    (err) => {
      console.log(err);
    }
  );
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

</script>

<template>
  <div class="justify-content-center create-form-container">
    <h3>Make Plan</h3>
    <a-form ref="formRef" :model="formState" name="dynamic_rule" v-bind="formItemLayout" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed">

      <a-form-item label="Title" name="title" :rules="[{ required: true, message: 'Please input title!' }]">
        <a-input v-model:value="formState.title" />
      </a-form-item>

      <a-form-item name="date" label="Date" v-bind="rangeConfig">
        <a-range-picker v-model:value="formState['date']" value-format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>

      <a-form-item v-bind="formTailLayout">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.create-form-container {
  /* position: absolute; */
  width: 100%;
  height: 100%;
  margin: 50px;
}
</style>


