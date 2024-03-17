<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js"

import Stomp from 'webstomp-client';
import SockJS from "sockjs-client/dist/sockjs";
import logo from '@/assets/logo/logo.vue';
import PlanMakeList from "@/components/plan/PlanMakeList.vue";
import PlanList from "@/components/plan/PlanList.vue";
import PlanCreate from "../components/plan/PlanCreate.vue";
import PlanAttractionList from "@/components/plan/PlanAttractionList.vue";
import ChatPanel from '../components/chat/ChatPanel.vue';

const router = useRouter();

const mode = ref('map');
const planId = ref();
const { userInfo } = storeToRefs(useMemberStore());
const title = ref('default title')
const sidoCode = history.state.sidoCode;
const activeKey = ref('');
const planAttractionRef = ref(null);
const planAttractionList = ref([]);
const msgData = ref([]);
const activeMembers = ref([]);

const moveMain = () => {
  router.push({ name: 'main' })
}

const changeMode = (m, p, t) => {
  mode.value = m;
  if (!p && stompClient && stompClient.connected) {
    disconnect();
  }
  planId.value = p;
  title.value = t;
  if (p) {
    connect();
  }

}

const callGetAttractionList = (contentId) => {
  planAttractionRef.value.addPlanAttraction(contentId);
}

// const setPlanParam = () => {
// }

/* socket connect */
let stompClient = null;
const connect = () => {
  const serverURL = 'http://localhost:80/ws';
  const socket = new SockJS(serverURL);
  stompClient = Stomp.over(socket);
  var rooms = {
    userId: userInfo.value.userId,
    planId: planId.value
  };

  stompClient.connect(
    {},
    (frame) => {
      console.log('소켓 연결 성공', frame);
      stompClient.subscribe('/topic/channel/' + planId.value, (res) => {
        let data = JSON.parse(res.body);
        if (data.type == 'plan') { // 여행 계획 메시지
          if (data.action == 'insert') {
            let isIn = false;
            for (let i = 0; i < planAttractionList.value.length; i++) {
              if (planAttractionList.value[i].contentId == data.contentId) {
                isIn = true;
                break;
              }
            }
            if (!isIn) planAttractionList.value.push(data);
          }
          else if (data.action == 'delete') {
            for (let i = 0; i < planAttractionList.value.length; i++) {
              if (planAttractionList.value[i].contentId == data.contentId) {
                planAttractionList.value.splice(i, 1);
                break;
              }
            }
          }
        }
        else if (data.type == 'chat') { // 채팅 메시지
          msgData.value.push(data);
        }
        else if (data.type == 'room') {
          activeMembers.value = data;
        }
      });
      stompClient.send("/app/enter", JSON.stringify(rooms), {}); // 접속 알림
    },
    (error) => {
      console.log('소켓 연결 실패', error);
    }
  );
};


/* 여행지 추가/제거 Socket Send */
const sendAttraction = (data, action) => {
  if (stompClient && stompClient.connected) {
    const msg = {
      type: 'plan',
      planId: planId.value,
      action: action,
      contentId: data.contentId,
      contentTypeId: data.contentTypeId,
      title: data.title,
      addr1: data.addr1,
      addr2: data.addr2,
      tel: data.tel,
      firstImage: data.firstImage,
      firstImage2: data.firstImage2,
      sidoCode: data.sidoCode,
      gugunCode: data.gugunCode,
      latitude: data.latitude,
      longitude: data.longitude,
      mlevel: data.mlevel
    };
    stompClient.send('/app/plan', JSON.stringify(msg), {});
  }
};


/* 접속한 plan의 계획 초기값 */
const planInit = (data) => {
  data.forEach((item) => {
    planAttractionList.value.push(item);
  });
}

/* plan에 여행지 추가시 planAttractionList에 추가 및 소켓 통신 */
const addPlan = (data) => {
  sendAttraction(data, 'insert');
}

/* plan에 여행지 제거시 planAttractionList에서 제거 및 소켓 통신 */
const removePlan = (data) => {
  sendAttraction(data, 'delete')
}

/* chat에서 메시지 send */
const sendMessage = (msg) => {
  if (stompClient && stompClient.connected) {
    const sendChatMsg = {
      type: 'chat',
      planId: planId.value,
      userName: userInfo.value.userName,
      message: msg
    }
    stompClient.send('/app/chat', JSON.stringify(sendChatMsg), {});
  }
}

// 페이지가 닫힐 때 실행될 함수
const sendDataOnUnload = (e) => {
  // 서버에 데이터를 보내는 작업을 수행
  disconnect();
  // 커스텀 메시지 설정 (일부 브라우저에서 표시될 수 있음)
  e.returnValue = '이 페이지를 떠나시겠습니까?';
}

// 페이지 종료시 이벤트 추가
window.addEventListener('beforeunload', sendDataOnUnload);
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', sendDataOnUnload);
  disconnect();
});

/* socket disconnect */
const disconnect = () => {
  var rooms = {
    userId: userInfo.value.userId,
    planId: planId.value
  };

  stompClient.send("/app/exit", JSON.stringify(rooms), {});
  stompClient.disconnect();
}
</script>

<template>
  <div id="tap-container" class="d-flex">
    <a-tabs v-model="activeKey" tab-position="left" size="large" :defaultActiveKey="mode === 'map' ? 'map' : 'plan'">
      <a-tab-pane key='home' style="margin: 0; padding: 0;" id="tap-home">
        <template #tab>
          <span @click="moveMain">
            <logo width="65px" height="40px" />
          </span>
        </template>
      </a-tab-pane>

      <a-tab-pane key='map' tab="Map" style="margin: 0; padding: 0;">
      </a-tab-pane>

      <a-tab-pane key="plan" tab="Plan" style="margin: 0; padding: 0;">
        <div class="d-flex" id="plan-container">
          <div v-if="mode === 'map'" style="max-width: 400px;">
            <PlanList @changeMode="changeMode" />
          </div>
          <div v-else-if="mode === 'create'" style="max-width: 400px;">
            <PlanCreate @changeMode="changeMode" />
          </div>
          <div v-else-if="mode === 'attraction'" style="max-width: 400px;">
            <PlanAttractionList ref="planAttractionRef" @changeMode="changeMode" @planInit="planInit" @addPlan="addPlan"
              @removePlan="removePlan" :title="title" :planId="planId" :planAttractionList="planAttractionList" />
          </div>

        </div>
      </a-tab-pane>
      <div id="plan-make-container">
        <PlanMakeList @callGetAttractionList="callGetAttractionList" :mode="mode" :planId="planId" :sidoCode="sidoCode" />
      </div>
    </a-tabs>
  </div>
  <ChatPanel v-if="planId" @sendNewMessage="sendMessage" :msgs="msgData" :planId="planId" :activeMembers="activeMembers">
  </ChatPanel>
</template>

<style scoped>
#tap-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>