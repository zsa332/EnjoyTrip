import { createRouter, createWebHistory } from 'vue-router'
import TheMainView from '@/views/TheMainView.vue'

import { useMemberStore } from "@/stores/member";
import { useMenuStore } from "@/stores/menu";

const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore();
  let token = sessionStorage.getItem("accessToken");
  console.log(
    "로그인 처리 전================================",
    memberStore.userInfo,
    token
  );

  if (memberStore.userInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await memberStore.getUserInfo(token);
  }
  if (!memberStore.isValidToken || memberStore.userInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    router.push({ name: "user-login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: TheMainView
    },
    {
      path: '/attraction',
      name: 'attraction',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/TheAttractionView.vue'),
      props: true,
      // children: [
      //   {
      //     path: "/select",
      //     name: "select",
      //     component: () => import("@/components/plan/PlanSelect.vue"),
      //   },
      //   {
      //     path: "/make",
      //     name: "makeList",
      //     component: () => import("@/components/plan/PlanMakeList.vue"),
      //   },
      //   {
      //     path: "/create",
      //     name: "createPlan",
      //     component: () => import("@/components/plan/PlanCreate.vue"),
      //   },
        
      // ]
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/TheUserView.vue"),
      children: [
        {
          path: "/login",
          name: "user-login",
          component: () => import("@/components/user/UserLogin.vue"),
        },
        {
          path: "/join",
          name: "user-join",
          component: () => import("@/components/user/UserRegist.vue"),
        },
        {
          path: "/logout",
          name: "user-logout",
          beforeEnter(to, from, next) { 
            const memberStore = useMemberStore();
            const { changeMenuState } = useMenuStore();
            console.log(memberStore.userInfo.userEmail)
            memberStore.userLogout(memberStore.userInfo.userEmail);
            changeMenuState();
            next('/');
          }
        },
        // {
        //   path: "modify/:userid",
        //   name: "user-modify",
        //   component: () => import("@/components/users/UserModify.vue"),
        // },
      ],
    },

    {
      path: "/board",
      name: "board",
      // component: TheBoardView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/TheBoardView.vue"),
      redirect: { name: "article-list" },
      children: [
        {
          path: "list",
          name: "article-list",
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "view/:articleno",
          name: "article-view",
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "article-write",
          component: () => import("@/components/board/BoardWrite.vue"),
        },
        {
          path: "modify/:articleno",
          name: "article-modify",
          component: () => import("@/components/board/BoardModify.vue"),
        },
      ],
    },
    
    {
      path: "/mypage",
      name: "mypage",
      component: () => import("@/views/TheMyView.vue"),
      redirect: { name: "mypage-modify" },
      children: [
        {
          path: "/modify",
          name: "mypage-modify",
          component: () => import("@/components/user/UserModify.vue"),
        }
      ],
    },
  ]
})

export default router
