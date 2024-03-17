<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { useMenuStore } from "@/stores/menu";
import { useInvitationStore } from "@/stores/invitationStore";

const router = useRouter();

// memberStore
const memberStore = useMemberStore();
const { isLogin, userInfo } = storeToRefs(memberStore);
const { userLogin, getUserInfo } = memberStore;
const { changeMenuState } = useMenuStore();

// invitationStore
const invitationStore = useInvitationStore();
const { getInvitation } = invitationStore;


const loginUser = ref({
    userEmail: "",
    userPassword: "",
});

const login = async () => {
    await userLogin(loginUser.value);
    let token = sessionStorage.getItem("accessToken");
    if (isLogin.value) {
        getUserInfo(token);
        changeMenuState();
        
        setTimeout(() => {
            getInvitation(userInfo.value.userId);
            // console.log("userInfo: ", userInfo.value)
        }, 2000);
        router.push("/");
    } else {
        alert('로그인에 실패하였습니다.')
    }
};

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
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
                            <h1 class="fs-4 card-title fw-bold mb-4">로그인</h1>
                            <form v-on:submit.prevent='btnClick'>
                                <div class="mb-3">
                                    <label class="mb-2 text-muted" for="userEmail">Email</label>
                                    <input id="userId" type="id" class="form-control" name="userEmail"
                                        v-model="loginUser.userEmail" required autofocus>
                                </div>

                                <div class="mb-3">
                                    <div class="mb-2 w-100">
                                        <label class="text-muted" for="userPassword">Password</label>
                                        <a href="#" class="float-end">
                                            Forgot Password?
                                        </a>
                                    </div>
                                    <input id="userPassword" type="password" class="form-control" name="userPassword"
                                        v-model="loginUser.userPassword" required>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div class="form-check">
                                        <input type="checkbox" name="remember" id="remember" class="form-check-input">
                                        <label for="remember" class="form-check-label">Remember Me</label>
                                    </div>
                                    <button class="btn btn-primary ms-auto" @click="login">
                                        로그인
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer py-3 border-0">
                            <div class="text-center">
                                회원가입을 하지 않으셨나요?
                                <router-link :to="{ name: 'user-join' }">회원가입</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>