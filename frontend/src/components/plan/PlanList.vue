<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js"
import { listPlan, removeTripPlan } from "@/api/plan.js"
import { findTripMember } from "@/api/invitation.js"
import PlanAddUserModal from "@/components/plan/PlanAddUserModal.vue"
const emit = defineEmits(["changeMode"]);

const { userInfo } = storeToRefs(useMemberStore());
const userId = ref(userInfo.value.userId);
// const userId = ref(5);
const planList = ref([]);

const targetPlanId = ref(5);

onMounted(() => {
  getPlanList(userId.value);
})

const movePlan = (planId, title) => {
  emit('changeMode', 'attraction', planId, title);
  // router.push({ name: "attraction", state: { mode:'attraction', planId: planId, title: title } });
}
const createPlan = () => {
  emit('changeMode', 'create');
  // router.push({ name: "attraction", state: { mode:'create' }});
}

const getPlanList = () => {
  listPlan(
    userId.value,
    ({ data }) => {
      var list = [];
      data.forEach((plan) => {
        list.push(plan)
      });
      planList.value = list;
    },
    (err) => {
      console.log(err);
    }
  );
}

const getDateFomr = (timestamp) => {
  var date = new Date(timestamp);
  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });

  var formattedDate = year + " " + month + " " + day;
  return formattedDate;
}

const removeTripPlanCall = (planId) => {
  removeTripPlan(
    planId,
    () => { getPlanList(); },
    (err) => { console.log(err) }
  )
}

</script>

<template>
  <div class="justify-content-center overflow-auto" id="plan-list">
    <a href="#"
      class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom justify-content-between">
      <div class="d-flex align-items-center">
        <img src="@\assets\icon\check.png" alt="check" style="width: 20px; margin: 0 10px;">
        <span class="fs-5 fw-semibold">Plans</span>
      </div>
      <img src="@\assets\icon\plus.png" style="width: 30px; margin: 0 10px;" @click="createPlan" />
    </a>
    <div class="list-group list-group-flush border-bottom scrollarea" v-for="plan in planList" :key="plan.planId">
      <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
        <div class="d-flex justify-content-around">
          <div>
            <div class="d-flex w-100 align-items-center justify-content-between" @click="movePlan(plan.planId, plan.title)">
              <div class="d-flex align-items-center">
                <img src="@\assets\icon\plane.png" style="width: 25px; margin: 0 10px 5px 5px;" />
                <strong class="mb-1">{{ plan.title }}</strong>
              </div>
            </div>
            <div class="mb-1 small">{{ getDateFomr(plan.startDate) + " ~ " + getDateFomr(plan.endDate) }}</div>
            <small v-if="plan.userId==userInfo.userId" class="text-muted" @click="removeTripPlanCall(plan.planId)" style="position: relative; top: 0">
              Delete</small>
          </div>
          <div v-if="plan.userId==userInfo.userId" @click="targetPlanId=plan.planId" data-bs-toggle="modal" data-bs-target="#myModal">
            <img src="@\assets\icon\add-user.png" style="width: 19px; margin: 0 10px 5px 5px;" />
          </div>
          <div v-else style="width: 35px;"></div>
        </div>
      </a>
    </div>
  </div>

  <div class="modal" id="myModal">
        <div class="modal-dialog">
            <PlanAddUserModal :planId="targetPlanId"/>
        </div>
    </div>
</template>

<style scoped>
#plan-list {
  width: 100%;
  height: 100%;
  min-width: 290px;
}
</style>
