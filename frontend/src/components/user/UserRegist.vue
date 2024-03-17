<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { useRouter } from "vue-router";

const memberStore = useMemberStore();
const router = useRouter();
const { isEmailDuplicate, isNameDuplicate } = storeToRefs(memberStore);
const { userRegist, userEmailDuplicateCheck, userNameDuplicateCheck } = memberStore;
const isEmailPossible = ref(false);
const isNamePossible = ref(false);

const userInfo = ref({
    userEmail: '',
    userName: '',
    userPassword: ''
});

const checkPassword = ref('');
const massage = ref('');

const onEmailCheck = () => {
    if (userInfo.value.userEmail === '') massage.value = 'Email 칸이 비어있습니다.'
    else {
        emailCheck();
        isEmailPossible.value = true;
    }
}

const emailCheck = async () => {
    await userEmailDuplicateCheck(userInfo.value.userEmail);
    console.log(isEmailDuplicate.value)
}

const onNameCheck = () => {
    if (userInfo.value.userName === '') massage.value = 'Name 칸이 비어있습니다.'
    else {
        nameCheck();
        isNamePossible.value = true;
    }
}

const nameCheck = async () => {
    await userNameDuplicateCheck(userInfo.value.userName);
    console.log(isNameDuplicate.value)
}

const onRegist = async () => {
    console.log(isEmailDuplicate.value);
    if (userInfo.value.userEmail === '' || !isEmailDuplicate.value) massage.value = 'Email을 확인해주세요.';
    else if (userInfo.value.userName === '' || !isNameDuplicate.value) massage.value = 'Name을 확인해주세요.';
    else if (userInfo.value.userPassword === '' || checkPassword.value === '' || userInfo.value.userPassword !== checkPassword.value) massage.value = 'Password를 확인해주세요.';
    else {
        // 회원가입 api 통신하기
        await userRegist(userInfo);
        router.push({ name: "user-login" });
    }
}

</script>

<template>
    <section class="h-100">
        <div class="container h-100">
            <div class="row justify-content-sm-center h-100">
                <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                    <div class="text-center my-5">
                    </div>
                    <div class="card shadow-lg">
                        <div class="card-body p-5">
                            <h1 class="fs-4 card-title fw-bold mb-4">회원가입</h1>
                            <form @submit.prevent="onSubmit">
                                <div class="mb-3">
                                    <label class="mb-2 text-muted" for="userEmail">Email</label>
                                    <input id="userEmail" type="id" class="form-control" name="userEmail"
                                        v-model="userInfo.userEmail" required autofocus>
                                    <button class="btn btn-primary ms-auto" @click="onEmailCheck">
                                        중복체크
                                    </button>
                                    <span class="" v-if="!isEmailDuplicate && isEmailPossible">이미 사용중인
                                        Email입니다.</span>
                                    <span class="" v-if="isEmailDuplicate && isEmailPossible">사용가능한
                                        Email입니다.</span>
                                </div>
                                <div class="mb-3">
                                    <div class="mb-2 w-100">
                                        <label class="text-muted" for="userName">Name</label>
                                        <input id="userName" type="text" class="form-control" name="userName"
                                            v-model="userInfo.userName" required>
                                        <button class="btn btn-primary ms-auto" @click="onNameCheck">
                                            중복체크
                                        </button>
                                        <span class="" v-if="!isNameDuplicate && isNamePossible">이미 사용중인
                                            Name입니다.</span>
                                        <span class="" v-if="isNameDuplicate && isNamePossible">사용가능한 Name입니다.</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="mb-2 w-100">
                                        <label class="text-muted" for="userPassword">Password</label>
                                        <input id="userPassword" type="password" class="form-control" name="userPassword"
                                            v-model="userInfo.userPassword" required>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="mb-2 w-100">
                                        <label class="text-muted" for="checkPassword">Password 확인</label>
                                        <input id="checkPassword" type="password" class="form-control" name="checkPassword"
                                            v-model="checkPassword" required>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="mb-2 w-100 text-danger">
                                        {{ massage }}
                                    </div>
                                </div>

                                <div class="d-flex align-items-center">
                                    <div class="form-check">
                                    </div>
                                    <button class="btn btn-primary ms-auto" @click="onRegist">
                                        회원가입
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer py-3 border-0">
                            <div class="text-center">
                                계정이 있으신가요?
                                <router-link :to="{ name: 'user-login' }">로그인</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>