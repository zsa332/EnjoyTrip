<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { registArticle, detailArticle, modifyArticle } from "@/api/board";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js"

const { userInfo } = storeToRefs(useMemberStore());

const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

const isUseId = ref(false);

const article = ref({
  articleNo: 0,
  subject: "",
  content: "",
  userId: userInfo.value.userId,
  userName: "",
  hit: 0,
  registerTime: ""
});
const file = ref('');

if (props.type === "modify") {
  let { articleno } = route.params;
  console.log(articleno + "번글 얻어와서 수정할거야");
  detailArticle(
    articleno,
    ({ data }) => {
      console.log(data)
      article.value = data;
      console.log(article.value)
      isUseId.value = true;
    },
    (error) => {
      console.error(error);
    }
  );
  isUseId.value = true;
}

const subjectErrMsg = ref("");
const contentErrMsg = ref("");
watch(
  () => article.value.subject,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 30) {
      subjectErrMsg.value = "제목을 확인해 주세요!!!";
    } else subjectErrMsg.value = "";
  },
  { immediate: true }
);
watch(
  () => article.value.content,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 500) {
      contentErrMsg.value = "내용을 확인해 주세요!!!";
    } else contentErrMsg.value = "";
  },
  { immediate: true }
);

function onSubmit() {
  // event.preventDefault();

  if (subjectErrMsg.value) {
    alert(subjectErrMsg.value);
  } else if (contentErrMsg.value) {
    alert(contentErrMsg.value);
  } else {
    props.type === "regist" ? writeArticle() : updateArticle();
  }
}

function writeArticle() {
  console.log("글등록하자!!", file.value);
  const formData = new FormData();
  formData.append('subject', article.value.subject);
  formData.append('content', article.value.content);
  formData.append('userId', article.value.userId);
  formData.append('upfile', file.value);
  // // FormData의 key 확인
  // for (let key of formData.keys()) {
  //   console.log(key);
  // }

  // FormData의 value 확인
  for (let value of formData.values()) {
    console.log(value);
  }
  registArticle(
    formData,
    (response) => {
      let msg = "글등록 처리시 문제 발생했습니다.";
      if (response.status == 201) msg = "글등록이 완료되었습니다.";
      alert(msg);
      moveList();
    },
    (error) => console.error(error)
  );
}

function updateArticle() {
  console.log(article.value.articleNo + "번글 수정하자!!", article.value);

  const formData = new FormData();
  formData.append('articleNo', article.value.articleNo);
  formData.append('userName', article.value.userName);
  formData.append('subject', article.value.subject);
  formData.append('content', article.value.content);
  formData.append('userId', article.value.userId);
  formData.append('upfile', file.value);

  modifyArticle(
    formData,
    (response) => {
      let msg = "글수정 처리시 문제 발생했습니다.";
      if (response.status == 200) msg = "글정보 수정이 완료되었습니다.";
      alert(msg);
      moveList();
      // router.push({ name: "article-view" });
      // router.push(`/board/view/${article.value.articleNo}`);
    },
    (error) => console.log(error)
  );
}

const fileChange = (e) => {
  file.value = e.target.files[0];
}

function moveList() {
  router.push({ name: "article-list" });
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <input type="text" class="form-control" id="subject" v-model="article.subject" placeholder="제목을 입력하세요..." />
    </div>
    <div class="mb-3">
      <textarea class="form-control" id="content" v-model="article.content" rows="10"
        placeholder="내용을 입력하세요..."></textarea>
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label h4">이미지</label>
      <input class="form-control" type="file" accept="image/*" @change="fileChange" />
    </div>
    <div class="col-auto text-center">
      <button type="submit" class="btn btn-outline-dark mb-3" v-if="type === 'regist'">
        글작성
      </button>
      <button type="submit" class="btn btn-outline-dark mb-3" v-else>글수정</button>
      <button type="button" class="btn btn-outline-dark mb-3 ms-1" @click="moveList">
        목록으로이동...
      </button>
    </div>
  </form>
</template>

<style scoped></style>
