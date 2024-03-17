<script setup>
import { storeToRefs } from 'pinia';
import { useMemberStore } from '@/stores/member';
import { useRouter } from "vue-router";

const memberStore = useMemberStore();
const router = useRouter();

const { userInfo } = storeToRefs(memberStore);
const { userInfoModify } = memberStore;

console.log(userInfo);

const modifyBtnClick = () => {
  if (confirm("정말 변경하시겠습니까??") == true) {
    onModify();
  } else {
    return;
  }
}

const onModify = async () => {
  await userInfoModify(userInfo);
  console.log(userInfo);
}
</script>

<template>
  <!-- 유저 목록 start -->
  <section class="h-100">
    <div class="container h-100">
      <div class="row justify-content-sm-center h-100">
        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
          <div class="text-center my-5">
          </div>
          <div class="card shadow-lg">
            <div class="card-body p-5">
              <h1 class="fs-4 card-title fw-bold mb-4">개인 정보 수정</h1>
              <form @submit.prevent="onSubmit">
                <div class="mb-3">
                  <label class="mb-2 text-muted" for="userEmail">Email</label>
                  <input id="userEmail" type="id" class="form-control" name="userEmail" :value="userInfo.userEmail"
                    disabled>
                </div>
                <div class="mb-3">
                  <div class="mb-2 w-100">
                    <label class="text-muted" for="userName">Name</label>
                    <input id="userName" type="text" class="form-control" name="userName" v-model="userInfo.userName"
                      disabled>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="mb-2 w-100">
                    <label class="text-muted" for="userPassword">Password</label>
                    <input id="userPassword" type="password" class="form-control" name="userPassword"
                      v-model="userInfo.userPassword" required>
                  </div>
                </div>

                <div class="d-flex align-items-center">
                  <button class="btn btn-primary ms-auto" @click="modifyBtnClick">
                    수정
                  </button>
                </div>
              </form>
            </div>
            <div class="card-footer py-3 border-0">
              <div class="text-center">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>