<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { detailArticle, deleteArticle } from "@/api/board";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js"

const { userInfo } = storeToRefs(useMemberStore());

const route = useRoute();
const router = useRouter();

// const articleno = ref(route.params.articleno);
const { articleno } = route.params;

const article = ref({});
const isAuth = ref(false);
onMounted(() => {
  getArticle();
});

const getArticle = () => {
  // const { articleno } = route.params;
  console.log(articleno + "번글 얻으러 가자!!!");
  detailArticle(
    articleno,
    ({ data }) => {
      article.value = data;
      console.log(article.value.userId);
      console.log(userInfo.value.userId);
      if (article.value.userId == userInfo.value.userId) isAuth.value = true;
      console.log(isAuth.value);
    },
    (error) => {
      console.error(error);
    }
  );
};

function moveList() {
  router.push({ name: "article-list" });
}

function moveModify() {
  router.push({ name: "article-modify", params: { articleno } });
}

function onDeleteArticle() {
  // const { articleno } = route.params;
  console.log(articleno + "번글 삭제하러 가자!!!");
  deleteArticle(
    articleno,
    (response) => {
      if (response.status == 200) moveList();
    },
    (error) => {
      console.error(error);
    }
  );
}

const getImg = () => {
  return "http://localhost/board/display?today=" + article.value.fileInfo.saveFolder + '&savefile=' + article.value.fileInfo.saveFile;
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          {{ article.articleNo }}. {{ article.subject }}
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <div class="row my-2">
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" />
              <p>
                <span class="fw-bold">{{ article.userName }}</span> <br />
                <span class="text-secondary fw-light">
                  {{ article.registerTime }}1 조회 : {{ article.hit }}
                </span>
              </p>
            </div>
          </div>
          <div class="col-md-4 align-self-center text-end">댓글 : 0</div>
          <div class="divider mb-3">

            <img v-if="article.fileInfo" class="att-img" :src="getImg()" alt="image"/>
          </div>
          <div class="text-secondary h4 border-top">
            {{ article.content }}
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-dark mb-3" @click="moveList">
              글목록
            </button>
            <button type="button" class="btn btn-outline-dark mb-3 ms-1" @click="moveModify" v-if="isAuth">
              글수정
            </button>
            <button type="button" class="btn btn-outline-dark mb-3 ms-1" @click="onDeleteArticle" v-if="isAuth">
              글삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.att-img {
  width: 30%;
}
</style>
