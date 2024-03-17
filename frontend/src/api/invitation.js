import { attractionAxios } from "@/util/http-commons";

const axios = attractionAxios();

async function getInvitationByUserId(userId, success, fail) {
  console.log("getInvitationByName api 호출")
  await axios.get(`invitation/list/${userId}`).then(success).catch(fail);
}

async function createInvitation(data, success, fail) {
    console.log("createInvitation api 호출")
    await axios.post("", data).then(success).catch(fail);
}
  
async function deleteInvitation(planId, userId, success, fail) {
    console.log("deleteInvitation api 호출")
    axios.delete(`/plan-member/${planId}/${userId}`,).then(success).catch(fail);
  }
  
async function registTripMember(userInfo, success, fail) { 
  await axios.post(`/plan-member`, userInfo).then(success).catch(fail);
}

async function updateTripMemberStatus(data, success, fail) { 
  await axios.post(`/plan-member/status`, data).then(success).catch(fail);
}

function findTripMember(planId, userId, success, fail) { 
  axios.get(`/plan-member-find/${planId}/${userId}`,).then(success).catch(fail);
}

export { getInvitationByUserId, createInvitation, deleteInvitation, registTripMember, updateTripMemberStatus, findTripMember};