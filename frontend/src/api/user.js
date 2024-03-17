import { userAxios } from "@/util/http-commons";

const user = userAxios();

async function userConfirm(param, success, fail) {
  await user.post(`/login`, param).then(success).catch(fail);
  // console.log("userConfirm ok");
}

async function findById(userEmail, success, fail) {
  user.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  console.log("user email check : ", userEmail);
  await user.get(`/info/${userEmail}`).then(success).catch(fail);
}

async function findByRealId(userId, success, fail) {
  user.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  console.log("user email check : ", userId);
  await user.get(`/info-id/${userId}`).then(success).catch(fail);
}

async function findByName(userName, success, fail) {
  user.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  console.log("user Name check : ", userName);
  await user.get(`/username/${userName}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  user.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await user.post(`/refresh`, user).then(success).catch(fail);
}

async function logout(userEmail, success, fail) {
  await user.get(`/logout/${userEmail}`).then(success).catch(fail);
}

async function emailDuplicateCheck(userEmail, success, fail) {
  await user.get(`/${userEmail}`).then(success).catch(fail);
}
async function nameDuplicateCheck(userName, success, fail) {
  await user.get(`/username/${userName}`).then(success).catch(fail);
}

async function regist(userInfo, success, fail) {
  await user.post(`/join`, userInfo ).then(success).catch(fail);
}

async function modify(userInfo, success, fail) { 
  await user.put(`/modify`, userInfo).then(success).catch(fail);
}


export { userConfirm, findById, findByRealId, findByName, tokenRegeneration, logout, emailDuplicateCheck, nameDuplicateCheck, regist, modify };
