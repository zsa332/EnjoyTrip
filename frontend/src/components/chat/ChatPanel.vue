<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js";
import { listPlanMember } from '@/api/plan.js'


import ChatMessage from "@/components/chat/ChatMessage.vue";


const props = defineProps(["msgs", "planId", "activeMembers"]);

const emit = defineEmits(["sendNewMessage"]);

const { userInfo } = storeToRefs(useMemberStore());
const isActive = ref(false); // 채팅창 활성/비활성
const newMessage = ref(""); // 보내려는 메시지
const planMembers = ref([]) // 여행에 참여한 맴버

onMounted(() => {
    console.log("ChatPanel planId test : ", props.planId);
    getPlanMember();
})

/* 채팅창 활성 비활성 */
const activeChange = () => {
    isActive.value = !isActive.value;
}

/* 여행에 참여한 맴버 가져오기 */
const getPlanMember = () => {
    listPlanMember(
        props.planId,
        ({ data }) => {
            planMembers.value = data;
        },
        (err) => {
            console.log(err);
        }
    )
}

/* 맴버가 현재 접속중인지 체크 */
const isMemberActive = (userId) => {
    console.log("isMemberActive test : ", props.activeMembers)
    return props.activeMembers.members.includes(userId);
}

/* send Message */
const sendMessage = (e) => {
    if ((e.keyCode == 13 || e == 13) && newMessage.value) {
        emit('sendNewMessage', newMessage.value);
        newMessage.value = '';
    }
}

/* 보낸사람이 현재 이용중인 사람인지 체크 */
const getCheck = (userName) => {
    if (userName === userInfo.value.userName) {
        return true;
    }
    else return false;
}

</script>

<template>
    <!-- chat start -->
    <div class="chat-area">
        <!-- chat active btn start -->
        <div class="chat-btn-area" v-if="!isActive">
            <div class="chat-btn" @click="activeChange">
                <div style="height: 32px; width: 32px;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M19.3259 5.77772L18.4944 6.33329V6.33329L19.3259 5.77772ZM19.3259 16.2223L18.4944 15.6667V15.6667L19.3259 16.2223ZM18.2223 17.3259L17.6667 16.4944H17.6667L18.2223 17.3259ZM14 17.9986L13.9956 16.9986C13.4451 17.001 13 17.4481 13 17.9986H14ZM14 18L14.8944 18.4472C14.9639 18.3084 15 18.1552 15 18H14ZM10 18H9C9 18.1552 9.03615 18.3084 9.10557 18.4472L10 18ZM10 17.9986H11C11 17.4481 10.5549 17.001 10.0044 16.9986L10 17.9986ZM5.77772 17.3259L6.33329 16.4944H6.33329L5.77772 17.3259ZM4.67412 16.2223L5.50559 15.6667L5.50559 15.6667L4.67412 16.2223ZM4.67412 5.77772L5.50559 6.33329L4.67412 5.77772ZM5.77772 4.67412L6.33329 5.50559L5.77772 4.67412ZM18.2223 4.67412L17.6667 5.50559L17.6667 5.50559L18.2223 4.67412ZM21 11C21 9.61635 21.0012 8.50334 20.9106 7.61264C20.8183 6.70523 20.6225 5.91829 20.1573 5.22215L18.4944 6.33329C18.7034 6.64604 18.8446 7.06578 18.9209 7.81505C18.9988 8.58104 19 9.57473 19 11H21ZM20.1573 16.7779C20.6225 16.0817 20.8183 15.2948 20.9106 14.3874C21.0012 13.4967 21 12.3836 21 11H19C19 12.4253 18.9988 13.419 18.9209 14.1849C18.8446 14.9342 18.7034 15.354 18.4944 15.6667L20.1573 16.7779ZM18.7779 18.1573C19.3238 17.7926 19.7926 17.3238 20.1573 16.7779L18.4944 15.6667C18.2755 15.9943 17.9943 16.2755 17.6667 16.4944L18.7779 18.1573ZM14.0044 18.9986C15.0785 18.9939 15.9763 18.9739 16.7267 18.8701C17.4931 18.7642 18.1699 18.5636 18.7779 18.1573L17.6667 16.4944C17.3934 16.6771 17.0378 16.8081 16.4528 16.889C15.8518 16.9721 15.0792 16.9939 13.9956 16.9986L14.0044 18.9986ZM15 18V17.9986H13V18H15ZM13.7889 20.6584L14.8944 18.4472L13.1056 17.5528L12 19.7639L13.7889 20.6584ZM10.2111 20.6584C10.9482 22.1325 13.0518 22.1325 13.7889 20.6584L12 19.7639L12 19.7639L10.2111 20.6584ZM9.10557 18.4472L10.2111 20.6584L12 19.7639L10.8944 17.5528L9.10557 18.4472ZM9 17.9986V18H11V17.9986H9ZM5.22215 18.1573C5.83014 18.5636 6.50685 18.7642 7.2733 18.8701C8.02368 18.9739 8.92154 18.9939 9.99564 18.9986L10.0044 16.9986C8.92075 16.9939 8.14815 16.9721 7.54716 16.889C6.96223 16.8081 6.60665 16.6771 6.33329 16.4944L5.22215 18.1573ZM3.84265 16.7779C4.20744 17.3238 4.6762 17.7926 5.22215 18.1573L6.33329 16.4944C6.00572 16.2755 5.72447 15.9943 5.50559 15.6667L3.84265 16.7779ZM3 11C3 12.3836 2.99879 13.4967 3.0894 14.3874C3.18171 15.2948 3.3775 16.0817 3.84265 16.7779L5.50559 15.6667C5.29662 15.354 5.15535 14.9342 5.07913 14.1849C5.00121 13.419 5 12.4253 5 11H3ZM3.84265 5.22215C3.3775 5.91829 3.18171 6.70523 3.0894 7.61264C2.99879 8.50334 3 9.61635 3 11H5C5 9.57473 5.00121 8.58104 5.07913 7.81505C5.15535 7.06578 5.29662 6.64604 5.50559 6.33329L3.84265 5.22215ZM5.22215 3.84265C4.6762 4.20744 4.20744 4.6762 3.84265 5.22215L5.50559 6.33329C5.72447 6.00572 6.00572 5.72447 6.33329 5.50559L5.22215 3.84265ZM11 3C9.61635 3 8.50334 2.99879 7.61264 3.0894C6.70523 3.18171 5.91829 3.3775 5.22215 3.84265L6.33329 5.50559C6.64604 5.29662 7.06578 5.15535 7.81505 5.07913C8.58104 5.00121 9.57473 5 11 5V3ZM13 3H11V5H13V3ZM18.7779 3.84265C18.0817 3.3775 17.2948 3.18171 16.3874 3.0894C15.4967 2.99879 14.3836 3 13 3V5C14.4253 5 15.419 5.00121 16.1849 5.07913C16.9342 5.15535 17.354 5.29662 17.6667 5.50559L18.7779 3.84265ZM20.1573 5.22215C19.7926 4.6762 19.3238 4.20744 18.7779 3.84265L17.6667 5.50559C17.9943 5.72447 18.2755 6.00572 18.4944 6.33329L20.1573 5.22215Z">
                        </path>
                        <circle cx="16" cy="11" r="1" stroke-linecap="round"></circle>
                        <circle cx="12" cy="11" r="1" stroke-linecap="round"></circle>
                        <circle cx="8" cy="11" r="1" stroke-linecap="round"></circle>
                    </svg>
                </div>
            </div>
        </div>

        <div class="chat-field" v-else>
            <div class="chat-content-area">
                <div class="chat-member">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                        style="height: 1.75rem; width: 1.75rem; flex-shrink: 0; margin: 1rem; cursor: pointer; color: black;"
                        @click="activeChange">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>

                    <div class="chat-member-info" v-for="(member, idx) in planMembers" :key="idx">
                        <div
                            :class="isMemberActive(member.userId) ? 'chat-member-status-active' : 'chat-member-status-unactive'">
                            <div class="chat-member-img">
                            </div>
                        </div>
                        <div class="chat-member-name"> {{ member.userName }} </div>
                    </div>
                </div>


                <div class="chat-content">
                    <div class="chat-message-field">
                        <ChatMessage v-for="(msg, idx) in props.msgs" :key="idx" :msg="msg" :isMe="getCheck(msg.userName)">
                        </ChatMessage>

                    </div>
                    <div class="chat-message-form">
                        <input class="chat-message-input" placeholder="Type your message here" @keyup="sendMessage"
                            v-model="newMessage">
                        <button class="chat-message-btn" @click="sendMessage(13)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path data-v-46284fc5="" stroke-linecap="round" stroke-linejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- chat end -->
</template>

<style scoped>
.chat-area {
    position: absolute;
    right: 0px;
    bottom: 0px;
    z-index: 10;
    border: 1px solid;
}

.chat-btn-area {
    position: fixed;
    bottom: 0px;
    right: 0px;
    overflow: hidden;
    transform: translateY(0%);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-delay: 300ms;
}

.chat-btn {
    border-radius: 50%;
    cursor: pointer;
    background-color: rgb(2, 92, 219);
    margin: 20px;
    padding: 0.75rem;
    fill: white;
}

.chat-field {
    position: fixed;
    bottom: 0px;
    right: 0px;
    max-height: 100%;
    max-width: 100%;
    width: 500px;
    height: 700px;
    overflow: hidden;
    transform: translateY(0%);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-delay: 300ms;
}

.chat-content-area {
    margin: 20px;
    overflow: hidden;
    border-radius: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 6px;
    max-height: calc(100% - 40px);
    max-width: calc(100% - 40px);
    width: calc(450px);
    height: calc(660px);
    display: flex;
}

.chat-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;
}

.chat-member {
    height: 100%;
    width: 30%;
    flex-shrink: 0;
    background-color: white;
    border-right: 1px solid gray;
}


.chat-member-status-active {
    border-radius: 50%;
    background-color: rgb(79, 194, 79);
    width: 31px;
    height: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
}

.chat-member-status-unactive {
    border-radius: 50%;
    background-color: rgb(145, 145, 145);
    width: 31px;
    height: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
}

.chat-member-img {
    border-radius: 50%;
    background-color: white;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
}


.chat-member-info {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 8px;
    margin-bottom: auto;
    width: 100%;
    display: flex;
    /* justify-content: space-around; */
    align-items: center;
}

.chat-member-name {
    font-size: 1.1rem;
    line-height: 1.5rem;
}


.chat-message-field {
    height: 100%;
    overscroll-behavior-y: contain;
    overflow: hidden auto;
    background-color: rgb(234, 238, 243);
    padding: 1.5rem;
}

.chat-message-form {
    display: flex;
    height: 60px;
    background-color: white;
    color: black;
}

.chat-message-input {
    border-width: 0px;
    background-color: white;
    color: black;
    width: 100%;
    margin-left: 1rem;
    font-size: 1rem;
}

.chat-message-btn {
    background-color: white;
    border: none;
}
</style>